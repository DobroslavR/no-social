import { ApiQueryId, SearchOptions } from '@frontend/shared/models';
import { AxiosError } from 'axios';
import { useCallback, useMemo, useState } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { SearchApiResponse, SearchApiResponseMeta } from '@shared';
import { search } from '../api/search.api';

export interface UseSearchOptions<T extends object = Record<string, unknown>> {
  dataSourceId: ApiQueryId;
  dataSourceEndpoint: string;
  options?: SearchOptions<T>;
  queryOptions?: Omit<
    UseQueryOptions<SearchApiResponse<T>, AxiosError, SearchApiResponse<T>, [ApiQueryId, SearchOptions<T>]>,
    'queryKey' | 'queryFn'
  >;
  prefetchNextPage?: boolean;
}

export const useSearch = <T extends object = Record<string, unknown>>({
  dataSourceId,
  queryOptions,
  options,
  dataSourceEndpoint,
}: UseSearchOptions<T>) => {
  const { sortBy, filters, q, pagination = { limit: 10, page: 1 } } = options || {};

  const [page, setPage] = useState<number>(pagination.page || 1);
  const [limit, setLimit] = useState<number>(pagination.limit || 10);

  const goToNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const goToPreviousPage = useCallback(() => {
    setPage((prevPage) => prevPage - 1);
  }, []);

  const query = useQuery<SearchApiResponse<T>, AxiosError, SearchApiResponse<T>, [ApiQueryId, SearchOptions<T>]>(
    [dataSourceId, { pagination: { page, limit }, sortBy, filters, q }],
    () =>
      search({
        dataSourceEndpoint,
        pagination: {
          page,
          limit,
        },
        sortBy,
        filters,
        q,
      }),
    queryOptions
  );

  const { data: _data } = query;

  const meta: SearchApiResponseMeta = useMemo(() => {
    return (
      _data?.meta || {
        has_next_page: false,
        has_previous_page: false,
        limit,
        page,
        total_count: 0,
        total_pages: 1,
      }
    );
  }, [_data?.meta, limit, page]);

  const data = useMemo(() => _data?.data || [], [_data]);

  const hasPreviousPage = useMemo(() => meta.has_previous_page, [meta]);
  const hasNextPage = useMemo(() => meta.has_next_page, [meta]);

  return {
    data,
    setPage,
    setLimit,
    meta,
    goToNextPage,
    goToPreviousPage,
    query,
    limit,
    page,
    hasPreviousPage,
    hasNextPage,
  };
};
