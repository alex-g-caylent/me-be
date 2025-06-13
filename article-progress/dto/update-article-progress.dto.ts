import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleProgressDto } from './create-article-progress.dto';

export class UpdateArticleProgressDto extends PartialType(
  CreateArticleProgressDto,
) {}
