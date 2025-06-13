import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JobTitle } from './entities/job-title.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobTitlesService {
  constructor(
    @InjectRepository(JobTitle)
    private jobTitlesRepository: Repository<JobTitle>,
  ) {}

  findAll() {
    return this.jobTitlesRepository.find();
  }

  findOne(id: string) {
    return this.jobTitlesRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }
}
