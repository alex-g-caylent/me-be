import { IsNotEmpty, Length } from 'class-validator';

export class CreateRegionDto {
  @IsNotEmpty()
  @Length(1)
  name: string;
}
