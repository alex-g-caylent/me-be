import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import { Region } from '../../regions/entities/region.entity';

export interface ArticleRegionInterface extends BaseEntityInterface {
  articleId?: string;
  regionId?: string;
}

@Entity('article_regions')
@Index(['articleId', 'regionId'], { unique: true })
export class ArticleRegion
  extends BaseEntity
  implements ArticleRegionInterface
{
  @Column()
  articleId: string;

  @Column()
  regionId: string;

  /***__RELATIONS__***/
  @ManyToOne(() => Article, (article) => article.articleRegions, {
    onDelete: 'CASCADE',
  })
  article: Article;

  @ManyToOne(() => Region, (region) => region.articleRegions, {
    onDelete: 'CASCADE',
  })
  region: Region;
}
