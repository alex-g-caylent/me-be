import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleProgress } from './entities/article-progress.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ArticleProgressService {
  constructor(
    @InjectRepository(ArticleProgress)
    private readonly articleProgressRepository: Repository<ArticleProgress>,
  ) {}

  getArticleProgressForLearner(articleId: string, authUser: User) {
    return this.articleProgressRepository.findOne({
      where: {
        articleId,
        userId: authUser.id,
      },
    });
  }
}
