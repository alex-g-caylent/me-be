import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { Message } from '../messages/entities/message.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
  ) {}

  create(createChatDto: CreateChatDto, user: User) {
    const insertChat = { ...createChatDto, userId: user.id };

    const chat = this.chatsRepository.create(insertChat);

    return this.chatsRepository.save(chat);
  }

  findAll(user: User): Promise<Chat[]> {
    return this.chatsRepository.find({ where: { userId: user.id } });
  }

  findOne(id: string): Promise<Chat> {
    return this.chatsRepository.findOne({
      select: {
        id: true,
        name: true,
        userId: true,
        messages: Message.scopeSelectForChatMessage(),
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      where: { id },
      order: { messages: { createdAt: 'ASC' } },
      relations: ['messages.citations.references.article'],
    });
  }

  async remove(id: string): Promise<Chat> {
    const chatDeleted = this.findOne(id);

    await this.chatsRepository.delete({ id });

    return chatDeleted;
  }
}
