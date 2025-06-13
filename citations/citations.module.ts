import { Module } from '@nestjs/common';
import { CitationsService } from './citations.service';
import { CitationsController } from './citations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citation } from './entities/citation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Citation])],
  exports: [TypeOrmModule],
  controllers: [CitationsController],
  providers: [CitationsService],
})
export class CitationsModule {}
