import { PartialType } from '@nestjs/mapped-types';
import { CreateRolesUserDto } from './create-roles-user.dto';

export class UpdateRolesUserDto extends PartialType(CreateRolesUserDto) {}
