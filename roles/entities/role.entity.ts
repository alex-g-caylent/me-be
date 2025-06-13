import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { RoleUser } from '../../roles-users/entities/roles-user.entity';

export enum RolesEnum {
  Editor = '965d2004-8af2-4eeb-936b-3bc90d278ecb',
  Learner = '86f411a0-2c2c-4ecc-a5df-81b0d35e31b1',
  UserManager = '449fd9ad-25b1-4707-9c52-78354a2f0430',
}

export interface RoleInterface extends BaseEntityInterface {
  id?: RolesEnum;
  name?: string;
}

@Entity('roles')
export class Role extends BaseEntity implements RoleInterface {
  @PrimaryGeneratedColumn('uuid')
  id: RolesEnum;

  @Index({ unique: true })
  @Column()
  name: string;

  /***__RELATIONS__***/
  @OneToMany(() => RoleUser, (roleUser) => roleUser.role)
  roleUser: RoleUser[];
}
