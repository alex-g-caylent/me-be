import { Module } from '@nestjs/common';
import { ArticleCoursesService } from './article-courses.service';
import { ArticleCoursesController } from './article-courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../articles/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  exports: [TypeOrmModule],
  controllers: [ArticleCoursesController],
  providers: [ArticleCoursesService],
})
export class ArticleCoursesModule {}
