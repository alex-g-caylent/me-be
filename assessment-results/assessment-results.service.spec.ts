import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentResultsService } from './assessment-results.service';

describe('AssessmentResultsService', () => {
  let service: AssessmentResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssessmentResultsService],
    }).compile();

    service = module.get<AssessmentResultsService>(AssessmentResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
