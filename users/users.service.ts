import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, In, Not, Repository } from 'typeorm';
import { RoleUser } from '../roles-users/entities/roles-user.entity';
import { RolesEnum } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const roleIds = createUserDto.roleIds;

    delete createUserDto.roleIds;

    let user = this.usersRepository.create(createUserDto);

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      user = await transactionalEntityManager.save(User, user);

      const rolesUser: { roleId: RolesEnum; userId: string }[] = [];

      for (const roleId of roleIds) {
        rolesUser.push({ roleId, userId: user.id });
      }

      await transactionalEntityManager.insert(RoleUser, rolesUser);
    });

    return this.findOne(user.id);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['region', 'jobTitle', 'language', 'businessUnit'],
    });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: [
        'roleUsers.role',
        'region',
        'jobTitle',
        'language',
        'businessUnit',
      ],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
      relations: [
        'roleUsers.role',
        'region',
        'jobTitle',
        'language',
        'businessUnit',
      ],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const roleIds = updateUserDto.roleIds;

    const upsertRoleUser: { roleId: RolesEnum; userId: string }[] = [];

    for (const roleId of roleIds) {
      upsertRoleUser.push({
        roleId,
        userId: id,
      });
    }

    delete updateUserDto.roleIds;

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.update(User, id, updateUserDto);

      await transactionalEntityManager.delete(RoleUser, {
        userId: id,
        roleId: Not(In(roleIds)),
      });

      await transactionalEntityManager.upsert(RoleUser, upsertRoleUser, {
        conflictPaths: ['userId', 'roleId'],
        skipUpdateIfNoValuesChanged: true,
      });
    });

    return this.findOne(id);
  }

  async remove(id: string): Promise<User> {
    const userDeleted = this.findOne(id);

    await this.usersRepository.softDelete(id);

    return userDeleted;
  }
}
