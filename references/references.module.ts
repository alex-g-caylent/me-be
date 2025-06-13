import { Module } from '@nestjs/common';
import { ReferencesService } from './references.service';
import { ReferencesController } from './references.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reference } from './entities/reference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reference])],
  exports: [TypeOrmModule],
  controllers: [ReferencesController],
  providers: [ReferencesService],
})
export class ReferencesModule {}
