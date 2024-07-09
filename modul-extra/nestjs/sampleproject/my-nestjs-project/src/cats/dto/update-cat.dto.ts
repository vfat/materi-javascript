// update-cat.dto.ts
import { IsString, IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  readonly age?: number;

  @IsOptional()
  @IsString()
  readonly breed?: string;
}
