import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max } from 'class-validator';

export class SearchRequestPaginationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  page!: number;

  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  @ApiProperty({ default: 10 })
  limit!: number;
}
