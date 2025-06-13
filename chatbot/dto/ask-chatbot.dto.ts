import { IsUUID, Length } from 'class-validator';

export class AskChatbotDto {
  @Length(1)
  prompt: string;

  @IsUUID()
  chatId: string;
}
