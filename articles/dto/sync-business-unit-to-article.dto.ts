import { ArrayUnique, IsArray, IsUUID } from 'class-validator';

export class SyncBusinessUnitsToArticleDto {
  @IsUUID('all', { each: true })
  @ArrayUnique()
  @IsArray()
  businessUnits: string[];
}
