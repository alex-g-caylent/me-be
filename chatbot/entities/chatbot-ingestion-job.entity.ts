import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';

export enum IngestionJobStatusEnum {
  COMPLETE = 'COMPLETE',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS',
  STARTING = 'STARTING',
  STOPPED = 'STOPPED',
  STOPPING = 'STOPPING',
}

export interface ChatbotIngestionJobInterface extends BaseEntityInterface {
  userId?: string;
  locked?: boolean;
  ingestionJobId?: string;
  status?: IngestionJobStatusEnum;
  failureReasons?: string;
}

@Entity('chatbot_ingestion_jobs')
export class ChatbotIngestionJob
  extends BaseEntity
  implements ChatbotIngestionJobInterface
{
  @Column()
  userId: string;

  @Column({ default: true })
  locked: boolean;

  @Column()
  ingestionJobId: string;

  @Column({
    type: 'enum',
    enum: IngestionJobStatusEnum,
  })
  status: IngestionJobStatusEnum;

  @Column({ nullable: true })
  failureReasons: string;

  /***__RELATIONS__***/
  @ManyToOne(() => User, (user) => user.ChatbotIngestionJobs)
  user: User; //user who inserted the job
}
