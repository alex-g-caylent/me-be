import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { SamlAuthGuard } from '../../guards/saml-auth.guard';
import { SamlStrategy } from '../../strategies/saml2.strategy';
import 'dotenv/config';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'secret',
      signOptions: { expiresIn: process.env.JWT_EXPIREIN ?? '60s' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    SamlAuthGuard,
    SamlStrategy,
    UsersService,
  ],
})
export class AuthModule {}
