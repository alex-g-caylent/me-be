import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleBusinessUnitDto } from './create-article-business-unit.dto';

export class UpdateArticleBusinessUnitDto extends PartialType(
  CreateArticleBusinessUnitDto,
) {}
