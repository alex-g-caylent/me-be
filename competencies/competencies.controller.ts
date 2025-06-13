import { Controller, Get, Param } from '@nestjs/common';
import { CompetenciesService } from './competencies.service';
import { WhereUuid } from '../../common/custom-pipes/validator/where-uuid';
import { CompetenciesValidation } from './competencies.validation';

@Controller('competencies')
export class CompetenciesController {
  constructor(
    private readonly competenciesService: CompetenciesService,
    private readonly competenciesValidation: CompetenciesValidation,
  ) {}

  @Get()
  findAll() {
    return this.competenciesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', WhereUuid) id: string) {
    await this.competenciesValidation.findOne(id);

    return this.competenciesService.findOne(id);
  }
}
