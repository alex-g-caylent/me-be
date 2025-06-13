import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { SyncBusinessUnitsToArticleDto } from './dto/sync-business-unit-to-article.dto';
import { SyncCoursesToArticleDto } from './dto/sync-courses-to-article.dto';
import { SyncRegionsToArticleDto } from './dto/sync-regions-to-article';
import { SyncJobTitleSkillsToArticleDto } from './dto/sync-job-title-skills-to-article.dto';
import { WhereIn } from '../../common/custom-pipes/validator/where-in';
import { WhereUuid } from '../../common/custom-pipes/validator/where-uuid';
import { AuthUser } from '../../common/custom-decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { Roles } from '../../common/custom-decorators/roles.decorator';
import { RolesEnum } from '../roles/entities/role.entity';
import { ArticlesValidation } from './articles.validation';
import { CreateArticlesDto } from './dto/create-articles.dto';
import { GenerateUploadUrlDto } from './dto/generate-upload-url.dto';
import { UploadCompletionDto } from './dto/upload-completion.dto';
import { ProcessingWebhookDto } from './dto/processing-webhook.dto';
import { CreateArticleFromUploadDto } from './dto/create-article-from-upload.dto';

const prefix: string = 'articles';

@Controller()
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly ArticlesValidation: ArticlesValidation,
  ) {}

  @Roles(RolesEnum.Editor)
  @Post(prefix + '/upload/generate-url')
  generateUploadUrl(
    @Body() generateUploadUrlDto: GenerateUploadUrlDto,
    @AuthUser() authUser: User,
  ) {
    return this.articlesService.generateUploadUrl(generateUploadUrlDto, authUser);
  }

  @Post(prefix + '/upload/confirm')
  confirmFileUploaded(
    @Body() uploadCompletionDto: UploadCompletionDto
  ) {
    return this.articlesService.markFileUploaded(uploadCompletionDto.sessionId);
  }

  @Post(prefix + '/upload/processing-webhook')
  handleProcessingWebhook(
    @Body() webhookData: ProcessingWebhookDto
    // TODO: Add webhook authentication
    // @Headers('authorization') authHeader?: string
  ) {
    // TODO: Add webhook authentication/verification
    // if (!this.validateWebhookAuth(authHeader)) {
    //   throw new UnauthorizedException('Invalid webhook authentication');
    // }
    
    return this.articlesService.handleProcessingWebhook(webhookData);
  }

  @Roles(RolesEnum.Editor)
  @Get(prefix + '/upload/status/:sessionId')
  getUploadStatus(
    @Param('sessionId', WhereUuid) sessionId: string,
    @AuthUser() authUser: User
  ) {
    return this.articlesService.getUploadStatus(sessionId, authUser.id);
  }

  @Roles(RolesEnum.Editor)
  @Post(prefix + '/upload/create-article')
  createArticleFromProcessedUpload(
    @Body() createFromUploadDto: CreateArticleFromUploadDto,
    @AuthUser() authUser: User
  ) {
    return this.articlesService.createArticleFromProcessedUpload(
      createFromUploadDto, 
      authUser
    );
  }



  @Roles(RolesEnum.Editor)
  @Get(prefix)
  findAll() {
    return this.articlesService.findAll();
  }

  @Roles(RolesEnum.Editor)
  @Get(prefix + '/:id')
  async findOne(@Param('id', WhereUuid) id: string) {
    await this.ArticlesValidation.findOne(id);
    return this.articlesService.findOne(id);
  }

  @Roles(RolesEnum.Editor)
  @Put(prefix + '/:id')
  @FormDataRequest()
  async update(
    @Param('id', WhereUuid) id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @AuthUser() authUser: User,
  ) {
    await this.ArticlesValidation.update(id);
    return this.articlesService.update(id, updateArticleDto, authUser);
  }

  @Roles(RolesEnum.Editor)
  @Delete(prefix + '/:id')
  async remove(@Param('id', WhereUuid) id: string) {
    await this.ArticlesValidation.remove(id);
    return this.articlesService.remove(id);
  }

  @Roles(RolesEnum.Editor)
  @Delete(prefix + '/:id/soft')
  async softRemove(@Param('id', WhereUuid) id: string) {
    await this.ArticlesValidation.softRemove(id);
    return this.articlesService.softRemove(id);
  }

  @Roles(RolesEnum.Editor)
  @Get(prefix + '/:id/download')
  async download(@Param('id', WhereUuid) id: string) {
    await this.ArticlesValidation.download(id);
    return this.articlesService.download(id);
  }

  /* SYNC */
  @Roles(RolesEnum.Editor)
  @Put(prefix + '/:id/sync/business-units')
  async syncBusinessUnits(
    @Param('id', WhereUuid) id: string,
    @Body() syncBusinessUnitsToArticleDto: SyncBusinessUnitsToArticleDto,
    @AuthUser() authUser: User,
  ) {
    await this.ArticlesValidation.syncBusinessUnits(
      id,
      syncBusinessUnitsToArticleDto,
    );

    return this.articlesService.syncBusinessUnits(
      id,
      syncBusinessUnitsToArticleDto,
      authUser,
    );
  }

  @Roles(RolesEnum.Editor)
  @Put(prefix + '/:id/sync/courses')
  async syncCourses(
    @Param('id', WhereUuid) id: string,
    @Body() syncCoursesToArticleDto: SyncCoursesToArticleDto,
    @AuthUser() authUser: User,
  ) {
    await this.ArticlesValidation.syncCourses(id, syncCoursesToArticleDto);

    return this.articlesService.syncCourses(
      id,
      syncCoursesToArticleDto,
      authUser,
    );
  }

  @Roles(RolesEnum.Editor)
  @Put(prefix + '/:id/sync/regions')
  async syncRegions(
    @Param('id', WhereUuid) id: string,
    @Body() syncRegionsToArticleDto: SyncRegionsToArticleDto,
    @AuthUser() authUser: User,
  ) {
    await this.ArticlesValidation.syncRegions(id, syncRegionsToArticleDto);

    return this.articlesService.syncRegions(
      id,
      syncRegionsToArticleDto,
      authUser,
    );
  }

  @Roles(RolesEnum.Editor)
  @Put(prefix + '/:id/sync/job-title-skills')
  async syncJobTitleSkill(
    @Param('id', WhereUuid) id: string,
    @Body() syncJobTitleSkillToArticleDto: SyncJobTitleSkillsToArticleDto,
    @AuthUser() authUser: User,
  ) {
    await this.ArticlesValidation.syncJobTitleSkills(
      id,
      syncJobTitleSkillToArticleDto,
    );

    return this.articlesService.syncJobTitleSkills(
      id,
      syncJobTitleSkillToArticleDto,
      authUser,
    );
  }

  /* ARTICLE FOR LEARNER */
  @Roles(RolesEnum.Learner)
  @Get('my/' + prefix)
  findAllForLearner(
    @AuthUser() authUser: User,
    @Query('searchText') searchText?: string,
  ) {
    return this.articlesService.findAllForLearner(authUser, searchText);
  }

  @Roles(RolesEnum.Learner)
  @Get('my/' + prefix + '/suggested')
  findSuggestedForLearner(@AuthUser() authUser: User) {
    return this.articlesService.findSuggestedForLearner(authUser);
  }

  @Roles(RolesEnum.Learner)
  @Get('my/' + prefix + '/:id')
  async findOneForLearner(
    @Param('id', WhereUuid) id: string,
    @AuthUser() authUser: User,
  ) {
    await this.ArticlesValidation.findOneForLearner(id, authUser);
    return this.articlesService.findOne(id);
  }

  @Roles(RolesEnum.Learner)
  @Get('my/' + prefix + '/status/:status')
  findByStatusForLearner(
    @Param('status', new WhereIn(['pinned', 'last-viewed']))
    status: string,
    @AuthUser() authUser: User,
  ) {
    return this.articlesService.findByStatusForLearner(status, authUser);
  }

  @Roles(RolesEnum.Learner)
  @Get('my/' + prefix + '/competencies/:competencyId')
  async findByCompetencyForLearner(
    @Param('competencyId', WhereUuid)
    competencyId: string,
    @AuthUser() authUser: User,
  ) {
    await this.ArticlesValidation.findByCompetencyForLearner(competencyId);

    return this.articlesService.findByCompetencyForLearner(
      competencyId,
      authUser,
    );
  }

  @Roles(RolesEnum.Learner)
  @Patch('my/' + prefix + '/:id/toggle/pinned')
  async togglePin(
    @Param('id', WhereUuid) id: string,
    @AuthUser() authUser: User,
  ) {
    await this.ArticlesValidation.togglePin(id, authUser);

    return this.articlesService.togglePin(id, authUser);
  }

  @Roles(RolesEnum.Learner)
  @Get('my/' + prefix + '/:id/download')
  async downloadForLearner(
    @Param('id', WhereUuid) id: string,
    @AuthUser() authUser: User,
  ) {
    await this.ArticlesValidation.downloadForLearner(id, authUser);

    return this.articlesService.downloadForLearner(id, authUser);
  }
}
