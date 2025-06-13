import { Test, TestingModule } from '@nestjs/testing';
import { ArticleCoursesController } from './article-courses.controller';
import { ArticleCoursesService } from './article-courses.service';

describe('ArticleCoursesController', () => {
  let controller: ArticleCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleCoursesController],
      providers: [ArticleCoursesService],
    }).compile();

    controller = module.get<ArticleCoursesController>(ArticleCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
