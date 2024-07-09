import { IsInt, IsString, Min, Max, Length } from 'class-validator';

export class CreateCatDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @Length(3, 30)
  name: string;

  @IsInt()
  @Min(0)
  @Max(25)
  age: number;

  @IsString()
  @Length(3, 30)
  breed: string;
}
