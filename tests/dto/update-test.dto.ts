import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTestDto } from './create-test.dto';
import { IsArray, IsString } from 'class-validator';

export class UpdateTestDto extends PartialType(
  OmitType(CreateTestDto, ['nonnullo']),
) {
  @IsString()
  nonnullo: string;

  @IsArray()
  nuova: string[];
}
