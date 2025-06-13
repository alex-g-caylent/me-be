import { Module } from '@nestjs/common';
import { EducationalToolsService } from './educational-tools.service';
import { EducationalToolsController } from './educational-tools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalTool } from './entities/educational-tool.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EducationalTool])],
  exports: [TypeOrmModule],
  controllers: [EducationalToolsController],
  providers: [EducationalToolsService],
})
export class EducationalToolsModule {}
