import { Controller } from '@nestjs/common';
import { CitationsService } from './citations.service';

@Controller('citations')
export class CitationsController {
  constructor(private readonly citationsService: CitationsService) {}
}
