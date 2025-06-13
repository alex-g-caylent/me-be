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

export class SyncJobTitlesToSkillDto {
  @ArrayUnique((jobTitle: SyncJobTitleDto) => jobTitle.jobTitleId)
  @ValidateNested()
  @IsArray()
  @Type(() => SyncJobTitleDto)
  jobTitles: SyncJobTitleDto[];
}

class SyncJobTitleDto {
  @IsUUID()
  jobTitleId: string;

  @Max(5)
  @Min(1)
  @IsInt()
  target: number;
}
