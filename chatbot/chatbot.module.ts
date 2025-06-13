import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { HttpModule } from '@nestjs/axios';
import { ChatbotValidation } from './chatbot.validation';

@Module({
  imports: [HttpModule],
  controllers: [ChatbotController],
  providers: [ChatbotService, ChatbotValidation],
})
export class ChatbotModule {}
