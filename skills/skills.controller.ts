import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SyncJobTitlesToSkillDto } from './dto/sync-job-titles-to-skill.dto';
import { WhereUuid } from '../../common/custom-pipes/validator/where-uuid';
import { SkillsValidation } from './skills.validation';

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillsService: SkillsService,
    private readonly skillsValidation: SkillsValidation,
  ) {}

  @Get(':id')
  async findOne(@Param('id', WhereUuid) id: string) {
    await this.skillsValidation.findOne(id);

    return this.skillsService.findOne(id);
  }

  @Put('/:id/sync/job-titles')
  async syncJobTitle(
    @Param('id', WhereUuid) id: string,
    @Body() syncJobTitlesToSkillDto: SyncJobTitlesToSkillDto,
  ) {
    await this.skillsValidation.syncJobTitles(id, syncJobTitlesToSkillDto);

    return this.skillsService.syncJobTitles(id, syncJobTitlesToSkillDto);
  }
}
