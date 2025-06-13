import { Injectable } from '@nestjs/common';
import {
  BaseValidationService,
  ValidableResponse,
} from '../../common/base.validation.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { User } from '../users/entities/user.entity';
import { JobTitleSkill } from '../job-title-skills/entities/job-title-skill.entity';
import { CollectionUtility } from '../../common/collection-utility';

@Injectable()
export class AssessmentsValidation extends BaseValidationService {
  async create(
    createAssessmentDto: CreateAssessmentDto,
    authUser: User,
  ): Promise<boolean> {
    const requiredJobTitleSkill = await this.dataSource
      .getRepository(JobTitleSkill)
      .find({
        select: { id: true },
        where: { jobTitleId: authUser.jobTitleId },
      });

    const requiredJobTitleSkillKeyed = CollectionUtility.keyBy(
      requiredJobTitleSkill,
      'id',
    );

    const errorMessages: string[] = [];

    if (
      requiredJobTitleSkill.length !=
      createAssessmentDto.assessmentResults.length
    ) {
      errorMessages.push('Assessment must be complete');
    }

    for (const assessmentResults of createAssessmentDto.assessmentResults) {
      if (!requiredJobTitleSkillKeyed.has(assessmentResults.jobTitleSkillId)) {
        errorMessages.push(
          `${JobTitleSkill.name} id (${assessmentResults.jobTitleSkillId}) doesn't exist or is not available for the current user`,
        );
      }
    }

    const validableResponse: ValidableResponse = {
      success: errorMessages.length == 0,
      errorMessage: errorMessages,
    };

    return this.validate(validableResponse);
  }
}
