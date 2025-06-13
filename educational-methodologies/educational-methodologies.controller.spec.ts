import { Test, TestingModule } from '@nestjs/testing';
import { EducationalMethodologiesController } from './educational-methodologies.controller';
import { EducationalMethodologiesService } from './educational-methodologies.service';

describe('EducationalMethodologiesController', () => {
  let controller: EducationalMethodologiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalMethodologiesController],
      providers: [EducationalMethodologiesService],
    }).compile();

    controller = module.get<EducationalMethodologiesController>(
      EducationalMethodologiesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
