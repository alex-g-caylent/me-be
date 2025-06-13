import { IsEnum, IsUUID } from 'class-validator';
import { RolesEnum } from '../../roles/entities/role.entity';

export class CreateRolesUserDto {
  @IsEnum(RolesEnum)
  roleId: RolesEnum;

  @IsUUID()
  userId: string;
}
