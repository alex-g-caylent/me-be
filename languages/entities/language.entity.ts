import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { User } from '../../users/entities/user.entity';
import { Article } from '../../articles/entities/article.entity';

export interface LanguageInterface extends BaseEntityInterface {
  name?: string;
  ISO366?: string;
}

@Entity('languages')
export class Language extends BaseEntity implements LanguageInterface {
  @Index({ unique: true })
  @Column()
  name: string;

  @Index({ unique: true })
  @Column()
  ISO366: string;

  /***__RELATIONS__***/
  @OneToMany(() => User, (user) => user.language)
  users: User[];

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
