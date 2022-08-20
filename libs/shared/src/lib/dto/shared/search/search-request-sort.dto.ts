import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SearchRequestSortDirection } from '../../../enums';

export class SearchRequestSortDto {
  @IsString()
  @IsNotEmpty()
  path!: string;

  @IsEnum(SearchRequestSortDirection)
  @IsNotEmpty()
  direction!: SearchRequestSortDirection;
}
