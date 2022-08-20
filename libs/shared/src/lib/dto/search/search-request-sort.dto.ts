import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SearchRequestSortDirection } from '../../enums';
import { NestedPath } from '../../interfaces';

export class SearchRequestSortDto<T> {
  @IsString()
  @IsNotEmpty()
  path!: NestedPath<T>;

  @IsEnum(SearchRequestSortDirection)
  @IsNotEmpty()
  direction!: `${SearchRequestSortDirection}`;
}
