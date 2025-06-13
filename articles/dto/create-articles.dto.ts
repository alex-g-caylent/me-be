import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateArticleDto } from "./create-article.dto";

export class CreateArticlesDto {
    
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateArticleDto)
    articles: CreateArticleDto[]
}