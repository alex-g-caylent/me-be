import { Controller, Get, Param } from '@nestjs/common';
import { ArticleProgressService } from './article-progress.service';
import { Roles } from '../../common/custom-decorators/roles.decorator';
import { RolesEnum } from '../roles/entities/role.entity';
import { AuthUser } from '../../common/custom-decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('article-progress')
export class ArticleProgressController {
  constructor(
    private readonly articleProgressService: ArticleProgressService,
  ) {}

  @Roles(RolesEnum.Learner)
  @Get(':articleId')
  getArticleProgressForLearner(
    @Param('articleId') articleId: string,
    @AuthUser() authUser: User,
  ) {
    return this.articleProgressService.getArticleProgressForLearner(
      articleId,
      authUser,
    );
  }
}
