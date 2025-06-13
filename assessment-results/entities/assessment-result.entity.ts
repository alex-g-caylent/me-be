import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Assessment } from '../../assessments/entities/assessment.entity';
import { JobTitleSkill } from '../../job-title-skills/entities/job-title-skill.entity';

export interface AssessmentResultInterface extends BaseEntityInterface {
  value?: number;
  assessmentId?: string;
  jobTitleSkillId?: string;
}

@Entity('assessment_results')
@Index(['assessmentId', 'jobTitleSkillId'], { unique: true })
export class AssessmentResult extends BaseEntity implements AssessmentResultInterface {
  @Column()
  value: number;

  @Column()
  assessmentId: string;

  @Column()
  jobTitleSkillId: string;

  /***__RELATIONS__***/
  @ManyToOne(() => Assessment, (assessment) => assessment.assessmentResults)
  assessment: Assessment;

  @ManyToOne(
    () => JobTitleSkill,
    (jobTitleSkill) => jobTitleSkill.assessmentResults,
  )
  jobTitleSkill: JobTitleSkill;
}
