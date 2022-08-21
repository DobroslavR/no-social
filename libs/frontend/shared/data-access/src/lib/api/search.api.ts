import { SearchWithAPIOptions } from '@frontend/shared/models';
import { SearchRequestDto, SearchRequestPaginationDto, SearchApiResponse } from '@shared';
import { api } from './api';

export const search = async <T extends object = Record<string, unknown>>({
  dataSourceEndpoint,
  pagination,
  sortBy,
  filters,
  q,
  customEndpointPath,
}: SearchWithAPIOptions<T>) => {
  const searchRequestDto: SearchRequestDto<T> = {
    pagination: pagination as SearchRequestPaginationDto,
    sortBy,
    filters,
    q,
  };

  const endpointPath = customEndpointPath ? customEndpointPath : 'search';

  return api
    .post<SearchApiResponse<T>>(`${dataSourceEndpoint}/${endpointPath}`, searchRequestDto)
    .then((res) => res.data);
};
