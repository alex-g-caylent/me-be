import { Module } from '@nestjs/common';
import { ArticleRegionsService } from './article-regions.service';
import { ArticleRegionsController } from './article-regions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../articles/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  exports: [TypeOrmModule],
  controllers: [ArticleRegionsController],
  providers: [ArticleRegionsService],
})
export class ArticleRegionsModule {}
