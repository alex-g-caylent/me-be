import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Article } from '../../articles/entities/article.entity';
import { JobTitleSkill } from '../../job-title-skills/entities/job-title-skill.entity';

export interface ArticleJobTitleSkillInterface extends BaseEntityInterface {
  relevance?: number;
  articleId?: string;
  jobTitleSkillId?: string;
}

@Entity('article_job_title_skills')
@Index(['articleId', 'jobTitleSkillId'], { unique: true })
export class ArticleJobTitleSkill
  extends BaseEntity
  implements ArticleJobTitleSkillInterface
{
  @Column()
  relevance: number;

  @Column()
  articleId: string;

  @Column()
  jobTitleSkillId: string;

  /***__RELATIONS__***/
  @ManyToOne(() => Article, (article) => article.articleJobTitleSkills, {
    onDelete: 'CASCADE',
  })
  article: Article;

  @ManyToOne(
    () => JobTitleSkill,
    (jobTitleSkill) => jobTitleSkill.articleJobTitleSkills,
    { onDelete: 'CASCADE' },
  )
  jobTitleSkill: JobTitleSkill;
}
