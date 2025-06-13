import { Test, TestingModule } from '@nestjs/testing';
import { ArticleBusinessUnitsController } from './article-business-units.controller';
import { ArticleBusinessUnitsService } from './article-business-units.service';

describe('ArticleBusinessUnitsController', () => {
  let controller: ArticleBusinessUnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleBusinessUnitsController],
      providers: [ArticleBusinessUnitsService],
    }).compile();

    controller = module.get<ArticleBusinessUnitsController>(
      ArticleBusinessUnitsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
