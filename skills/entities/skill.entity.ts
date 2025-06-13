import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Competency } from '../../competencies/entities/competency.entity';
import { JobTitleSkill } from '../../job-title-skills/entities/job-title-skill.entity';

export interface SkillInterface extends BaseEntityInterface {
  name?: string;
  description?: string;
  competencyId?: string;
}

@Entity('skills')
export class Skill extends BaseEntity implements SkillInterface {
  @Index({ unique: true })
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  competencyId: string;

  /***__RELATIONS__***/
  @ManyToOne(() => Competency, (competency) => competency.skills)
  competency: Competency;

  @OneToMany(() => JobTitleSkill, (jobTitleSkill) => jobTitleSkill.skill)
  jobTitleSkills: JobTitleSkill[];
}
