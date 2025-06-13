import { Injectable } from '@nestjs/common';
import {
  BaseValidationService,
  ValidableResponse,
} from '../../common/base.validation.service';
import { Chat } from './entities/chat.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ChatsValidation extends BaseValidationService {
  async findOne(id: string, authUser: User): Promise<boolean> {
    const existsAndBelongs = await this.dataSource
      .getRepository(Chat)
      .existsBy({
        id: id,
        userId: authUser.id,
      });

    const validableResponse: ValidableResponse = {
      success: existsAndBelongs,
      errorMessage: [
        `${Chat.name} id (${id})  doesn't exist or doesn't belong to the current user`,
      ],
    };

    return this.validate(validableResponse);
  }

  async remove(id: string, authUser: User): Promise<boolean> {
    const existsAndBelongs = await this.dataSource
      .getRepository(Chat)
      .existsBy({
        id: id,
        userId: authUser.id,
      });

    const validableResponse: ValidableResponse = {
      success: existsAndBelongs,
      errorMessage: [
        `${Chat.name} id (${id})  doesn't exist or doesn't belong to the current user`,
      ],
    };

    return this.validate(validableResponse);
  }
}
