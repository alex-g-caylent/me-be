
import { IsUUID, IsObject, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateArticleFromUploadDto {
    @IsUUID()
    sessionId: string;
  
    // Article fields directly in the DTO (no nesting)
    @IsString()
    title: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    mediaId?: string;
  
    @IsOptional()
    @IsString()
    sourceId?: string;
  
    @IsOptional()
    @IsString()
    educationalMethodologyId?: string;
  
    @IsOptional()
    @IsString()
    educationalToolId?: string;
  
    @IsOptional()
    @IsString()
    educationalFrameworkId?: string;
  
    @IsOptional()
    @IsString()
    languageId?: string;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
  }