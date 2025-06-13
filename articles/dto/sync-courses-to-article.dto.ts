import { ArrayUnique, IsArray, IsUUID } from 'class-validator';

export class SyncCoursesToArticleDto {
  @IsUUID('all', { each: true })
  @ArrayUnique()
  @IsArray()
  courses: string[];
}
