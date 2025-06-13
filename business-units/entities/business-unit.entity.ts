import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { User } from '../../users/entities/user.entity';
import { ArticleBusinessUnit } from '../../article-business-units/entities/article-business-unit.entity';

export interface BusinessUnitInterface extends BaseEntityInterface {
  name?: string;
}

@Entity('business_units')
export class BusinessUnit extends BaseEntity implements BusinessUnitInterface {
  @Index({ unique: true })
  @Column()
  name: string;

  /***__RELATIONS__***/
  @OneToMany(() => User, (user) => user.businessUnit)
  users: User[];

  @OneToMany(
    () => ArticleBusinessUnit,
    (articleBusinessUnit) => articleBusinessUnit.businessUnit,
  )
  articleBusinessUnits: ArticleBusinessUnit[];
}
