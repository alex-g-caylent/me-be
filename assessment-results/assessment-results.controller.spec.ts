import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentResultsController } from './assessment-results.controller';
import { AssessmentResultsService } from './assessment-results.service';

describe('AssessmentResultsController', () => {
  let controller: AssessmentResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentResultsController],
      providers: [AssessmentResultsService],
    }).compile();

    controller = module.get<AssessmentResultsController>(
      AssessmentResultsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
