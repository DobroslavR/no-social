import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { SearchRequestPaginationDto } from './search-request-pagination.dto';
import { SearchRequestSortDto } from './search-request-sort.dto';
import { SearchRequestFilterDto } from './search-request.filter.dto';

export class SearchRequestDto<T> {
  @IsOptional()
  @IsString()
  q?: string;

  @ValidateNested()
  @IsOptional()
  sortBy?: SearchRequestSortDto<T>;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => SearchRequestPaginationDto)
  pagination!: SearchRequestPaginationDto;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchRequestFilterDto)
  filters?: SearchRequestFilterDto<T>[];
}
