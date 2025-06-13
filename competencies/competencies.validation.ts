import { Injectable } from '@nestjs/common';
import { Competency } from './entities/competency.entity';
import { BaseValidationService } from '../../common/base.validation.service';

@Injectable()
export class CompetenciesValidation extends BaseValidationService {
  async findOne(id: string): Promise<boolean> {
    const validableResponse = await this.exist(Competency, id);
    return this.validate(validableResponse);
  }
}
