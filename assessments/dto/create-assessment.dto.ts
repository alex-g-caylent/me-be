import {
  ArrayUnique,
  IsArray,
  IsUUID,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAssessmentDto {
  @Length(1)
  name: string;

  @ArrayUnique(
    (assessmentResult: AssessmentResultDto) => assessmentResult.jobTitleSkillId,
  )
  @ValidateNested()
  @IsArray()
  @Type(() => AssessmentResultDto)
  assessmentResults: AssessmentResultDto[];
}

class AssessmentResultDto {
  @IsUUID()
  jobTitleSkillId: string;

  @Min(1)
  @Max(5)
  value: number;
}
