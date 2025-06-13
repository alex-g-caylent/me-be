import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessUnit } from './entities/business-unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessUnitsService {
  constructor(
    @InjectRepository(BusinessUnit)
    private readonly businessUnitsRepository: Repository<BusinessUnit>,
  ) {}

  findAll(): Promise<BusinessUnit[]> {
    return this.businessUnitsRepository.find();
  }
}
