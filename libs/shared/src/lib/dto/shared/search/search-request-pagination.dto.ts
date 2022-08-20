import { IsNotEmpty, IsNumber } from 'class-validator';

export class SearchRequestPaginationDto {
  @IsNumber()
  @IsNotEmpty()
  page!: number;

  @IsNumber()
  @IsNotEmpty()
  limit!: number;
}
