import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticlesValidation } from './articles.validation';
import { UploadSessionsService } from './upload-sessions.service';
import { UploadSession } from './entities/upload-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article,UploadSession])],
  exports: [TypeOrmModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesValidation, UploadSessionsService],
})
export class ArticlesModule {}
