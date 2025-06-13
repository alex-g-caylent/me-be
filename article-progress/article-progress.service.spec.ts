import { Test, TestingModule } from '@nestjs/testing';
import { ArticleProgressService } from './article-progress.service';

describe('ArticleProgressService', () => {
  let service: ArticleProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleProgressService],
    }).compile();

    service = module.get<ArticleProgressService>(ArticleProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
