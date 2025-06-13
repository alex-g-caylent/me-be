import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Article,
  ArticleDownload,
  ArticleInterface,
  ArticleS3Metadata,
} from './entities/article.entity';
import { DataSource, ILike, In, IsNull, Not, Repository } from 'typeorm';
import { SyncBusinessUnitsToArticleDto } from './dto/sync-business-unit-to-article.dto';
import { ArticleBusinessUnit } from '../article-business-units/entities/article-business-unit.entity';
import { SyncCoursesToArticleDto } from './dto/sync-courses-to-article.dto';
import { ArticleCourse } from '../article-courses/entities/article-course.entity';
import { SyncRegionsToArticleDto } from './dto/sync-regions-to-article';
import { ArticleRegion } from '../article-regions/entities/article-region.entity';
import { CollectionUtility } from '../../common/collection-utility';
import { SyncJobTitleSkillsToArticleDto } from './dto/sync-job-title-skills-to-article.dto';
import { ArticleJobTitleSkill } from '../article-job-title-skills/entities/article-job-title-skill.entity';
import { User } from '../users/entities/user.entity';
import { ArticleProgress } from '../article-progress/entities/article-progress.entity';
import { AwsS3Service } from '../../common/modules/aws-s3/aws-s3.service';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { JobTitleSkill } from '../job-title-skills/entities/job-title-skill.entity';
import { v4 } from 'uuid';
import { UploadSessionsService } from './upload-sessions.service';
import { UploadSessionInterface } from './entities/upload-session.entity';
import { CreateArticlesDto } from './dto/create-articles.dto';
import { GenerateUploadUrlDto } from './dto/generate-upload-url.dto';
import { ProcessingWebhookDto } from './dto/processing-webhook.dto';
import { CreateArticleFromUploadDto } from './dto/create-article-from-upload.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    private uploadSessionService: UploadSessionsService,
    private readonly dataSource: DataSource,
    private readonly awsS3Service: AwsS3Service,
  ) { }
  // NEW: Single file upload URL generation
  async generateUploadUrl(generateUploadUrlDto: GenerateUploadUrlDto, authUser: User) {
    // Validate file type and size
    this.validateFileMetadata(generateUploadUrlDto);

    const uploadSession = await this.uploadSessionService.create({
      status: 'pending',
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes for upload
      userId: authUser.id,
      fileName: generateUploadUrlDto.fileName,
      fileType: generateUploadUrlDto.fileType,
      fileSize: generateUploadUrlDto.fileSize,
    });

    const contentKey = this.awsS3Service.newKey(generateUploadUrlDto.contentFileMimeType);
    const presignedUrl = await this.awsS3Service.generatePresignedUrl(
      contentKey,
      generateUploadUrlDto.contentFileMimeType
    );

    // Update session with S3 key
    await this.uploadSessionService.update(uploadSession.id, {
      s3ContentKey: contentKey,
      presignedUrl: presignedUrl,
    });

    return {
      sessionId: uploadSession.id,
      uploadUrl: presignedUrl,
      contentKey: contentKey,
      expiresAt: uploadSession.expiresAt,
    };
  }

  // NEW: Mark file as uploaded to S3
  async markFileUploaded(sessionId: string) {
    const uploadSession = await this.uploadSessionService.findById(sessionId);
    
    if (!uploadSession) {
      throw new NotFoundException('Upload session not found');
    }

    // Verify file exists in S3 (you might want to add this method to AwsS3Service)
    // const fileExists = await this.awsS3Service.fileExists(uploadSession.s3ContentKey);
    
    // For now, we'll trust that the file was uploaded
    await this.uploadSessionService.update(sessionId, {
      status: 'uploaded',
      uploadedAt: new Date(),
      // Extend expiration for processing time (30 minutes)
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    });

    // TODO: This is where Facundo's AWS processing pipeline would be triggered
    // The S3 upload event should trigger the processing automatically

    return { 
      success: true, 
      status: 'uploaded',
      message: 'File uploaded successfully, processing initiated' 
    };
  }

  // NEW: Handle webhook from AWS processing completion
  async handleProcessingWebhook(webhookData: ProcessingWebhookDto) {
    const { sessionId, status, extractedText, summary, error } = webhookData;
    
    const uploadSession = await this.uploadSessionService.findById(sessionId);
    
    if (!uploadSession) {
      throw new NotFoundException('Upload session not found');
    }

    if (status === 'completed') {
      await this.uploadSessionService.update(sessionId, {
        status: 'processed',
        extractedText: extractedText,
        summary: summary,
        processedAt: new Date(),
      });
    } else if (status === 'failed') {
      await this.uploadSessionService.update(sessionId, {
        status: 'processing_failed',
        error: error || 'AWS processing failed',
      });
    }

    return { success: true };
  }

  // NEW: Frontend polling endpoint
  async getUploadStatus(sessionId: string, userId: string) {
    const uploadSession = await this.uploadSessionService.findById(sessionId);
    
    if (!uploadSession) {
      throw new NotFoundException('Upload session not found');
    }

    if (uploadSession.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return {
      sessionId: uploadSession.id,
      status: uploadSession.status,
      fileName: uploadSession.fileName,
      progress: this.calculateProgress(uploadSession.status),
      statusMessage: this.getStatusMessage(uploadSession.status),
      error: uploadSession.error,
      extractedText: uploadSession.extractedText,
      summary: uploadSession.summary,
      isComplete: this.isProcessingComplete(uploadSession.status),
      canCreateArticle: uploadSession.status === 'processed',
      createdAt: uploadSession.createdAt,
      updatedAt: uploadSession.updatedAt,
    };
  }

  async createArticleFromProcessedUpload(
    createFromUploadDto: CreateArticleFromUploadDto,
    authUser: User
  ) {
    const uploadSession = await this.uploadSessionService.findById(
      createFromUploadDto.sessionId
    );
  
    if (!uploadSession || uploadSession.status !== 'processed') {
      throw new BadRequestException('Upload not ready for article creation');
    }
  
    if (uploadSession.userId !== authUser.id) {
      throw new ForbiddenException('Access denied');
    }
  
    return await this.dataSource.transaction(async (manager) => {
      const autogeneratedData: ArticleInterface = {
        userId: authUser.id,
      };
  
      // Extract file extension and create cover key
      const fileExtension = this.getFileExtension(uploadSession.fileName);
      const coverKey = this.awsS3Service.newKey('jpeg');
  
      const article = this.articlesRepository.create({
        // CHANGED: Use DTO fields directly instead of createFromUploadDto.metadata
        title: createFromUploadDto.title || this.generateTitleFromFilename(uploadSession.fileName),
        description: createFromUploadDto.description,
        mediaId: createFromUploadDto.mediaId,
        sourceId: createFromUploadDto.sourceId,
        educationalMethodologyId: createFromUploadDto.educationalMethodologyId,
        educationalToolId: createFromUploadDto.educationalToolId,
        educationalFrameworkId: createFromUploadDto.educationalFrameworkId,
        languageId: createFromUploadDto.languageId,
        
        // Add auto-generated data
        ...autogeneratedData,
        
        // File metadata derived from upload session
        key: uploadSession.s3ContentKey,
        mimeType: uploadSession.fileType,
        extension: fileExtension,
        size: uploadSession.fileSize,
        cover: coverKey,
        
        // AWS processed data
        extractedText: uploadSession.extractedText,
        summary: uploadSession.summary,
        processedAt: uploadSession.processedAt || new Date(),
        processingMetadata: uploadSession.processingMetadata,
        
        // Set upload session reference
        uploadSessionId: uploadSession.id,
        
        // Default values for required fields
        duration: 0,
        aiGenerated: true,
      });
  
      const savedArticle = await manager.save(article);
  
      // Generate S3 metadata
      await this.generateS3Metadata(savedArticle.id, uploadSession.s3ContentKey);
  
      // Mark session as article created
      await this.uploadSessionService.update(uploadSession.id, {
        status: 'article_created',
        articleId: savedArticle.id,
      });
  
      return {
        article: savedArticle,
        contentKey: uploadSession.s3ContentKey,
      };
    });
  }

  private getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }
  
  private generateTitleFromFilename(filename: string): string {
    // Remove extension and clean up filename for title
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    return nameWithoutExt.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  
  // NEW: Cleanup expired sessions
  async cleanupExpiredSessions() {
    const expiredSessions = await this.uploadSessionService.findExpired();
    
    for (const session of expiredSessions) {
      try {
        // Only delete S3 objects if processing hasn't started
        if (session.s3ContentKey && ['pending', 'upload_failed'].includes(session.status)) {
          await this.awsS3Service.deleteFile(session.s3ContentKey);
        }
        
        await this.uploadSessionService.markAsExpired(session.id);
      } catch (error) {
        console.error(`Failed to cleanup session ${session.id}:`, error);
      }
    }

    return { cleanedUp: expiredSessions.length };
  }

  // Helper methods
  private calculateProgress(status: string): number {
    const progressMap = {
      'pending': 0,
      'uploaded': 25,
      'processing': 50,
      'processed': 100,
      'upload_failed': 0,
      'processing_failed': 0,
      'expired': 0,
      'article_created': 100,
    };
    return progressMap[status] || 0;
  }

  private getStatusMessage(status: string): string {
    const messageMap = {
      'pending': 'Waiting for file upload...',
      'uploaded': 'File uploaded, processing document...',
      'processing': 'Extracting text and generating summary...',
      'processed': 'Processing complete! Ready to create article.',
      'upload_failed': 'File upload failed',
      'processing_failed': 'Document processing failed',
      'expired': 'Session expired',
      'article_created': 'Article created successfully',
    };
    return messageMap[status] || 'Unknown status';
  }

  private isProcessingComplete(status: string): boolean {
    return ['processed', 'processing_failed', 'upload_failed', 'expired', 'article_created'].includes(status);
  }

  private validateFileMetadata(metadata: GenerateUploadUrlDto) {
    const allowedTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const maxFileSize = 50 * 1024 * 1024; // 50MB

    if (!allowedTypes.includes(metadata.fileType)) {
      throw new BadRequestException(`File type ${metadata.fileType} not supported`);
    }

    if (metadata.fileSize > maxFileSize) {
      throw new BadRequestException('File size exceeds maximum limit');
    }
  }
  // async create(createArticlesDto: CreateArticlesDto, authUser: User) {
  //   return await this.dataSource.transaction(async (manager) => {

  //     const sessionData: UploadSessionInterface = {
  //         status: 'pending',
  //         expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  //         userId: authUser.id,
  //         totalFiles: createArticlesDto.articles.length,
  //         completedFiles: 0
  //       }
  //     const session = await this.uploadSessionService.createWithTransaction(sessionData, manager);
      
  //     const articlesWithS3Key = await Promise.all(
  //       createArticlesDto.articles.map(async (createArticleDto) => {
  //         const autogeneratedData: ArticleInterface = {
  //         userId: authUser.id,
  //       };

  //       let article = this.articlesRepository.create({
  //         ...createArticleDto,
  //         ...autogeneratedData,
  //       });

  //       const contentKey = this.awsS3Service.newKey(createArticleDto.contentFileMimeType);
  //       article.key = contentKey;

  //       const coverKey = this.awsS3Service.newKey(createArticleDto.coverFileMimeType);
  //       article.cover = coverKey;
        
  //       const contentUrl = await this.awsS3Service.generatePresignedUrl(contentKey, createArticleDto.contentFileMimeType);
  //       const coverUrl = await this.awsS3Service.generatePresignedUrl(contentKey, createArticleDto.coverFileMimeType);
  //       await this.generateS3Metadata(article.id, contentKey);

  //       article = await manager.save(article);

  //       return {...article, contentUrl, coverUrl}

  //       })
  //     )
  //     return {sessionId: session.id, articles: articlesWithS3Key};
  //   });
  // }

  findAll(): Promise<Article[]> {
    return this.articlesRepository.find({ relations: ['language'] });
  }

  findOne(id: string): Promise<Article> {
    return this.articlesRepository.findOneOrFail({
      where: { id },
      relations: [
        'user',
        'media',
        'source',
        'educationalMethodology',
        'educationalTool',
        'educationalFramework',
        'language',
        'articleJobTitleSkills.jobTitleSkill',
        'articleJobTitleSkills.jobTitleSkill.jobTitle',
        'articleJobTitleSkills.jobTitleSkill.skill',
        'articleBusinessUnits.businessUnit',
        'articleCourses.course',
        'articleRegions.region',
      ],
    });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto, authUser: User) {

    const autogeneratedData: ArticleInterface = {
      userId: authUser.id,
    };

    await this.articlesRepository.update(id, {
      ...updateArticleDto,
      ...autogeneratedData,
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    const articleDeleted = await this.findOne(id);

    await this.articlesRepository.delete({ id });

    await this.awsS3Service.deleteFile(articleDeleted.key);

    return articleDeleted;
  }

  async softRemove(id: string) {
    const articleSoftDeleted = await this.findOne(id);

    await this.articlesRepository.softDelete({ id });

    return articleSoftDeleted;
  }

  async download(id: string): Promise<ArticleDownload> {
    const article = await this.articlesRepository.findOneByOrFail({ id });
    const content = await this.awsS3Service.getBase64File(article.key);

    return {
      id: article.id,
      title: article.title,
      extension: article.extension,
      mimeType: article.mimeType,
      size: article.size,
      content,
    };
  }

  async syncBusinessUnits(
    articleId: string,
    syncBusinessUnitsToArticleDto: SyncBusinessUnitsToArticleDto,
    authUser: User,
  ): Promise<Article> {
    const upsertBusinessUnitArticle: {
      articleId: string;
      businessUnitId: string;
    }[] = [];

    for (const businessUnitId of syncBusinessUnitsToArticleDto.businessUnits) {
      upsertBusinessUnitArticle.push({
        articleId,
        businessUnitId,
      });
    }

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete(ArticleBusinessUnit, {
        articleId,
        businessUnitId: Not(In(syncBusinessUnitsToArticleDto.businessUnits)),
      });

      await transactionalEntityManager.upsert(
        ArticleBusinessUnit,
        upsertBusinessUnitArticle,
        {
          conflictPaths: ['articleId', 'businessUnitId'],
          skipUpdateIfNoValuesChanged: true,
        },
      );

      await transactionalEntityManager.update(Article, articleId, {
        userId: authUser.id,
      });
    });

    return this.findOne(articleId);
  }

  async syncCourses(
    articleId: string,
    syncCoursesToArticleDto: SyncCoursesToArticleDto,
    authUser: User,
  ): Promise<Article> {
    const upsertCourseArticle: {
      articleId: string;
      courseId: string;
    }[] = [];

    for (const courseId of syncCoursesToArticleDto.courses) {
      upsertCourseArticle.push({
        articleId,
        courseId,
      });
    }

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete(ArticleCourse, {
        articleId,
        courseId: Not(In(syncCoursesToArticleDto.courses)),
      });

      await transactionalEntityManager.upsert(
        ArticleCourse,
        upsertCourseArticle,
        {
          conflictPaths: ['articleId', 'courseId'],
          skipUpdateIfNoValuesChanged: true,
        },
      );

      await transactionalEntityManager.update(Article, articleId, {
        userId: authUser.id,
      });
    });

    return this.findOne(articleId);
  }

  async syncRegions(
    articleId: string,
    syncRegionsToArticleDto: SyncRegionsToArticleDto,
    authUser: User,
  ): Promise<Article> {
    const upsertRegionArticle: {
      articleId: string;
      regionId: string;
    }[] = [];

    for (const regionId of syncRegionsToArticleDto.regions) {
      upsertRegionArticle.push({
        articleId,
        regionId,
      });
    }

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete(ArticleRegion, {
        articleId,
        regionId: Not(In(syncRegionsToArticleDto.regions)),
      });

      await transactionalEntityManager.upsert(
        ArticleRegion,
        upsertRegionArticle,
        {
          conflictPaths: ['articleId', 'regionId'],
          skipUpdateIfNoValuesChanged: true,
        },
      );

      await transactionalEntityManager.update(Article, articleId, {
        userId: authUser.id,
      });
    });

    return this.findOne(articleId);
  }

  async syncJobTitleSkills(
    articleId: string,
    syncJobTitleSkillsToArticleDto: SyncJobTitleSkillsToArticleDto,
    authUser: User,
  ): Promise<Article> {
    const jobTitleSkillIds: string[] = CollectionUtility.pluck(
      syncJobTitleSkillsToArticleDto.jobTitleSkills,
      'jobTitleSkillId',
    );

    const upsertJobTitleSkillArticle: {
      articleId: string;
      jobTitleSkillId: string;
      relevance: number;
      deletedAt: null;
    }[] = [];

    for (const jobTitleSkill of syncJobTitleSkillsToArticleDto.jobTitleSkills) {
      upsertJobTitleSkillArticle.push({
        articleId,
        jobTitleSkillId: jobTitleSkill.jobTitleSkillId,
        relevance: jobTitleSkill.relevance,
        deletedAt: null, //restore soft-deleted
      });
    }

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.softDelete(ArticleJobTitleSkill, {
        articleId,
        jobTitleSkillId: Not(In(jobTitleSkillIds)),
      });

      await transactionalEntityManager.upsert(
        ArticleJobTitleSkill,
        upsertJobTitleSkillArticle,
        {
          conflictPaths: ['articleId', 'jobTitleSkillId'],
          skipUpdateIfNoValuesChanged: true,
        },
      );

      await transactionalEntityManager.update(Article, articleId, {
        userId: authUser.id,
      });
    });

    return this.findOne(articleId);
  }

  /* ROUTE FILTERED BY LOGGED USER */
  async findAllForLearner(user: User, searchText?: string): Promise<Article[]> {
    const scopeWhereAvailableForLearner =
      Article.scopeWhereAvailableForLearner(user);

    const where: FindOptionsWhere<Article>[] = [
      {
        ...scopeWhereAvailableForLearner,
        title: searchText ? ILike('%' + searchText + '%') : undefined,
      },
      {
        ...scopeWhereAvailableForLearner,
        description: searchText ? ILike('%' + searchText + '%') : undefined,
      },
    ];

    return await this.articlesRepository.find({
      where,
      // relations: {
      //   articleJobTitleSkills: {
      //     jobTitleSkill: { jobTitle: true, skill: true },
      //   },
      // },
    });
  }

  async findSuggestedForLearner(user: User): Promise<Article[]> {
    return this.articlesRepository.find({
      where: {
        ...Article.scopeWhereAvailableForLearner(user),
        articleProgresses: {
          viewedAt: IsNull(),
        },
      },
      take: 10,
      order: { articleJobTitleSkills: { relevance: 'DESC' } },
      relations: ['articleJobTitleSkills'],
    });
  }

  async findByStatusForLearner(status: string, user: User): Promise<Article[]> {
    const articleProgresses = await this.dataSource
      .getRepository(ArticleProgress)
      .find({
        where: {
          userId: user.id,
          pinned: status == 'pinned' ? true : undefined,
          article: {
            ...Article.scopeWhereAvailableForLearner(user),
            deletedAt: IsNull(), //excludes articleProgress with soft deleted article
          },
        },
        order: status == 'last-viewed' ? { viewedAt: 'DESC' } : undefined,
        take: status == 'last-viewed' ? 10 : undefined,
        relations: ['article'],
      });

    return CollectionUtility.pluck(articleProgresses, 'article');
  }

  async findByCompetencyForLearner(
    competencyId: string,
    user: User,
  ): Promise<Article[]> {
    const where = Article.scopeWhereAvailableForLearner(user);

    (
      (where.articleJobTitleSkills as FindOptionsWhere<ArticleJobTitleSkill>)
        .jobTitleSkill as FindOptionsWhere<JobTitleSkill>
    ).skill = { competencyId };

    return await this.articlesRepository.find({ where });
  }

  async togglePin(id: string, user: User) {
    const articleProgress = await this.dataSource
      .getRepository(ArticleProgress)
      .findOne({
        where: {
          userId: user.id,
          articleId: id,
        },
      });

    await this.dataSource.getRepository(ArticleProgress).upsert(
      {
        pinned: !articleProgress?.pinned,
        userId: user.id,
        articleId: id,
      },
      {
        conflictPaths: ['articleId', 'userId'],
        skipUpdateIfNoValuesChanged: true,
      },
    );

    return { pinned: !articleProgress?.pinned };
  }

  async downloadForLearner(
    id: string,
    authUser: User,
  ): Promise<ArticleDownload> {
    const article = await this.articlesRepository.findOneByOrFail({ id });
    const content = await this.awsS3Service.getBase64File(article.key);

    await this.dataSource.getRepository(ArticleProgress).upsert(
      {
        articleId: article.id,
        userId: authUser.id,
        viewedAt: new Date(),
      },
      {
        conflictPaths: ['articleId', 'userId'],
        skipUpdateIfNoValuesChanged: true,
      },
    );

    return {
      id: article.id,
      title: article.title,
      extension: article.extension,
      mimeType: article.mimeType,
      size: article.size,
      content,
    };
  }

  async generateS3Metadata(id: string, key: string) {
    const metadata: ArticleS3Metadata = {
      metadataAttributes: {
        articleId: id,
      },
    };

    return this.awsS3Service.uploadMetadata(metadata, key);
  }
}
