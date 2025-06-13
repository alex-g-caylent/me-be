import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleRegionDto } from './create-article-region.dto';

export class UpdateArticleRegionDto extends PartialType(
  CreateArticleRegionDto,
) {}
