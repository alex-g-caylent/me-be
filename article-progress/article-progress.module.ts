import { Module } from '@nestjs/common';
import { ArticleProgressService } from './article-progress.service';
import { ArticleProgressController } from './article-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleProgress } from './entities/article-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleProgress])],
  exports: [TypeOrmModule],
  controllers: [ArticleProgressController],
  providers: [ArticleProgressService],
})
export class ArticleProgressModule {}
