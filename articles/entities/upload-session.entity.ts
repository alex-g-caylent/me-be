import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Article } from '../entities/article.entity';
import { Entity, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

export interface UploadSessionInterface extends BaseEntityInterface {
  status?: string;
  userId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  s3ContentKey?: string;
  presignedUrl?: string;
  articleId?: string;
  error?: string;
  extractedText?: string;
  summary?: string;
  processingMetadata?: any;
  expiresAt: Date;
  uploadedAt?: Date;
  processedAt?: Date;
}

@Entity('upload_sessions')
export class UploadSession extends BaseEntity implements UploadSessionInterface {

  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'failed', 'expired', 'partial_failure'],
    default: 'pending'
  })
  status: string;

  @Column({ type: 'int', default: 0 })
  totalFiles: number;

  @Column({ type: 'int', default: 0 })
  completedFiles: number;

  @Column()
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  fileName: string;

  @Column({ type: 'varchar', length: 100 })
  fileType: string;

  @Column({ type: 'bigint' })
  fileSize: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  s3ContentKey?: string;

  @Column({ type: 'text', nullable: true })
  presignedUrl?: string;

  @Column({ type: 'uuid', nullable: true })
  articleId?: string;

  // Error handling
  @Column({ type: 'text', nullable: true })
  error?: string;

  // AWS processing results
  @Column({ type: 'text', nullable: true })
  extractedText?: string;

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @Column({ type: 'json', nullable: true })
  processingMetadata?: any;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  uploadedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  processedAt?: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Article, { nullable: true })
  @JoinColumn({ name: 'articleId' })
  article?: Article;
}