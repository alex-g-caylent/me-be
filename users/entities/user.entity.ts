import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { JobTitle } from '../../job-titles/entities/job-title.entity';
import { RoleUser } from '../../roles-users/entities/roles-user.entity';
import { Region } from '../../regions/entities/region.entity';
import { Chat } from '../../chats/entities/chat.entity';
import { Language } from '../../languages/entities/language.entity';
import { BusinessUnit } from '../../business-units/entities/business-unit.entity';
import { Assessment } from '../../assessments/entities/assessment.entity';
import { Article } from '../../articles/entities/article.entity';
import { ArticleProgress } from '../../article-progress/entities/article-progress.entity';
import { ChatbotIngestionJob } from '../../chatbot/entities/chatbot-ingestion-job.entity';
import { ApiProperty } from '@nestjs/swagger';

export interface UserInterface extends BaseEntityInterface {
  firstName?: string;
  lastName?: string;
  email?: string;
  jobTitleId?: string;
  regionId?: string;
  languageId?: string;
  businessUnitId?: string;
}

@Entity('users')
export class User extends BaseEntity implements UserInterface {
  @ApiProperty({ type: 'string' })
  @Column()
  firstName: string;

  @ApiProperty({ type: 'string' })
  @Column()
  lastName: string;

  @ApiProperty({ type: 'string' })
  @Index({ unique: true })
  @Column()
  email: string;

  @ApiProperty({ type: 'string' })
  @Column()
  jobTitleId: string;

  @ApiProperty({ type: 'string' })
  @Column()
  regionId: string;

  @ApiProperty({ type: 'string' })
  @Column()
  languageId: string;

  @ApiProperty({ type: 'string' })
  @Column()
  businessUnitId: string;

  /***__RELATIONS__***/
  @ManyToOne(() => JobTitle, (jobTitle) => jobTitle.users)
  jobTitle: JobTitle;

  @ManyToOne(() => Region, (region) => region.users)
  region: Region;

  @OneToMany(() => RoleUser, (roleUser) => roleUser.user)
  roleUsers: RoleUser[];

  @ManyToOne(() => Language, (language) => language.users)
  language: Language;

  @ManyToOne(() => BusinessUnit, (businessUnit) => businessUnit.users)
  businessUnit: BusinessUnit;

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @OneToMany(() => Assessment, (assessment) => assessment.user)
  assessments: Assessment[];

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[]; //articles inserted by Editor user

  @OneToMany(
    () => ChatbotIngestionJob,
    (ChatbotIngestionJob) => ChatbotIngestionJob.user,
  )
  ChatbotIngestionJobs: ChatbotIngestionJob[]; //sync performed by Editor user

  @OneToMany(
    () => ArticleProgress,
    (articleProgress) => articleProgress.article,
  )
  articleProgresses: ArticleProgress[];
}
