import { Test, TestingModule } from '@nestjs/testing';
import { ArticleProgressController } from './article-progress.controller';
import { ArticleProgressService } from './article-progress.service';

describe('ArticleProgressController', () => {
  let controller: ArticleProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleProgressController],
      providers: [ArticleProgressService],
    }).compile();

    controller = module.get<ArticleProgressController>(
      ArticleProgressController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
