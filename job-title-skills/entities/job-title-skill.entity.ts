import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { JobTitle } from '../../job-titles/entities/job-title.entity';
import { Skill } from '../../skills/entities/skill.entity';
import { AssessmentResult } from '../../assessment-results/entities/assessment-result.entity';
import { ArticleJobTitleSkill } from '../../article-job-title-skills/entities/article-job-title-skill.entity';

export interface JobTitleSkillInterface extends BaseEntityInterface {
  jobTitleId?: string;
  skillId?: string;
  target?: number;
}

@Entity('job_title_skills')
@Index(['jobTitleId', 'skillId'], { unique: true })
export class JobTitleSkill
  extends BaseEntity
  implements JobTitleSkillInterface
{
  @Column()
  jobTitleId: string;

  @Column()
  skillId: string;

  @Column()
  target: number;

  /***__RELATIONS__***/
  @ManyToOne(() => JobTitle, (jobTitle) => jobTitle.jobTitleSkills)
  jobTitle: JobTitle;

  @ManyToOne(() => Skill, (skill) => skill.jobTitleSkills)
  skill: Skill;

  @OneToMany(
    () => AssessmentResult,
    (assessmentResult) => assessmentResult.assessment,
  )
  assessmentResults: AssessmentResult[];

  @OneToMany(
    () => ArticleJobTitleSkill,
    (articleJobTitleSkill) => articleJobTitleSkill.jobTitleSkill,
  )
  articleJobTitleSkills: ArticleJobTitleSkill[];
}
