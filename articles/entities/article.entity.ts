import {
  Column,
  Entity,
  Equal,
  IsNull,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Or,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Media } from '../../media/entities/media.entity';
import { Source } from '../../sources/entities/source.entity';
import { EducationalMethodology } from '../../educational-methodologies/entities/educational-methodology.entity';
import { EducationalTool } from '../../educational-tools/entities/educational-tool.entity';
import { EducationalFramework } from '../../educational-frameworks/entities/educational-framework.entity';
import { Language } from '../../languages/entities/language.entity';
import { ArticleJobTitleSkill } from '../../article-job-title-skills/entities/article-job-title-skill.entity';
import { ArticleBusinessUnit } from '../../article-business-units/entities/article-business-unit.entity';
import { ArticleCourse } from '../../article-courses/entities/article-course.entity';
import { ArticleRegion } from '../../article-regions/entities/article-region.entity';
import { ArticleProgress } from '../../article-progress/entities/article-progress.entity';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { FileMetadata } from '../../../common/modules/aws-s3/aws-s3.service';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { Reference } from '../../references/entities/reference.entity';
import { UploadSession } from '../entities/upload-session.entity';

export interface ArticleInterface extends BaseEntityInterface {
  title?: string;
  description?: string;
  key?: string;
  mimeType?: string;
  extension?: string;
  size?: number;
  cover?: string;
  duration?: number;
  aiGenerated?: boolean;
  internalUseOnly?: boolean;
  revokedAt?: Date;
  userId?: string;
  mediaId?: string;
  sourceId?: string;
  educationalMethodologyId?: string;
  educationalToolId?: string;
  educationalFrameworkId?: string;
  languageId?: string;
  uploadSessionId?: string;
  extractedText?: string;
  summary?: string;
  processingMetadata?: any;
  processedAt?: Date;
}

export interface ArticleS3Metadata extends FileMetadata {
  metadataAttributes: {
    articleId: string;
  };
}

export interface ArticleDownload {
  id: string;
  title: string;
  mimeType: string;
  extension: string;
  size: number;
  content: string;
}

@Entity('articles')
export class Article extends BaseEntity implements ArticleInterface {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  key: string;

  @Column()
  mimeType: string;

  @Column()
  extension: string;

  @Column()
  size: number;

  @Column('text')
  cover: string;

  @Column()
  duration: number;

  @Column({ default: false })
  aiGenerated: boolean;

  @Column({ default: false })
  internalUseOnly: boolean;

  @Column({ nullable: true })
  revokedAt: Date;

  @Column()
  userId: string;

  @Column()
  mediaId: string;

  @Column()
  sourceId: string;

  @Column()
  educationalMethodologyId: string;

  @Column()
  educationalToolId: string;

  @Column()
  educationalFrameworkId: string;

  @Column()
  languageId: string;

  @Column({nullable: true})
  uploadSessionId: string;

  @Column({ type: 'text', nullable: true })
  extractedText?: string;

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @Column({ type: 'json', nullable: true })
  processingMetadata?: any;

  @Column({ type: 'timestamp', nullable: true })
  processedAt?: Date;

  /***__RELATIONS__***/
  @ManyToOne(() => User, (user) => user.articles)
  user: User; //user who inserted or modified the article

  @ManyToOne(() => Media, (media) => media.articles)
  media: Media;

  @ManyToOne(() => Source, (source) => source.articles)
  source: Source;

  @ManyToOne(
    () => EducationalMethodology,
    (educationalMethodology) => educationalMethodology.articles,
  )
  educationalMethodology: EducationalMethodology;

  @ManyToOne(
    () => EducationalTool,
    (educationalTool) => educationalTool.articles,
  )
  educationalTool: EducationalTool;

  @ManyToOne(
    () => EducationalFramework,
    (educationalFramework) => educationalFramework.articles,
  )
  educationalFramework: EducationalFramework;

  @ManyToOne(() => Language, (language) => language.articles)
  language: Language;

  @OneToOne(() => UploadSession, (session) => session.article, { nullable: true })
  @JoinColumn({ name: 'uploadSessionId' })
  uploadSession?: UploadSession;

  @OneToMany(
    () => ArticleJobTitleSkill,
    (articleJobTitleSkill) => articleJobTitleSkill.article,
  )
  articleJobTitleSkills: ArticleJobTitleSkill[];

  @OneToMany(
    () => ArticleBusinessUnit,
    (ArticleBusinessUnit) => ArticleBusinessUnit.article,
  )
  articleBusinessUnits: ArticleBusinessUnit[];

  @OneToMany(() => ArticleCourse, (articleCourse) => articleCourse.article)
  articleCourses: ArticleCourse[];

  @OneToMany(() => ArticleRegion, (articleRegion) => articleRegion.article)
  articleRegions: ArticleRegion[];

  @OneToMany(
    () => ArticleProgress,
    (articleProgress) => articleProgress.article,
  )
  articleProgresses: ArticleProgress[];

  @OneToMany(() => Reference, (reference) => reference.article)
  references: Reference[]; //all chatbot references to the article

  /***__SCOPE__***/
  static scopeWhereAvailableForLearner(user: User): FindOptionsWhere<Article> {
    return {
      articleBusinessUnits: {
        businessUnitId: Or(Equal(user.businessUnitId), IsNull()),
      },
      articleRegions: {
        regionId: Or(Equal(user.regionId), IsNull()),
      },
      articleJobTitleSkills: {
        jobTitleSkill: {
          jobTitleId: Or(Equal(user.jobTitleId), IsNull()),
        },
      },
      languageId: user.languageId,
    };
  }
}
