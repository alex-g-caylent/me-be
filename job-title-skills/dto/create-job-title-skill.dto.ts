import { IsInt, IsNotEmpty, IsUUID, Max, Min } from 'class-validator';

export class CreateJobTitleSkillDto {
  @IsNotEmpty()
  @IsUUID()
  jobTitleId: string;

  @IsNotEmpty()
  @IsUUID()
  skillId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  target: number;
}
