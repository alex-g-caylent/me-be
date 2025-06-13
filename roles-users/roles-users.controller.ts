import { Controller } from '@nestjs/common';
import { RolesUsersService } from './roles-users.service';

@Controller('roles-users')
export class RolesUsersController {
  constructor(private readonly rolesUsersService: RolesUsersService) {}
}
