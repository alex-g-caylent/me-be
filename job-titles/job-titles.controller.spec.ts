import { Test, TestingModule } from '@nestjs/testing';
import { JobTitlesController } from './job-titles.controller';
import { JobTitlesService } from './job-titles.service';

describe('JobTitlesController', () => {
  let controller: JobTitlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobTitlesController],
      providers: [JobTitlesService],
    }).compile();

    controller = module.get<JobTitlesController>(JobTitlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
