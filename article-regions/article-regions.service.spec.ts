import { Test, TestingModule } from '@nestjs/testing';
import { ArticleRegionsService } from './article-regions.service';

describe('ArticleRegionsService', () => {
  let service: ArticleRegionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleRegionsService],
    }).compile();

    service = module.get<ArticleRegionsService>(ArticleRegionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
