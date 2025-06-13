import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { User } from '../../users/entities/user.entity';
import { Article } from '../../articles/entities/article.entity';

export interface ArticleProgressInterface extends BaseEntityInterface {
  pinned?: boolean;
  viewedAt?: Date;
  userId?: string;
  articleId?: string;
}

@Entity('article_progresses')
@Index(['userId', 'articleId'], { unique: true })
export class ArticleProgress
  extends BaseEntity
  implements ArticleProgressInterface
{
  @Column({ default: false })
  pinned: boolean;

  @Column({ nullable: true })
  viewedAt: Date;

  @Column()
  userId: string;

  @Column()
  articleId: string;

  /***__RELATIONS__***/
  @ManyToOne(() => User, (user) => user.articleProgresses)
  user: User;

  @ManyToOne(() => Article, (article) => article.articleProgresses)
  article: Article;
}
