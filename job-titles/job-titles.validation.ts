import { Injectable } from '@nestjs/common';
import { BaseValidationService } from '../../common/base.validation.service';
import { JobTitle } from './entities/job-title.entity';

@Injectable()
export class JobTitlesValidation extends BaseValidationService {
  async findOne(id: string): Promise<boolean> {
    const validableResponse = await this.exist(JobTitle, id);
    return this.validate(validableResponse);
  }
}
