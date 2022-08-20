import { SearchWithAPIOptions } from '@frontend/shared/models';
import { SearchRequestDto, SearchRequestPaginationDto, SearchApiResponse } from '@shared';
import { api } from './api';

export const search = async <T extends object = Record<string, unknown>>({
  dataSourceEndpoint,
  pagination,
  sortBy,
  filters,
  q,
}: SearchWithAPIOptions<T>) => {
  const searchRequestDto: SearchRequestDto = {
    pagination: pagination as SearchRequestPaginationDto,
    sortBy,
    filters,
    q,
  };

  return api.post<SearchApiResponse<T>>(`${dataSourceEndpoint}/search`, searchRequestDto).then((res) => res.data);
};
