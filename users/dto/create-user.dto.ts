import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEmail,
  IsEnum,
  IsUUID,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../../roles/entities/role.entity';

export class CreateUserDto {
  @ApiProperty()
  @Length(1)
  firstName: string;

  @ApiProperty()
  @Length(1)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsUUID()
  regionId: string;

  @ApiProperty()
  @IsUUID()
  jobTitleId: string;

  @ApiProperty()
  @IsUUID()
  businessUnitId: string;

  @ApiProperty()
  @IsUUID()
  languageId: string;

  @ApiProperty()
  @ArrayUnique()
  @IsEnum(RolesEnum, { each: true })
  @ArrayNotEmpty()
  @IsArray()
  roleIds: RolesEnum[];
}
