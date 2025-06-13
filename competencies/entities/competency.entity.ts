import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Skill } from '../../skills/entities/skill.entity';

export interface CompetencyInterface extends BaseEntityInterface {
  name?: string;
  description?: string;
  colour?: string;
}

@Entity('competencies')
export class Competency extends BaseEntity implements CompetencyInterface {
  @Index({ unique: true })
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  colour: string;

  /***__RELATIONS__***/
  @OneToMany(() => Skill, (skill) => skill.competency)
  skills: Skill[];
}
