import { Test, TestingModule } from '@nestjs/testing';
import { EducationalFrameworksController } from './educational-frameworks.controller';
import { EducationalFrameworksService } from './educational-frameworks.service';

describe('EducationalFrameworksController', () => {
  let controller: EducationalFrameworksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalFrameworksController],
      providers: [EducationalFrameworksService],
    }).compile();

    controller = module.get<EducationalFrameworksController>(
      EducationalFrameworksController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
