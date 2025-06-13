import { Module } from '@nestjs/common';
import { CompetenciesService } from './competencies.service';
import { CompetenciesController } from './competencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competency } from './entities/competency.entity';
import { CompetenciesValidation } from './competencies.validation';

@Module({
  imports: [TypeOrmModule.forFeature([Competency])],
  exports: [TypeOrmModule],
  controllers: [CompetenciesController],
  providers: [CompetenciesService, CompetenciesValidation],
})
export class CompetenciesModule {}
