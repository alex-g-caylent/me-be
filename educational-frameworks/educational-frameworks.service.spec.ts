import { Test, TestingModule } from '@nestjs/testing';
import { EducationalFrameworksService } from './educational-frameworks.service';

describe('EducationalFrameworksService', () => {
  let service: EducationalFrameworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationalFrameworksService],
    }).compile();

    service = module.get<EducationalFrameworksService>(
      EducationalFrameworksService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
