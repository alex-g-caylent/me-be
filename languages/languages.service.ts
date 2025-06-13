import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly languagesRepository: Repository<Language>,
  ) {}

  findAll(): Promise<Language[]> {
    return this.languagesRepository.find();
  }
}
