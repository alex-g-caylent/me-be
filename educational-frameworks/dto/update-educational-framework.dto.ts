import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationalFrameworkDto } from './create-educational-framework.dto';

export class UpdateEducationalFrameworkDto extends PartialType(
  CreateEducationalFrameworkDto,
) {}
