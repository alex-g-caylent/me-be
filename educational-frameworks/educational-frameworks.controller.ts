import { Controller, Get } from '@nestjs/common';
import { EducationalFrameworksService } from './educational-frameworks.service';

@Controller('educational-frameworks')
export class EducationalFrameworksController {
  constructor(
    private readonly educationalFrameworksService: EducationalFrameworksService,
  ) {}

  @Get()
  findAll() {
    return this.educationalFrameworksService.findAll();
  }
}
