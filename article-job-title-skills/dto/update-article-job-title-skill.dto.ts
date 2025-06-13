import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleJobTitleSkillDto } from './create-article-job-title-skill.dto';

export class UpdateArticleJobTitleSkillDto extends PartialType(
  CreateArticleJobTitleSkillDto,
) {}
