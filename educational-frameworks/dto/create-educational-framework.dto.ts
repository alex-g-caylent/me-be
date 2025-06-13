import { IsNotEmpty, Length } from 'class-validator';

export class CreateEducationalFrameworkDto {
  @IsNotEmpty()
  @Length(1)
  name: string;
}
