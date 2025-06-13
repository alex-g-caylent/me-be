import { IsNotEmpty, Length } from 'class-validator';

export class CreateSourceDto {
  @IsNotEmpty()
  @Length(1)
  name: string;
}
