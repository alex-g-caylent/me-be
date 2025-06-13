import { Test, TestingModule } from '@nestjs/testing';
import { CitationsController } from './citations.controller';
import { CitationsService } from './citations.service';

describe('CitationsController', () => {
  let controller: CitationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitationsController],
      providers: [CitationsService],
    }).compile();

    controller = module.get<CitationsController>(CitationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
