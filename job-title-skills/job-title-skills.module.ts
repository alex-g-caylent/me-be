import { Module } from '@nestjs/common';
import { JobTitleSkillsService } from './job-title-skills.service';
import { JobTitleSkillsController } from './job-title-skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobTitleSkill } from './entities/job-title-skill.entity';
import { JobTitleSkillsValidation } from './job-title-skills.validation';

@Module({
  imports: [TypeOrmModule.forFeature([JobTitleSkill])],
  exports: [TypeOrmModule],
  controllers: [JobTitleSkillsController],
  providers: [JobTitleSkillsService, JobTitleSkillsValidation],
})
export class JobTitleSkillsModule {}
