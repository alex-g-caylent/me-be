import { Injectable } from '@nestjs/common';
import {
  BaseValidationService,
  ValidableResponse,
} from '../../common/base.validation.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Region } from '../regions/entities/region.entity';
import { JobTitle } from '../job-titles/entities/job-title.entity';
import { BusinessUnit } from '../business-units/entities/business-unit.entity';
import { Language } from '../languages/entities/language.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersValidation extends BaseValidationService {
  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const validableResponses: ValidableResponse[] = [];

    validableResponses.push(
      await this.notExistIncludeSoft(User, createUserDto.email, 'email'),
    );

    validableResponses.push(await this.exist(Region, createUserDto.regionId));

    validableResponses.push(
      await this.exist(JobTitle, createUserDto.jobTitleId),
    );

    validableResponses.push(
      await this.exist(BusinessUnit, createUserDto.businessUnitId),
    );

    validableResponses.push(
      await this.exist(Language, createUserDto.languageId),
    );

    return this.validate(validableResponses);
  }

  async findOne(id: string): Promise<boolean> {
    const validableResponse = await this.exist(User, id);
    return this.validate(validableResponse);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    const validableResponses: ValidableResponse[] = [];

    validableResponses.push(await this.exist(User, id));

    validableResponses.push(
      await this.uniqueExcludeSelf(User, id, updateUserDto.email, 'email'),
    );

    validableResponses.push(await this.exist(Region, updateUserDto.regionId));

    validableResponses.push(
      await this.exist(JobTitle, updateUserDto.jobTitleId),
    );

    validableResponses.push(
      await this.exist(BusinessUnit, updateUserDto.businessUnitId),
    );

    validableResponses.push(
      await this.exist(Language, updateUserDto.languageId),
    );

    return this.validate(validableResponses);
  }

  async remove(id: string): Promise<boolean> {
    const validableResponse = await this.exist(User, id);
    return this.validate(validableResponse);
  }
}
