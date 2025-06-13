import { Injectable } from '@nestjs/common';
import {
  BaseValidationService,
  ValidableResponse,
} from '../../common/base.validation.service';
import { Skill } from './entities/skill.entity';
import { SyncJobTitlesToSkillDto } from './dto/sync-job-titles-to-skill.dto';
import { JobTitle } from '../job-titles/entities/job-title.entity';
import { CollectionUtility } from '../../common/collection-utility';

@Injectable()
export class SkillsValidation extends BaseValidationService {
  async findOne(id: string): Promise<boolean> {
    const validableResponse = await this.exist(Skill, id);
    return this.validate(validableResponse);
  }

  async syncJobTitles(
    id: string,
    syncJobTitlesToSkillDto: SyncJobTitlesToSkillDto,
  ): Promise<boolean> {
    const validableResponses: ValidableResponse[] = [];
    validableResponses.push(await this.exist(Skill, id));

    validableResponses.push(
      await this.exist(
        JobTitle,
        CollectionUtility.pluck(
          syncJobTitlesToSkillDto.jobTitles,
          'jobTitleId',
        ),
      ),
    );

    return this.validate(validableResponses);
  }
}
