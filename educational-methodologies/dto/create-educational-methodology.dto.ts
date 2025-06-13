import { IsNotEmpty, Length } from 'class-validator';

export class CreateEducationalMethodologyDto {
  @IsNotEmpty()
  @Length(1)
  name: string;
}
