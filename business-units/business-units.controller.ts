import { Controller, Get } from '@nestjs/common';
import { BusinessUnitsService } from './business-units.service';

@Controller('business-units')
export class BusinessUnitsController {
  constructor(private readonly businessUnitsService: BusinessUnitsService) {}

  @Get()
  findAll() {
    return this.businessUnitsService.findAll();
  }
}
