import {
  IsBoolean,
  IsDate,
  IsInt,
  IsUUID,
  Length,
  Max,
  Min,
  IsIn,
} from 'class-validator';
import { IsNullable } from '../../../common/custom-decorators/validator/is-nullable';
import { PostgreSqlTypes } from '../../../common/constants/postgre-sql-types';

export class CreateArticleDto {
  @Length(1)
  title: string;

  @Length(1)
  description: string;

  @IsIn(['image/jpeg','image/jpg', 'image/png'], {
    message: 'coverFileType must be a valid MIME type format (e.g. image/jpeg)'
  })
  coverFileMimeType: string;

  @IsIn(['application/pdf'], {
    message: 'contentFileType must be a valid MIME type format (e.g. application/pdf)'
  })
  contentFileMimeType: string;

  @Max(PostgreSqlTypes.maxInt)
  @Min(1)
  @IsInt()
  duration: number;

  @IsBoolean()
  aiGenerated: boolean;

  @IsBoolean()
  internalUseOnly: boolean;

  @IsDate()
  @IsNullable()
  revokedAt: Date;

  @IsUUID()
  mediaId: string;

  @IsUUID()
  sourceId: string;

  @IsUUID()
  educationalMethodologyId: string;

  @IsUUID()
  educationalToolId: string;

  @IsUUID()
  educationalFrameworkId: string;

  @IsUUID()
  languageId: string;
}