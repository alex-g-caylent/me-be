import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionsRepository: Repository<Region>,
  ) {}

  findAll(): Promise<Region[]> {
    return this.regionsRepository.find();
  }
}
