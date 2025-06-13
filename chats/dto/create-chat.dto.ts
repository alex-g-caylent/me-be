import { Length } from 'class-validator';

export class CreateChatDto {
  @Length(1)
  name: string;
}
