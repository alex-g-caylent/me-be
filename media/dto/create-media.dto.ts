import { IsNotEmpty, Length } from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty()
  @Length(1)
  name: string;
}
