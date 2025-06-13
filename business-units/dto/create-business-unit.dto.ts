import { IsNotEmpty, Length } from 'class-validator';

export class CreateBusinessUnitDto {
  @IsNotEmpty()
  @Length(1)
  name: string;
}
