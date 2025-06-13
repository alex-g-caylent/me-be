import { IsUUID, IsEnum, IsOptional, IsString, IsObject } from 'class-validator';

export class ProcessingWebhookDto {
  @IsUUID()
  sessionId: string;

  @IsEnum(['completed', 'failed'])
  status: 'completed' | 'failed';

  @IsOptional()
  @IsString()
  extractedText?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  error?: string;

  @IsOptional()
  @IsObject()
  metadata?: any; // Additional processing metadata from AWS
}
