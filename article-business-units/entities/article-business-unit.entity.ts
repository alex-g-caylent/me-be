import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { BusinessUnit } from '../../business-units/entities/business-unit.entity';

export interface ArticleBusinessUnitInterface extends BaseEntityInterface {
  articleId?: string;
  businessUnitId?: string;
}

@Entity('article_business_units')
@Index(['articleId', 'businessUnitId'], { unique: true })
export class ArticleBusinessUnit
  extends BaseEntity
  implements ArticleBusinessUnitInterface
{
  @Column()
  articleId: string;

  @Column()
  businessUnitId: string;

  /***__RELATIONS__***/
  @ManyToOne(() => Article, (article) => article.articleBusinessUnits, {
    onDelete: 'CASCADE',
  })
  article: Article;

  @ManyToOne(
    () => BusinessUnit,
    (businessUnit) => businessUnit.articleBusinessUnits,
    { onDelete: 'CASCADE' },
  )
  businessUnit: BusinessUnit;
}
