import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationalFramework } from './entities/educational-framework.entity';

@Injectable()
export class EducationalFrameworksService {
  constructor(
    @InjectRepository(EducationalFramework)
    private readonly educationalFrameworksRepository: Repository<EducationalFramework>,
  ) {}

  findAll(): Promise<EducationalFramework[]> {
    return this.educationalFrameworksRepository.find();
  }
}
