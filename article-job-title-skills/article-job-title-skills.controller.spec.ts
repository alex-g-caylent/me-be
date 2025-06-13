import { Test, TestingModule } from '@nestjs/testing';
import { ArticleJobTitleSkillsController } from './article-job-title-skills.controller';
import { ArticleJobTitleSkillsService } from './article-job-title-skills.service';

describe('ArticleJobTitleSkillsController', () => {
  let controller: ArticleJobTitleSkillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleJobTitleSkillsController],
      providers: [ArticleJobTitleSkillsService],
    }).compile();

    controller = module.get<ArticleJobTitleSkillsController>(
      ArticleJobTitleSkillsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
