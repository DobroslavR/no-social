import { AxiosError } from 'axios';

import { useMemo } from 'react';
import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { ApiQueryId, SearchOptions } from '@no-social/frontend/shared/models';
import { SearchApiResponse, SearchApiResponseMeta } from '@no-social/shared';
import { search } from '../api/search.api';

export interface UseInfiniteSearchOptions<T extends object = Record<string, unknown>> {
  dataSourceId: ApiQueryId;
  dataSourceEndpoint: string;
  options?: Omit<SearchOptions<T>, 'pagination'>;
  limit?: number;
  queryOptions?: Omit<
    UseInfiniteQueryOptions<
      SearchApiResponse<T>,
      AxiosError,
      SearchApiResponse<T>,
      SearchApiResponse<T>,
      [ApiQueryId, Omit<SearchOptions<T>, 'pagination'>]
    >,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'getPreviousPageParam'
  >;
}

export const useInfiniteSearch = <T extends object = Record<string, unknown>>({
  dataSourceId,
  queryOptions,
  options,
  dataSourceEndpoint,
  limit = 10,
}: UseInfiniteSearchOptions<T>) => {
  const { sortBy, filters, q } = options || {};

  const { data, ...query } = useInfiniteQuery(
    [dataSourceId, { sortBy, filters, q }],
    ({ pageParam = 1 }) => {
      return search({
        dataSourceEndpoint,
        pagination: {
          page: pageParam,
          limit,
        },
        sortBy,
        filters,
        q,
      });
    },
    {
      ...queryOptions,
      getNextPageParam: (lastPage) => {
        if (lastPage.meta.page === lastPage.meta.total_pages || lastPage.meta.total_pages === 0) {
          return undefined;
        }
        return lastPage.meta.page + 1;
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.meta.page === 1) {
          return undefined;
        }
        return firstPage.meta.page - 1;
      },
    }
  );

  const meta: SearchApiResponseMeta = useMemo(() => {
    return (
      data?.pages[data.pages.length - 1].meta || {
        has_next_page: false,
        has_previous_page: false,
        limit,
        page: 1,
        total_count: 0,
        total_pages: 1,
      }
    );
  }, [data?.pages, limit]);

  return { data: data?.pages.flatMap((p) => p.data) || [], meta, ...query };
};
