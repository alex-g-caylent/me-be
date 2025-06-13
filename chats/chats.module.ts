import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatsValidation } from './chats.validation';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  exports: [TypeOrmModule],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsValidation],
})
export class ChatsModule {}
