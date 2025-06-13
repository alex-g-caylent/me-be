import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Article } from '../../articles/entities/article.entity';

export interface EducationalToolInterface extends BaseEntityInterface {
  name?: string;
}

@Entity('educational_tools')
export class EducationalTool
  extends BaseEntity
  implements EducationalToolInterface
{
  @Index({ unique: true })
  @Column()
  name: string;

  /***__RELATIONS__***/
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
