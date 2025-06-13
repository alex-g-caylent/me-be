import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleUser } from './entities/roles-user.entity';

@Injectable()
export class RolesUsersService {
  constructor(
    @InjectRepository(RoleUser)
    private readonly rolesRepository: Repository<RoleUser>,
  ) {}
}
