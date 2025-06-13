import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ArticleRegion } from '../../article-regions/entities/article-region.entity';

export interface RegionInterface extends BaseEntityInterface {
  name?: string;
}

@Entity('regions')
export class Region extends BaseEntity implements RegionInterface {
  @Index({ unique: true })
  @Column()
  name: string;

  /***__RELATIONS__***/
  @OneToMany(() => User, (user) => user.region)
  users: User[];

  @OneToMany(() => ArticleRegion, (articleRegion) => articleRegion.region)
  articleRegions: ArticleRegion[];
}
