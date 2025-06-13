import { Module } from '@nestjs/common';
import { EducationalFrameworksService } from './educational-frameworks.service';
import { EducationalFrameworksController } from './educational-frameworks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalFramework } from './entities/educational-framework.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EducationalFramework])],
  exports: [TypeOrmModule],
  controllers: [EducationalFrameworksController],
  providers: [EducationalFrameworksService],
})
export class EducationalFrameworksModule {}
