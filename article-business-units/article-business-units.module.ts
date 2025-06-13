import { Module } from '@nestjs/common';
import { ArticleBusinessUnitsService } from './article-business-units.service';
import { ArticleBusinessUnitsController } from './article-business-units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../articles/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  exports: [TypeOrmModule],
  controllers: [ArticleBusinessUnitsController],
  providers: [ArticleBusinessUnitsService],
})
export class ArticleBusinessUnitsModule {}
