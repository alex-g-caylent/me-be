import { Injectable } from '@nestjs/common';
import {
  BaseValidationService,
  ValidableResponse,
} from '../../common/base.validation.service';
import { AskChatbotDto } from './dto/ask-chatbot.dto';
import { User } from '../users/entities/user.entity';
import { Chat } from '../chats/entities/chat.entity';
import { DateTime } from 'luxon';
import { ChatbotIngestionJob } from './entities/chatbot-ingestion-job.entity';

@Injectable()
export class ChatbotValidation extends BaseValidationService {
  async ask(askChatbotDto: AskChatbotDto, authUser: User): Promise<boolean> {
    const validableResponse: ValidableResponse = {
      success: true,
      errorMessage: undefined,
    };

    const chat = await this.dataSource.getRepository(Chat).findOne({
      where: { id: askChatbotDto.chatId },
      relations: ['messages'],
    });

    if (!chat) {
      validableResponse.success = false;
      validableResponse.errorMessage = [
        `${Chat.name} with id (${askChatbotDto.chatId}) doesn't exist`,
      ];
    } else if (chat.userId != authUser.id) {
      validableResponse.success = false;
      validableResponse.errorMessage = [
        `${Chat.name} with id (${askChatbotDto.chatId}) doesn't belong to auth user`,
      ];
    } else if (chat.messages?.length) {
      const oldestMessage = chat.messages.reduce((oldest, current) => {
        return current.createdAt < oldest.createdAt ? current : oldest;
      });

      const memoryDuration = this.configService.inferGet(
        'aws.bedrock.agentMemoryDuration',
      );

      const expirationDate = DateTime.now()
        .minus({ days: memoryDuration - 1, hours: 23 })
        .toJSDate();

      if (oldestMessage.createdAt <= expirationDate) {
        validableResponse.success = false;
        validableResponse.errorMessage = [
          `${Chat.name} with id ( ${askChatbotDto.chatId} ) has expired`,
        ];
      }
    }

    return this.validate(validableResponse);
  }

  async sync(): Promise<boolean> {
    const ingestionJob = await this.dataSource
      .getRepository(ChatbotIngestionJob)
      .findOne({
        where: {},
        order: { createdAt: 'DESC' },
      });

    const validableResponse: ValidableResponse = {
      success: !(ingestionJob && ingestionJob.locked),
      errorMessage: [
        'Chatbot sync locked, wait for the previous operation to complete',
      ],
    };

    return this.validate(validableResponse);
  }
}
