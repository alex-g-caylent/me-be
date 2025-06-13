import { Test, TestingModule } from '@nestjs/testing';
import { ArticleCoursesService } from './article-courses.service';

describe('ArticleCoursesService', () => {
  let service: ArticleCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleCoursesService],
    }).compile();

    service = module.get<ArticleCoursesService>(ArticleCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
