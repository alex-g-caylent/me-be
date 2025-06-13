import { Module } from '@nestjs/common';
import { BusinessUnitsService } from './business-units.service';
import { BusinessUnitsController } from './business-units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessUnit } from './entities/business-unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessUnit])],
  exports: [TypeOrmModule],
  controllers: [BusinessUnitsController],
  providers: [BusinessUnitsService],
})
export class BusinessUnitsModule {}
