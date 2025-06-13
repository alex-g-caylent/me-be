import { IsNotEmpty, Length } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @Length(1)
  name: string;
}
