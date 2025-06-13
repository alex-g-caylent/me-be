import { Test, TestingModule } from '@nestjs/testing';
import { ArticleBusinessUnitsService } from './article-business-units.service';

describe('ArticleBusinessUnitsService', () => {
  let service: ArticleBusinessUnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleBusinessUnitsService],
    }).compile();

    service = module.get<ArticleBusinessUnitsService>(
      ArticleBusinessUnitsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
