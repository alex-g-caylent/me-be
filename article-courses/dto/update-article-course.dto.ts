import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleCourseDto } from './create-article-course.dto';

export class UpdateArticleCourseDto extends PartialType(
  CreateArticleCourseDto,
) {}
