import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Article } from '../../articles/entities/article.entity';

export interface MediaInterface extends BaseEntityInterface {
  name?: string;
}

@Entity('media')
export class Media extends BaseEntity implements MediaInterface {
  @Index({ unique: true })
  @Column()
  name: string;

  /***__RELATIONS__***/
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
