import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobTitleSkill } from './entities/job-title-skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobTitleSkillsService {
  constructor(
    @InjectRepository(JobTitleSkill)
    public readonly jobTitleSkillsRepository: Repository<JobTitleSkill>,
  ) {}

  findAll() {
    return this.jobTitleSkillsRepository.find({
      relations: ['jobTitle', 'skill'],
    });
  }
}
