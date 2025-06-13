import { Module } from '@nestjs/common';
import { RolesUsersService } from './roles-users.service';
import { RolesUsersController } from './roles-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleUser } from './entities/roles-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleUser])],
  exports: [TypeOrmModule],
  controllers: [RolesUsersController],
  providers: [RolesUsersService],
})
export class RolesUsersModule {}
