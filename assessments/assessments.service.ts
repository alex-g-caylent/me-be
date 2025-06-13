import { Injectable } from '@nestjs/common';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Assessment } from './entities/assessment.entity';
import { AssessmentResult } from '../assessment-results/entities/assessment-result.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectRepository(Assessment)
    private assessmentsRepository: Repository<Assessment>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createAssessmentDto: CreateAssessmentDto, user: User) {
    const assessmentResults = createAssessmentDto.assessmentResults;

    delete createAssessmentDto.assessmentResults;

    let assessment = this.assessmentsRepository.create({
      ...createAssessmentDto,
      userId: user.id,
    });

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      assessment = await transactionalEntityManager.save(
        Assessment,
        assessment,
      );

      const insertAssessmentResults: AssessmentResult[] = [];

      for (const assessmentResult of assessmentResults) {
        insertAssessmentResults.push({
          value: assessmentResult.value,
          jobTitleSkillId: assessmentResult.jobTitleSkillId,
          assessmentId: assessment.id,
        } as AssessmentResult);
      }

      await transactionalEntityManager.insert(
        AssessmentResult,
        insertAssessmentResults,
      );
    });

    return this.assessmentsRepository.findOne({
      where: { id: assessment.id },
      relations: {
        assessmentResults: {
          jobTitleSkill: {
            jobTitle: true,
            skill: true,
          },
        },
      },
    });
  }

  findLast(user: User): Promise<Assessment> {
    return this.assessmentsRepository.findOne({
      where: { userId: user.id },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        assessmentResults: {
          jobTitleSkill: {
            jobTitle: true,
            skill: true,
          },
        },
      },
    });
  }
}
