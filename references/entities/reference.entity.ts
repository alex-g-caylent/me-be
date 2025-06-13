import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Citation } from '../../citations/entities/citation.entity';
import { Article } from '../../articles/entities/article.entity';

export interface ReferenceInterface extends BaseEntityInterface {
  text?: string;
  articleId?: string;
  page?: number;
  citationId?: string;
}

@Entity('references')
export class Reference extends BaseEntity implements ReferenceInterface {
  @Column('text')
  text: string;

  @Column()
  articleId: string;

  @Column()
  page: number;

  @Column()
  citationId: string;

  /***__RELATIONS__***/
  @ManyToOne(() => Article, (article) => article.references)
  article: Article;

  @ManyToOne(() => Citation, (citation) => citation.references, {
    onDelete: 'CASCADE',
  })
  citation: Citation;
}
