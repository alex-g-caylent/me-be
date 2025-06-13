import { Test, TestingModule } from '@nestjs/testing';
import { ArticleJobTitleSkillsService } from './article-job-title-skills.service';

describe('ArticleJobTitleSkillsService', () => {
  let service: ArticleJobTitleSkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleJobTitleSkillsService],
    }).compile();

    service = module.get<ArticleJobTitleSkillsService>(
      ArticleJobTitleSkillsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
