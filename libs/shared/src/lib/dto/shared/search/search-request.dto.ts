import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SearchRequestPaginationDto } from './search-request-pagination.dto';
import { SearchRequestSortDto } from './search-request-sort.dto';
import { SearchRequestFilterDto } from './search-request.filter.dto';

export class SearchRequestDto {
  @IsOptional()
  @IsString()
  q?: string;

  @ValidateNested()
  @IsOptional()
  sortBy?: SearchRequestSortDto;

  @ValidateNested()
  @IsNotEmpty()
  pagination!: SearchRequestPaginationDto;

  @ValidateNested()
  @IsArray()
  @IsOptional()
  filters?: SearchRequestFilterDto[];
}
