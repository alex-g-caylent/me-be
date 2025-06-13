import { PartialType } from '@nestjs/mapped-types';
import { CreateJobTitleSkillDto } from './create-job-title-skill.dto';

export class UpdateJobTitleSkillDto extends PartialType(
  CreateJobTitleSkillDto,
) {}
