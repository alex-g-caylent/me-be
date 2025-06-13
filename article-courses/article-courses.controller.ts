import { Controller } from '@nestjs/common';
import { ArticleCoursesService } from './article-courses.service';

@Controller('article-courses')
export class ArticleCoursesController {
  constructor(private readonly articleCoursesService: ArticleCoursesService) {}
}
