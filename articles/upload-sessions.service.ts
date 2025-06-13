import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, In, EntityManager } from 'typeorm';
import { UploadSession } from './entities/upload-session.entity';

@Injectable()
export class UploadSessionsService {
  constructor(
    @InjectRepository(UploadSession)
    private readonly repository: Repository<UploadSession>,
  ) {}

  async create(data: Partial<UploadSession>): Promise<UploadSession> {
    const session = this.repository.create(data);
    return this.repository.save(session);
  }

  async createWithTransaction(data: Partial<UploadSession>, trx: EntityManager): Promise<UploadSession> {
   const session = trx.create(UploadSession, data);
    return trx.save(session);
  }

  async findById(id: string): Promise<UploadSession | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['articles']
    });
  }

  async update(id: string, data: Partial<UploadSession>): Promise<void> {
    await this.repository.update(id, data);
  }

  async findExpired(): Promise<UploadSession[]> {
    return this.repository.find({
      where: {
        expiresAt: LessThan(new Date()),
        status: In(['pending', 'uploaded', 'processing'])
      }
    });
  }

  async findStale(minutesAgo: number = 30): Promise<UploadSession[]> {
    const staleTime = new Date(Date.now() - minutesAgo * 60 * 1000);
    
    return this.repository.find({
      where: {
        status: 'pending',
        createdAt: LessThan(staleTime)
      },
      relations: ['articles']
    });
  }

  async findByUserId(userId: string, limit: number = 10): Promise<UploadSession[]> {
    return this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit
    });
  }

  async findByStatus(status: string): Promise<UploadSession[]> {
    return this.repository.find({
      where: { status }
    });
  }

  async findByUserAndStatus(userId: string, status: string, limit?: number): Promise<UploadSession[]> {
    return this.repository.find({
      where: { userId, status },
      order: { createdAt: 'DESC' },
      take: limit
    });
  }

  async markAsUploaded(id: string): Promise<void> {
    await this.repository.update(id, {
      status: 'uploaded',
      uploadedAt: new Date(),
      updatedAt: new Date()
    });
  }

  async markAsProcessing(id: string): Promise<void> {
    await this.repository.update(id, {
      status: 'processing',
      updatedAt: new Date()
    });
  }

  async markAsProcessed(id: string, extractedText?: string, summary?: string): Promise<void> {
    await this.repository.update(id, {
      status: 'processed',
      extractedText,
      summary,
      processedAt: new Date(),
      updatedAt: new Date()
    });
  }

  async markAsUploadFailed(id: string, error?: string): Promise<void> {
    await this.repository.update(id, {
      status: 'upload_failed',
      error,
      updatedAt: new Date()
    });
  }

  async markAsProcessingFailed(id: string, error?: string): Promise<void> {
    await this.repository.update(id, {
      status: 'processing_failed',
      error,
      updatedAt: new Date()
    });
  }

  async markAsArticleCreated(id: string, articleId: string): Promise<void> {
    await this.repository.update(id, {
      status: 'article_created',
      articleId,
      updatedAt: new Date()
    });
  }

  async markAsCompleted(id: string): Promise<void> {
    await this.repository.update(id, {
      status: 'completed',
      updatedAt: new Date()
    });
  }

  async markAsFailed(id: string): Promise<void> {
    await this.repository.update(id, {
      status: 'failed',
      updatedAt: new Date()
    });
  }

  async markAsExpired(id: string): Promise<void> {
    await this.repository.update(id, {
      status: 'expired',
      updatedAt: new Date()
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
