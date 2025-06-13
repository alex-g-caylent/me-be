import { IsNotEmpty, Length } from 'class-validator';

export class CreateLanguageDto {
  @IsNotEmpty()
  @Length(1)
  name: string;

  @IsNotEmpty()
  @Length(2, 2)
  ISO366: string;
}
