import { Test, TestingModule } from '@nestjs/testing';
import { JobTitleSkillsService } from './job-title-skills.service';

describe('JobTitleSkillsService', () => {
  let service: JobTitleSkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobTitleSkillsService],
    }).compile();

    service = module.get<JobTitleSkillsService>(JobTitleSkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
