import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Role, RolesEnum } from '../../roles/entities/role.entity';
import { User } from '../../users/entities/user.entity';

export interface RoleUserInterface extends BaseEntityInterface {
  userId?: string;
  roleId?: string;
}

@Entity('role_user')
@Index(['userId', 'roleId'], { unique: true })
export class RoleUser extends BaseEntity implements RoleUserInterface {
  @Column()
  userId: string;

  @Column()
  roleId: RolesEnum;

  /***__RELATIONS__***/
  @ManyToOne(() => User, (user) => user.roleUsers)
  public user: User;

  @ManyToOne(() => Role, (role) => role.roleUser)
  public role: Role;
}
