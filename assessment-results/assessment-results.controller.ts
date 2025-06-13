import { Controller } from '@nestjs/common';
import { AssessmentResultsService } from './assessment-results.service';

@Controller('assessment-results')
export class AssessmentResultsController {
  constructor(
    private readonly assessmentResultsService: AssessmentResultsService,
  ) {}
}
