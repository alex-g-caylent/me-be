import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationalToolDto } from './create-educational-tool.dto';

export class UpdateEducationalToolDto extends PartialType(
  CreateEducationalToolDto,
) {}
