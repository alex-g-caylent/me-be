import { Length } from 'class-validator';

export class CreateJobTitleDto {
  @Length(1)
  name: string;

  @Length(1)
  description: string;
}
