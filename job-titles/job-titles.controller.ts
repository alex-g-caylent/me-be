import { Controller, Get, Param } from '@nestjs/common';
import { JobTitlesService } from './job-titles.service';
import { JobTitlesValidation } from './job-titles.validation';
import { WhereUuid } from '../../common/custom-pipes/validator/where-uuid';

@Controller('job-titles')
export class JobTitlesController {
  constructor(
    private readonly jobTitlesService: JobTitlesService,
    private readonly jobTitlesValidation: JobTitlesValidation,
  ) {}

  @Get()
  findAll() {
    return this.jobTitlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', WhereUuid) id: string) {
    await this.jobTitlesValidation.findOne(id);

    return this.jobTitlesService.findOne(id);
  }
}
