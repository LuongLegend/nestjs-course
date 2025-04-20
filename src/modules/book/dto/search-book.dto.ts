import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Min } from 'class-validator';

export class SearchBookDto {
  @IsOptional()
  search?: string = '';

  @IsOptional()
  @IsIn(['year', 'author'])
  sort?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number = 10;
}
