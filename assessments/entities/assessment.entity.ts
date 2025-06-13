import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { User } from '../../users/entities/user.entity';
import { AssessmentResult } from '../../assessment-results/entities/assessment-result.entity';

export interface AssessmentInterface extends BaseEntityInterface {
  name?: string;
  userId?: string;
}

@Entity('assessments')
export class Assessment extends BaseEntity implements AssessmentInterface {
  @Column()
  name: string;

  @Column()
  userId: string;

  /***__RELATIONS__***/
  @ManyToOne(() => User, (user) => user.assessments)
  user: User;

  @OneToMany(
    () => AssessmentResult,
    (assessmentResult) => assessmentResult.assessment,
  )
  assessmentResults: AssessmentResult[];
}
