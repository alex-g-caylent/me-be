import { Test, TestingModule } from '@nestjs/testing';
import { CitationsService } from './citations.service';

describe('CitationsService', () => {
  let service: CitationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitationsService],
    }).compile();

    service = module.get<CitationsService>(CitationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
