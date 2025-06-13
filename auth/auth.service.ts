import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getTokenForUser(user: User) {
    const payload = {
      sub: user.id,
    };
    return this.jwtService.sign(payload);
  }
}
