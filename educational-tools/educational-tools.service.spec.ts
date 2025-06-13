import { Test, TestingModule } from '@nestjs/testing';
import { EducationalToolsService } from './educational-tools.service';

describe('EducationalToolsService', () => {
  let service: EducationalToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationalToolsService],
    }).compile();

    service = module.get<EducationalToolsService>(EducationalToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
