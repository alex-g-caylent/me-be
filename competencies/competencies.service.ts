import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competency } from './entities/competency.entity';

@Injectable()
export class CompetenciesService {
  constructor(
    @InjectRepository(Competency)
    private competenciesRepository: Repository<Competency>,
  ) {}

  findAll() {
    return this.competenciesRepository.find();
  }

  async findOne(id: string) {
    return this.competenciesRepository.findOne({
      where: { id },
      relations: ['skills'],
    });
  }
}
