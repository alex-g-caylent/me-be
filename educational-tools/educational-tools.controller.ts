import { Controller, Get } from '@nestjs/common';
import { EducationalToolsService } from './educational-tools.service';

@Controller('educational-tools')
export class EducationalToolsController {
  constructor(
    private readonly educationalToolsService: EducationalToolsService,
  ) {}

  @Get()
  findAll() {
    return this.educationalToolsService.findAll();
  }
}
