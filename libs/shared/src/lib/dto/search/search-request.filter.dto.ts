import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SearchRequestFilterOperator } from '../../enums';
import { NestedPath } from '../../interfaces';

export class SearchRequestFilterDto<T> {
  @IsEnum(SearchRequestFilterOperator)
  @IsNotEmpty()
  operator!: SearchRequestFilterOperator;

  @IsNotEmpty()
  value: unknown;

  @IsString()
  @IsNotEmpty()
  path!: NestedPath<T>;
}
