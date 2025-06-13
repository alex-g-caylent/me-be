import { IsOptional, Length } from 'class-validator';

export class CreateCompetencyDto {
  @Length(1)
  name: string;

  @Length(1)
  @IsOptional()
  description: string;

  @Length(1)
  colour: string;
}
