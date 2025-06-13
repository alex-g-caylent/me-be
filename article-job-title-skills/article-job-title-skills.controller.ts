import { Controller } from '@nestjs/common';
import { ArticleJobTitleSkillsService } from './article-job-title-skills.service';

@Controller('article-job-title-skills')
export class ArticleJobTitleSkillsController {
  constructor(
    private readonly articleJobTitleSkillsService: ArticleJobTitleSkillsService,
  ) {}
}
