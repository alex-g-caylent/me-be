import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Source } from './entities/source.entity';

@Injectable()
export class SourcesService {
  constructor(
    @InjectRepository(Source)
    private readonly sourcesRepository: Repository<Source>,
  ) {}

  findAll(): Promise<Source[]> {
    return this.sourcesRepository.find();
  }
}
