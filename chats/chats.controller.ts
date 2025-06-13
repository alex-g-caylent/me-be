import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AuthUser } from '../../common/custom-decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { Roles } from '../../common/custom-decorators/roles.decorator';
import { RolesEnum } from '../roles/entities/role.entity';
import { ChatsValidation } from './chats.validation';

@Controller('my/chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly chatsValidation: ChatsValidation,
  ) {}

  @Roles(RolesEnum.Learner)
  @Post()
  create(@Body() createChatDto: CreateChatDto, @AuthUser() authUser: User) {
    return this.chatsService.create(createChatDto, authUser);
  }

  @Roles(RolesEnum.Learner)
  @Get()
  findAll(@AuthUser() authUser: User) {
    return this.chatsService.findAll(authUser);
  }

  @Roles(RolesEnum.Learner)
  @Get(':id')
  async findOne(@Param('id') id: string, @AuthUser() authUser: User) {
    await this.chatsValidation.findOne(id, authUser);
    return this.chatsService.findOne(id);
  }

  @Roles(RolesEnum.Learner)
  @Delete(':id')
  async remove(@Param('id') id: string, @AuthUser() authUser: User) {
    await this.chatsValidation.remove(id, authUser);
    return this.chatsService.remove(id);
  }
}
