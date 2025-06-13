import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationalMethodology } from './entities/educational-methodology.entity';

@Injectable()
export class EducationalMethodologiesService {
  constructor(
    @InjectRepository(EducationalMethodology)
    private readonly educationalMethodologiesRepository: Repository<EducationalMethodology>,
  ) {}

  findAll(): Promise<EducationalMethodology[]> {
    return this.educationalMethodologiesRepository.find();
  }
}
