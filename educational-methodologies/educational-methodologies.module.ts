import { Module } from '@nestjs/common';
import { EducationalMethodologiesService } from './educational-methodologies.service';
import { EducationalMethodologiesController } from './educational-methodologies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalMethodology } from './entities/educational-methodology.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EducationalMethodology])],
  exports: [TypeOrmModule],
  controllers: [EducationalMethodologiesController],
  providers: [EducationalMethodologiesService],
})
export class EducationalMethodologiesModule {}
