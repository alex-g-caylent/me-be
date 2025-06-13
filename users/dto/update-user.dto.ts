import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../../roles/entities/role.entity';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['roleIds'] as const),
  { skipNullProperties: false },
) {
  @ApiProperty()
  @ArrayUnique()
  @IsEnum(RolesEnum, { each: true })
  @ArrayNotEmpty()
  @IsArray()
  roleIds: RolesEnum[];
}
