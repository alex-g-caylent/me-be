import { Module } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { AssessmentsController } from './assessments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assessment } from './entities/assessment.entity';
import { AssessmentsValidation } from './assessments.validation';

@Module({
  imports: [TypeOrmModule.forFeature([Assessment])],
  exports: [TypeOrmModule],
  controllers: [AssessmentsController],
  providers: [AssessmentsService, AssessmentsValidation],
})
export class AssessmentsModule {}
