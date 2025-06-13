import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { AskChatbotDto } from './dto/ask-chatbot.dto';
import { AuthUser } from '../../common/custom-decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { Roles } from '../../common/custom-decorators/roles.decorator';
import { RolesEnum } from '../roles/entities/role.entity';
import { ChatbotValidation } from './chatbot.validation';
// import { DataSource } from 'typeorm';
// import { HttpService } from '@nestjs/axios';

@Controller('chatbot')
export class ChatbotController {
  constructor(
    private readonly chatbotService: ChatbotService,
    private readonly chatbotValidation: ChatbotValidation,
    // private readonly httpService: HttpService,
    // private readonly dataSource: DataSource,
  ) {}

  @Roles(RolesEnum.Learner)
  @Post('ask')
  async ask(@Body() askChatbotDto: AskChatbotDto, @AuthUser() authUser: User) {
    await this.chatbotValidation.ask(askChatbotDto, authUser);

    return this.chatbotService.ask(askChatbotDto, authUser);
  }

  @Roles(RolesEnum.Editor)
  @Post('knowledge-base/sync')
  async sync(@AuthUser() authUser: User) {
    await this.chatbotValidation.sync();

    return this.chatbotService.sync(authUser);
  }

  @Roles(RolesEnum.Editor)
  @Get('ingestion-jobs/last')
  getIngestionJob() {
    return this.chatbotService.getIngestionJob();
  }

  // @Get('test-axios')
  // getGlobalResponse() {
  //   return 'hello';
  // }
  //
  // @Get('axios') async axios(@Request() request: Request) {
  //   const response = await lastValueFrom(
  //     this.httpService.get('http://localhost:3001/chatbot/test-axios', {
  //       headers: {
  //         Authorization: request.headers['authorization'],
  //       },
  //     }),
  //   );
  //
  //   return response;
  // }
}
