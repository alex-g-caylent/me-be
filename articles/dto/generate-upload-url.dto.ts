import { IsString, IsNumber, IsOptional } from 'class-validator';

export class GenerateUploadUrlDto {
  @IsString()
  fileName: string;

  @IsString()
  fileType: string;

  @IsString()
  contentFileMimeType: string;

  @IsNumber()
  fileSize: number;

  @IsOptional()
  @IsString()
  category?: string;
}