import { Injectable } from '@nestjs/common';
import { Test } from './entities/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Article } from '../articles/entities/article.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    private readonly dataSource: DataSource,
  ) {}

  test(body: any): any {
    return this.dataSource.getRepository(Article).find({
      where: { id: 'c30a9338-3f58-4e70-a2c1-af7563865bb0' },
      relations: { articleProgresses: true },
    });

    return body;

    const t = [];
    for (let i = 0; i < 5; i++) {
      t.push(this.testRepository.create({ string: 'nome', number: 56 }));
    }

    return this.testRepository.save(t);
  }
}
