import { Test, TestingModule } from '@nestjs/testing';
import { EducationalToolsController } from './educational-tools.controller';
import { EducationalToolsService } from './educational-tools.service';

describe('EducationalToolsController', () => {
  let controller: EducationalToolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalToolsController],
      providers: [EducationalToolsService],
    }).compile();

    controller = module.get<EducationalToolsController>(
      EducationalToolsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
