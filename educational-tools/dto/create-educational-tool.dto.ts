import { IsNotEmpty, Length } from 'class-validator';

export class CreateEducationalToolDto {
  @IsNotEmpty()
  @Length(1)
  name: string;
}
