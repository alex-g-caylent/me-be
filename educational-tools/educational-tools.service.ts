import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationalTool } from './entities/educational-tool.entity';

@Injectable()
export class EducationalToolsService {
  constructor(
    @InjectRepository(EducationalTool)
    private readonly educationalToolsRepository: Repository<EducationalTool>,
  ) {}

  findAll(): Promise<EducationalTool[]> {
    return this.educationalToolsRepository.find();
  }
}
