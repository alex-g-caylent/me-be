import { Test, TestingModule } from '@nestjs/testing';
import { ArticleRegionsController } from './article-regions.controller';
import { ArticleRegionsService } from './article-regions.service';

describe('ArticleRegionsController', () => {
  let controller: ArticleRegionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleRegionsController],
      providers: [ArticleRegionsService],
    }).compile();

    controller = module.get<ArticleRegionsController>(ArticleRegionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
