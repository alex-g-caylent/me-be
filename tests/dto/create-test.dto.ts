import { IsString } from 'class-validator';

export class CreateTestDto {
  @IsString()
  nullo: string;

  @IsString()
  nonnullo: string;
}
