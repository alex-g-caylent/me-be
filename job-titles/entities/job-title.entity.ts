import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { JobTitleSkill } from '../../job-title-skills/entities/job-title-skill.entity';

export interface JobTitleInterface extends BaseEntityInterface {
  name?: string;
  description?: string;
}

@Entity('job_titles')
export class JobTitle extends BaseEntity implements JobTitleInterface {
  @Index({ unique: true })
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  /***__RELATIONS__***/
  @OneToMany(() => User, (user) => user.jobTitle)
  users: User[];

  @OneToMany(() => JobTitleSkill, (jobTitleSkill) => jobTitleSkill.skill)
  jobTitleSkills: JobTitleSkill[];
}
