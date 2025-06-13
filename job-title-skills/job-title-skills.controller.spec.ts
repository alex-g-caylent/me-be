import { Test, TestingModule } from '@nestjs/testing';
import { JobTitleSkillsController } from './job-title-skills.controller';
import { JobTitleSkillsService } from './job-title-skills.service';

describe('JobTitleSkillsController', () => {
  let controller: JobTitleSkillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobTitleSkillsController],
      providers: [JobTitleSkillsService],
    }).compile();

    controller = module.get<JobTitleSkillsController>(JobTitleSkillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
