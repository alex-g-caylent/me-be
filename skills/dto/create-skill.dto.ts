import { IsUUID, Length } from 'class-validator';

export class CreateSkillDto {
  @Length(1)
  name: string;

  @Length(1)
  description: string;

  @IsUUID()
  competencyId: string;
}
