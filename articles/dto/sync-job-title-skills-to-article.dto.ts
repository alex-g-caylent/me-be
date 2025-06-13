import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SyncJobTitleSkillsToArticleDto {
  @ValidateNested()
  @ArrayUnique(
    (jobTitleSkill: SyncJobTitleSkillDto) => jobTitleSkill.jobTitleSkillId,
  )
  @IsArray()
  @Type(() => SyncJobTitleSkillDto)
  jobTitleSkills: SyncJobTitleSkillDto[];
}

class SyncJobTitleSkillDto {
  @IsUUID()
  jobTitleSkillId: string;

  @Max(4)
  @Min(1)
  @IsInt()
  relevance: number;
}
