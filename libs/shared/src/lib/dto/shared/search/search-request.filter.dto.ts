import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SearchFilterOperator } from '../../../enums';

export class SearchRequestFilterDto {
  @IsEnum(SearchFilterOperator)
  @IsNotEmpty()
  operator!: SearchFilterOperator;

  @IsNotEmpty()
  value: unknown;

  @IsString()
  @IsNotEmpty()
  path!: string;
}
