import { IsEnum, Length } from 'class-validator';
import { RolesEnum } from '../entities/role.entity';

export class CreateRoleDto {
  @IsEnum(RolesEnum)
  id: RolesEnum;

  @Length(1)
  name: string;
}
