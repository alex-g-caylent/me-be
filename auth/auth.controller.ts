import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { SamlAuthGuard } from '../../guards/saml-auth.guard';
import { AuthService } from './auth.service';
import { SamlStrategy } from '../../strategies/saml2.strategy';
import { ConfigService } from '@nestjs/config';
import { Public } from '../../common/custom-decorators/public.decorator';
import { User } from '../users/entities/user.entity';
import { AuthUser } from '../../common/custom-decorators/auth-user.decorator';

const prefix: string = 'auth';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly samlStrategy: SamlStrategy,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(SamlAuthGuard)
  @Get(prefix + '/sso/saml/login')
  async samlLogin() {
    //this route is handled by passport-saml
    return;
  }

  @Public()
  @UseGuards(SamlAuthGuard)
  @Post(prefix + '/sso/saml/ac')
  async samlAssertionConsumer(@Request() req, @Response() res) {
    //this routes gets executed on successful assertion from IdP
    if (req.user) {
      const user = req.user;
      const jwt = this.authService.getTokenForUser(user);
      const redirectUrl =
        this.configService.get<string>('APP_FE_URL') +
        this.configService.get<string>('SAML_SP_REDIRECTURL');
      res.redirect(redirectUrl + '?jwt=' + jwt);

      //http://localhost:3000/auth/sso/saml/login
    }
  }

  @Public()
  @Get(prefix + '/sso/saml/metadata')
  async getSpMetadata(@Response() res) {
    const ret = this.samlStrategy.generateServiceProviderMetadata(null, null);
    res.type('application/xml');
    res.send(ret);
  }

  @Get(prefix + '/refresh')
  async refreshUserToken(@Request() req) {
    const user = req.user;
    const token = this.authService.getTokenForUser(user);
    return {
      token,
    };
  }

  @Get('my/profile')
  getLoggedUser(@AuthUser() authUser: User) {
    return authUser;
  }
}
