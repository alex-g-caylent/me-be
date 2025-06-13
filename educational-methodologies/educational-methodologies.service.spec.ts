import { Test, TestingModule } from '@nestjs/testing';
import { EducationalMethodologiesService } from './educational-methodologies.service';

describe('EducationalMethodologiesService', () => {
  let service: EducationalMethodologiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationalMethodologiesService],
    }).compile();

    service = module.get<EducationalMethodologiesService>(
      EducationalMethodologiesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
