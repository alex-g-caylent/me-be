import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  exports: [TypeOrmModule],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
