import { Controller } from '@nestjs/common';
import { ArticleRegionsService } from './article-regions.service';

@Controller('article-regions')
export class ArticleRegionsController {
  constructor(private readonly articleRegionsService: ArticleRegionsService) {}
}
