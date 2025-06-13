import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiExtraModels } from '@nestjs/swagger';
import { Roles } from '../../common/custom-decorators/roles.decorator';
import { ApiErrorResponses } from '../../common/custom-decorators/reponse-error.decorator';
import { User } from './entities/user.entity';
import { UsersValidation } from './users.validation';
import { WhereUuid } from '../../common/custom-pipes/validator/where-uuid';
import { RolesEnum } from '../roles/entities/role.entity';

@ApiExtraModels(User)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersValidation: UsersValidation,
  ) {}

  @Roles(RolesEnum.UserManager)
  @Post()
  @ApiErrorResponses(undefined, {
    description: 'User created successfully.',
    type: User,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersValidation.create(createUserDto);

    return this.usersService.create(createUserDto);
  }

  @Roles(RolesEnum.UserManager)
  @Get()
  @ApiErrorResponses(undefined, {
    description: 'Users retrieved successfully.',
    type: [User],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(RolesEnum.UserManager)
  @Get(':id')
  @ApiErrorResponses(undefined, {
    description: 'User retrieved successfully.',
    type: User,
  })
  async findOne(@Param('id', WhereUuid) id: string) {
    await this.usersValidation.findOne(id);

    return this.usersService.findOne(id);
  }

  @Roles(RolesEnum.UserManager)
  @Put(':id')
  @ApiErrorResponses(undefined, {
    description: 'User updated successfully.',
    type: User,
  })
  async update(
    @Param('id', WhereUuid) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersValidation.update(id, updateUserDto);

    return this.usersService.update(id, updateUserDto);
  }

  @Roles(RolesEnum.UserManager)
  @Delete(':id')
  @ApiErrorResponses(undefined, {
    description: 'User deleted successfully.',
    type: 'boolean',
  })
  async remove(@Param('id', WhereUuid) id: string) {
    await this.usersValidation.remove(id);

    return this.usersService.remove(id);
  }
}
