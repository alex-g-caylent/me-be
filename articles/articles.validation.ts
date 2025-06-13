import { Injectable } from '@nestjs/common';
import {
  BaseValidationService,
  ValidableResponse,
} from '../../common/base.validation.service';
import { Article } from './entities/article.entity';
import { SyncBusinessUnitsToArticleDto } from './dto/sync-business-unit-to-article.dto';
import { CollectionUtility } from '../../common/collection-utility';
import { BusinessUnit } from '../business-units/entities/business-unit.entity';
import { SyncCoursesToArticleDto } from './dto/sync-courses-to-article.dto';
import { Course } from '../courses/entities/course.entity';
import { Region } from '../regions/entities/region.entity';
import { SyncRegionsToArticleDto } from './dto/sync-regions-to-article';
import { SyncJobTitleSkillsToArticleDto } from './dto/sync-job-title-skills-to-article.dto';
import { JobTitleSkill } from '../job-title-skills/entities/job-title-skill.entity';
import { Competency } from '../competencies/entities/competency.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ArticlesValidation extends BaseValidationService {
  async findOne(id: string): Promise<boolean> {
    const validableResponse = await this.exist(Article, id);
    return this.validate(validableResponse);
  }

  async update(id: string): Promise<boolean> {
    const validableResponse = await this.exist(Article, id);
    return this.validate(validableResponse);
  }

  async remove(id: string): Promise<boolean> {
    const validableResponse: ValidableResponse = {
      success: true,
      errorMessage: undefined,
    };

    const article = await this.dataSource.getRepository(Article).findOne({
      select: {
        id: true,
        articleProgresses: { id: true, articleId: true },
        references: { id: true, articleId: true },
      },
      where: { id },
      relations: { articleProgresses: true, references: true },
    });

    if (!article) {
      validableResponse.success = false;
      validableResponse.errorMessage = [
        `${Article.name} id (${id}) doesn't exist`,
      ];
    } else if (
      article.articleProgresses.length > 0 ||
      article.references.length > 0
    ) {
      validableResponse.success = false;
      validableResponse.errorMessage = [
        `${Article.name} id (${id}) can't be hard deleted`,
      ];
    }

    return this.validate(validableResponse);
  }

  async softRemove(id: string): Promise<boolean> {
    const validableResponse = await this.exist(Article, id);
    return this.validate(validableResponse);
  }

  async download(id: string): Promise<boolean> {
    const validableResponse = await this.exist(Article, id);
    return this.validate(validableResponse);
  }

  async syncBusinessUnits(
    id: string,
    syncBusinessUnitsToArticleDto: SyncBusinessUnitsToArticleDto,
  ): Promise<boolean> {
    const validableResponses: ValidableResponse[] = [];

    validableResponses.push(await this.exist(Article, id));

    validableResponses.push(
      await this.exist(
        BusinessUnit,
        syncBusinessUnitsToArticleDto.businessUnits,
      ),
    );

    return this.validate(validableResponses);
  }

  async syncCourses(
    id: string,
    syncCoursesToArticleDto: SyncCoursesToArticleDto,
  ): Promise<boolean> {
    const validableResponses: ValidableResponse[] = [];

    validableResponses.push(await this.exist(Article, id));

    validableResponses.push(
      await this.exist(Course, syncCoursesToArticleDto.courses),
    );

    return this.validate(validableResponses);
  }

  async syncRegions(
    id: string,
    syncRegionsToArticleDto: SyncRegionsToArticleDto,
  ): Promise<boolean> {
    const validableResponses: ValidableResponse[] = [];

    validableResponses.push(await this.exist(Article, id));

    validableResponses.push(
      await this.exist(Region, syncRegionsToArticleDto.regions),
    );

    return this.validate(validableResponses);
  }

  async syncJobTitleSkills(
    id: string,
    syncJobTitleSkillToArticleDto: SyncJobTitleSkillsToArticleDto,
  ): Promise<boolean> {
    const validableResponses: ValidableResponse[] = [];

    validableResponses.push(await this.exist(Article, id));

    validableResponses.push(
      await this.exist(
        JobTitleSkill,
        CollectionUtility.pluck(
          syncJobTitleSkillToArticleDto.jobTitleSkills,
          'jobTitleSkillId',
        ),
      ),
    );

    return this.validate(validableResponses);
  }

  async findByCompetencyForLearner(competencyId: string): Promise<boolean> {
    const validableResponse = await this.exist(Competency, competencyId);
    return this.validate(validableResponse);
  }

  async findOneForLearner(id: string, authUser: User): Promise<boolean> {
    const article = await this.dataSource.getRepository(Article).findOne({
      where: {
        ...Article.scopeWhereAvailableForLearner(authUser),
        id: id,
      },
    });

    const validableResponse: ValidableResponse = {
      success: false,
      errorMessage: [
        `${Article.name} id (${id}) doesn't exist or is not available for the current user`,
      ],
    };

    if (article) {
      validableResponse.success = true;
      validableResponse.errorMessage = null;
    }

    return this.validate(validableResponse);
  }

  async togglePin(id: string, authUser: User): Promise<boolean> {
    const article = await this.dataSource.getRepository(Article).findOne({
      where: {
        ...Article.scopeWhereAvailableForLearner(authUser),
        id: id,
      },
    });

    const validableResponse: ValidableResponse = {
      success: false,
      errorMessage: [
        `${Article.name} id (${id}) doesn't exist or is not available for the current user`,
      ],
    };

    if (article) {
      validableResponse.success = true;
      validableResponse.errorMessage = null;
    }

    return this.validate(validableResponse);
  }

  async downloadForLearner(id: string, authUser: User): Promise<boolean> {
    const article = await this.dataSource.getRepository(Article).findOne({
      where: {
        ...Article.scopeWhereAvailableForLearner(authUser),
        id: id,
      },
    });

    const validableResponse: ValidableResponse = {
      success: false,
      errorMessage: [
        `${Article.name} id (${id}) doesn't exist or is not available for the current user`,
      ],
    };

    if (article) {
      validableResponse.success = true;
      validableResponse.errorMessage = null;
    }

    return this.validate(validableResponse);
  }
}
