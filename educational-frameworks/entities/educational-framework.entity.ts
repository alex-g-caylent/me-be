import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Article } from '../../articles/entities/article.entity';

export interface EducationalFrameworkInterface extends BaseEntityInterface {
  name?: string;
}

@Entity('educational_frameworks')
export class EducationalFramework
  extends BaseEntity
  implements EducationalFrameworkInterface
{
  @Index({ unique: true })
  @Column()
  name: string;

  /***__RELATIONS__***/
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
