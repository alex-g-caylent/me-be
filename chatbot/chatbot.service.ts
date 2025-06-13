import { Injectable } from '@nestjs/common';
import { AskChatbotDto } from './dto/ask-chatbot.dto';
import { DataSource } from 'typeorm';
import { AwsBedrockAgentRuntimeService } from '../../common/modules/aws-bedrock-agent-runtime/aws-bedrock-agent-runtime.service';
import { User } from '../users/entities/user.entity';
import { Article } from '../articles/entities/article.entity';
import { CollectionUtility } from '../../common/collection-utility';
import { Message, MessageTypesEnum } from '../messages/entities/message.entity';
import { Citation } from '../citations/entities/citation.entity';
import { v4 } from 'uuid';
import { Reference } from '../references/entities/reference.entity';
import { AwsBedrockAgentService } from '../../common/modules/aws-bedrock-agent/aws-bedrock-agent.service';
import {
  ChatbotIngestionJob,
  IngestionJobStatusEnum,
} from './entities/chatbot-ingestion-job.entity';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly awsBedrockAgentRuntimeService: AwsBedrockAgentRuntimeService,
    private readonly awsBedrockAgentService: AwsBedrockAgentService,
  ) { }

  async ask(askChatbotDto: AskChatbotDto, authUser: User) {
    const manager = this.dataSource.manager;

    const question = manager.create(Message, {
      chatId: askChatbotDto.chatId,
      text: askChatbotDto.prompt,
      type: MessageTypesEnum.QUESTION,
      createdAt: new Date(),
    });

    const availableArticles = await manager.find(Article, {
      select: ['id'],
      where: Article.scopeWhereAvailableForLearner(authUser),
    });

    const response = await this.awsBedrockAgentRuntimeService.invokeAgent(
      askChatbotDto.prompt,
      askChatbotDto.chatId,
      authUser.id,
      CollectionUtility.pluck(availableArticles, 'id'),
    );

    const answer = manager.create(Message, {
      id: v4(),
      chatId: askChatbotDto.chatId,
      text: '',
      type: MessageTypesEnum.ANSWER,
      createdAt: new Date(),
    });

    const citations: Citation[] = [];
    const references: Reference[] = [];

    for await (const chunkEvent of response.completion) {
      const chunk = chunkEvent.chunk;

      if (chunk) {
        for (const citationData of chunk?.attribution?.citations || []) {
          const citation = manager.create(Citation, {
            id: v4(),
            text: citationData.generatedResponsePart.textResponsePart.text,
            messageId: answer.id,
          });

          citations.push(citation);

          for (const referenceData of citationData.retrievedReferences) {
            const reference = manager.create(Reference, {
              text: referenceData.content.text,
              articleId: referenceData.metadata.articleId as string,
              page: referenceData.metadata[
                'x-amz-bedrock-kb-document-page-number'
              ] as number,
              citationId: citation.id,
            });

            references.push(reference);
          }
        }

        answer.text += new TextDecoder('utf-8').decode(chunk.bytes);
      }
    }

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.insert(Message, [question, answer]);
      await transactionalEntityManager.insert(Citation, citations);
      await transactionalEntityManager.insert(Reference, references);
    });

    return manager.findOne(Message, {
      select: Message.scopeSelectForChatMessage(),
      where: { id: answer.id },
      relations: ['citations.references.article'],
    });
  }

  async sync(authUser: User) {
    const response = await this.awsBedrockAgentService.startIngestionJob();

    const ingestionJobRepository =
      this.dataSource.getRepository(ChatbotIngestionJob);

    const ingestionJob = ingestionJobRepository.create({
      userId: authUser.id,
      ingestionJobId: response.ingestionJob.ingestionJobId,
      createdAt: response.ingestionJob.startedAt,
      updatedAt: response.ingestionJob.updatedAt,
      status: response.ingestionJob.status as IngestionJobStatusEnum,
      failureReasons: response.ingestionJob.failureReasons?.join(' ') ?? null,
    });

    return ingestionJobRepository.save(ingestionJob);
  }

  async getIngestionJob() {
    const ingestionJobRepository =
      this.dataSource.getRepository(ChatbotIngestionJob);

    let ingestionJob = await ingestionJobRepository.findOne({
      where: {},
      order: {
        createdAt: 'DESC',
      },
    });

    if (ingestionJob) {
      const response = await this.awsBedrockAgentService.getIngestionJob(
        ingestionJob.ingestionJobId,
      );

      ingestionJob.status = response.ingestionJob
        .status as IngestionJobStatusEnum;

      ingestionJob.updatedAt = response.ingestionJob.updatedAt;

      ingestionJob.locked = ![
        IngestionJobStatusEnum.COMPLETE,
        IngestionJobStatusEnum.FAILED,
      ].includes(ingestionJob.status);

      ingestionJob.failureReasons =
        response.ingestionJob.failureReasons?.join(' ') ?? null;

      ingestionJob = await ingestionJobRepository.save(ingestionJob);
    }

    return ingestionJob;
  }
}
