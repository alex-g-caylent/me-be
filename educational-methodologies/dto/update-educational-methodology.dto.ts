import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationalMethodologyDto } from './create-educational-methodology.dto';

export class UpdateEducationalMethodologyDto extends PartialType(
  CreateEducationalMethodologyDto,
) {}
