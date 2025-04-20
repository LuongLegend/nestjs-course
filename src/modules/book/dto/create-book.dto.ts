import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(5, 100)
  @IsNotEmpty()
  title: string;

  @Length(5, 20)
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsOptional()
  @IsNumber()
  @Min(1900)
  year?: number;

  @IsBoolean()
  @IsOptional()
  available?: boolean = true;
}
