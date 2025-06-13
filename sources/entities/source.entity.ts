import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Article } from '../../articles/entities/article.entity';

export interface SourceInterface extends BaseEntityInterface {
  name?: string;
}

@Entity('sources')
export class Source extends BaseEntity implements SourceInterface {
  @Index({ unique: true })
  @Column()
  name: string;

  /***__RELATIONS__***/
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
