import { Injectable } from '@nestjs/common';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SyncJobTitlesToSkillDto } from './dto/sync-job-titles-to-skill.dto';
import { JobTitleSkill } from '../job-title-skills/entities/job-title-skill.entity';
import { DataSource, In, Not, Repository } from 'typeorm';
import { CollectionUtility } from '../../common/collection-utility';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
    private readonly dataSource: DataSource,
  ) {}

  findOne(id: string) {
    return this.skillsRepository.findOne({
      where: { id },
      relations: ['jobTitleSkills.jobTitle'],
    });
  }

  async syncJobTitles(
    skillId: string,
    syncJobTitlesToSkillDto: SyncJobTitlesToSkillDto,
  ): Promise<Skill> {
    const jobTitleIds: string[] = CollectionUtility.pluck(
      syncJobTitlesToSkillDto.jobTitles,
      'jobTitleId',
    );

    const upsertJobTitleSkills: {
      skillId: string;
      jobTitleId: string;
      target: number;
      deletedAt: null;
    }[] = [];
    for (const jobTitle of syncJobTitlesToSkillDto.jobTitles) {
      upsertJobTitleSkills.push({
        skillId,
        jobTitleId: jobTitle.jobTitleId,
        target: jobTitle.target,
        deletedAt: null, //ripristina i soft deleted
      });
    }

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.softDelete(JobTitleSkill, {
        skillId,
        jobTitleId: Not(In(jobTitleIds)),
      });

      await transactionalEntityManager.upsert(
        JobTitleSkill,
        upsertJobTitleSkills,
        {
          conflictPaths: ['skillId', 'jobTitleId'],
          skipUpdateIfNoValuesChanged: true,
        },
      );
    });

    return this.findOne(skillId);
  }
}
