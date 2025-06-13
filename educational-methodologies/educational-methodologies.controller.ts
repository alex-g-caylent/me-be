import { Controller, Get } from '@nestjs/common';
import { EducationalMethodologiesService } from './educational-methodologies.service';

@Controller('educational-methodologies')
export class EducationalMethodologiesController {
  constructor(
    private readonly educationalMethodologiesService: EducationalMethodologiesService,
  ) {}

  @Get()
  findAll() {
    return this.educationalMethodologiesService.findAll();
  }
}
