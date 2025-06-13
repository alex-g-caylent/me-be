import { Module } from '@nestjs/common';
import { JobTitlesService } from './job-titles.service';
import { JobTitlesController } from './job-titles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobTitle } from './entities/job-title.entity';
import { JobTitlesValidation } from './job-titles.validation';

@Module({
  imports: [TypeOrmModule.forFeature([JobTitle])],
  exports: [TypeOrmModule],
  controllers: [JobTitlesController],
  providers: [JobTitlesService, JobTitlesValidation],
})
export class JobTitlesModule {}
