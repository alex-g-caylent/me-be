import { Module } from '@nestjs/common';
import { AssessmentResultsService } from './assessment-results.service';
import { AssessmentResultsController } from './assessment-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentResult } from './entities/assessment-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssessmentResult])],
  exports: [TypeOrmModule],
  controllers: [AssessmentResultsController],
  providers: [AssessmentResultsService],
})
export class AssessmentResultsModule {}
