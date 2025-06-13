import { Module } from '@nestjs/common';
import { ArticleJobTitleSkillsService } from './article-job-title-skills.service';
import { ArticleJobTitleSkillsController } from './article-job-title-skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../articles/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  exports: [TypeOrmModule],
  controllers: [ArticleJobTitleSkillsController],
  providers: [ArticleJobTitleSkillsService],
})
export class ArticleJobTitleSkillsModule {}
