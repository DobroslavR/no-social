import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SearchFilterOperator } from '../../../enums';
import { NestedPath } from '../../../interfaces';

export class SearchRequestFilterDto<T> {
  @IsEnum(SearchFilterOperator)
  @IsNotEmpty()
  operator!: SearchFilterOperator;

  @IsNotEmpty()
  value: unknown;

  @IsString()
  @IsNotEmpty()
  path!: NestedPath<T>;
}
