import { SearchApiPagination, SearchRequestFilterDto, SearchRequestSortDto } from '@shared';

export interface SearchOptions<T extends object = Record<string, unknown>> {
  pagination?: SearchApiPagination;
  q?: string;
  sortBy?: SearchRequestSortDto<T>;
  filters?: SearchRequestFilterDto<T>[];
}

export interface SearchWithAPIOptions<T extends object = Record<string, unknown>> extends SearchOptions<T> {
  dataSourceEndpoint: string;
  customEndpointPath?: string;
}
