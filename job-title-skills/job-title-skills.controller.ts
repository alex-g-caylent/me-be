import { Controller, Get } from '@nestjs/common';
import { JobTitleSkillsService } from './job-title-skills.service';
import { JobTitleSkillsValidation } from './job-title-skills.validation';

@Controller('job-title-skills')
export class JobTitleSkillsController {
  constructor(
    private readonly jobTitleSkillsService: JobTitleSkillsService,
    private readonly jobTitleSkillsValidation: JobTitleSkillsValidation,
  ) {}

  @Get()
  findAll() {
    return this.jobTitleSkillsService.findAll();
  }
}
