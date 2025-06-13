import { Controller, Get, Post, Body } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { AuthUser } from '../../common/custom-decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { Roles } from '../../common/custom-decorators/roles.decorator';
import { RolesEnum } from '../roles/entities/role.entity';
import { AssessmentsValidation } from './assessments.validation';

@Controller('my/assessments')
export class AssessmentsController {
  constructor(
    private readonly assessmentsService: AssessmentsService,
    private readonly assessmentsValidation: AssessmentsValidation,
  ) {}

  @Roles(RolesEnum.Learner)
  @Post()
  async create(
    @Body() createAssessmentDto: CreateAssessmentDto,
    @AuthUser() authUser: User,
  ) {
    await this.assessmentsValidation.create(createAssessmentDto, authUser);

    return this.assessmentsService.create(createAssessmentDto, authUser);
  }

  @Roles(RolesEnum.Learner)
  @Get()
  findLast(@AuthUser() authUser: User) {
    return this.assessmentsService.findLast(authUser);
  }
}
