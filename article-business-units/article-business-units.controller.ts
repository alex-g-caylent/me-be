import { Controller } from '@nestjs/common';
import { ArticleBusinessUnitsService } from './article-business-units.service';

@Controller('article-business-units')
export class ArticleBusinessUnitsController {
  constructor(
    private readonly articleBusinessUnitsService: ArticleBusinessUnitsService,
  ) {}
}
