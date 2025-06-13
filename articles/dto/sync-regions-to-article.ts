import { ArrayUnique, IsArray, IsUUID } from 'class-validator';

export class SyncRegionsToArticleDto {
  @IsUUID('all', { each: true })
  @ArrayUnique()
  @IsArray()
  regions: string[];
}
