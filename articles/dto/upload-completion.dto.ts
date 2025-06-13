import { IsUUID, IsOptional, IsObject } from 'class-validator';

export class UploadCompletionDto {
  @IsUUID()
  sessionId: string;

  @IsOptional()
  @IsObject()
  s3Event?: any; // S3 event data if using S3 triggers
}
