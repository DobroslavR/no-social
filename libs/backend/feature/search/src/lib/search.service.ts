import { EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  NestedPath,
  SearchApiResponse,
  SearchApiResponseMeta,
  SearchRequestFilterOperator,
  SearchRequestDto,
  SearchRequestFilterDto,
  SearchRequestPaginationDto,
  SearchRequestSortDto,
} from '@shared';
import { FilterQuery, QueryOrderMap } from '@mikro-orm/core';
import { merge, set } from 'lodash';
import { AutoPath } from '@mikro-orm/core/typings';
import { Exception } from '@backend/shared';

const getSmartQueryCondition = <T>(filter: SearchRequestFilterDto<T>): FilterQuery<T> => {
  const { operator, value } = filter;

  switch (operator) {
    case SearchRequestFilterOperator.CONTAINS:
      return { $contains: value } as FilterQuery<T>;
    case SearchRequestFilterOperator.NOT_CONTAINS:
      return { $not: { $contains: value } } as FilterQuery<T>;
    case SearchRequestFilterOperator.EQUAL:
    default:
      return { $eq: value } as FilterQuery<T>;
    case SearchRequestFilterOperator.NOT_EQUAL:
      return { $not: { $eq: value } } as FilterQuery<T>;
    case SearchRequestFilterOperator.ENDS_WITH:
      return { $ilike: `%${value}` } as FilterQuery<T>;
    case SearchRequestFilterOperator.STARTS_WITH:
      return { $ilike: `${value}%` } as FilterQuery<T>;
    case SearchRequestFilterOperator.GREATER_THAN:
      return { $gt: value } as FilterQuery<T>;
    case SearchRequestFilterOperator.LESS_THAN:
      return { $lt: value } as FilterQuery<T>;
    case SearchRequestFilterOperator.GREATER_THAN_OR_EQUAL:
      return { $gte: value } as FilterQuery<T>;
    case SearchRequestFilterOperator.LESS_THAN_OR_EQUAL:
      return { $lte: value } as FilterQuery<T>;
    case SearchRequestFilterOperator.BETWEEN:
      // eslint-disable-next-line no-case-declarations
      const v = value as [Date, Date] | [number, number];
      return { $and: [{ $gte: v[0] }, { $lte: v[1] }] } as FilterQuery<T>;
    case SearchRequestFilterOperator.NOT_BETWEEN:
      // eslint-disable-next-line no-case-declarations
      const notV = value as [Date, Date] | [number, number];
      return {
        $not: { $and: [{ $gte: notV[0] }, { $lte: notV[1] }] },
      } as FilterQuery<T>;
    case SearchRequestFilterOperator.IN_LIST:
      return { $in: value } as FilterQuery<T>;
    case SearchRequestFilterOperator.NOT_IN_LIST:
      return { $nin: value } as FilterQuery<T>;
  }
};

const getFilterCondition = <T>(filter: SearchRequestFilterDto<T>) => {
  const { path } = filter;
  const obj = {};
  set(obj, path, getSmartQueryCondition(filter));
  return obj;
};

const generateFilterQueries = <T>({
  filters,
  predefinedFilters,
  searchFields,
  q,
}: {
  filters: SearchRequestFilterDto<T>[];
  predefinedFilters: FilterQuery<T>;
  searchFields?: NestedPath<T>[];
  q?: string;
}) => {
  const filterQueries: FilterQuery<T> = {} as FilterQuery<T>;

  for (const f of filters) {
    merge(filterQueries, getFilterCondition(f));
  }

  if (q && searchFields) {
    for (const sf of searchFields) {
      merge(filterQueries, { [sf]: { $ilike: `%${q}%` } });
    }
  }

  const finalFilterQueries = merge(filterQueries, predefinedFilters);

  console.log('finalFilterQueries', finalFilterQueries);

  return merge(filterQueries, predefinedFilters);
};

const checkIfIncludesNotAllowedFilters = <T>(
  allowedFilters: NestedPath<T>[],
  filters?: SearchRequestFilterDto<T>[]
) => {
  const includesNotAllowedFilters = filters
    ? filters.some((f) => {
        return !allowedFilters.includes(f.path as NestedPath<T>);
      })
    : false;
  return includesNotAllowedFilters;
};

const checkIfIncludesNotAllowedSortByRules = <T>(
  allowedSorts: NestedPath<T>[],
  sortByRule?: SearchRequestSortDto<T>
) => {
  const includesNotAllowedSortByRules = sortByRule ? !allowedSorts.includes(sortByRule.path as NestedPath<T>) : false;
  return includesNotAllowedSortByRules;
};

const getPaginationSettings = (searchRequestPaginationDto: SearchRequestPaginationDto) => {
  const { limit, page } = searchRequestPaginationDto;

  return { limit, offset: page === 1 ? 0 : page * limit };
};

const getPaginationMeta = (
  searchRequestPaginationDto: SearchRequestPaginationDto,
  total_count: number
): SearchApiResponseMeta => {
  const { limit, page } = searchRequestPaginationDto;

  const hasOnePage = total_count <= limit;

  const total_pages = hasOnePage ? 1 : Math.ceil(total_count / limit);

  const meta: SearchApiResponseMeta = {
    page,
    limit,
    total_count,
    total_pages,
    has_next_page: total_count > page * limit,
    has_previous_page: page > 1,
  };

  return meta;
};

export interface SearchOptions<T> {
  searchFields?: NestedPath<T>[];
  allowedFilters?: NestedPath<T>[];
  allowedSorts?: NestedPath<T>[];
  searchRequestDto: SearchRequestDto<T>;
  repository: EntityRepository<T>;
  relations?: NestedPath<T>[];
  predefinedFilters?: FilterQuery<T>;
}

@Injectable()
export class SearchService<T> {
  async search(options: SearchOptions<T>): Promise<SearchApiResponse<T>> {
    const {
      repository,
      searchRequestDto,
      allowedFilters = [],
      allowedSorts = [],
      predefinedFilters = [],
      relations = [],
      searchFields = [],
    } = options;

    const { pagination, filters = [], q, sortBy } = searchRequestDto;

    console.log(q);

    if (checkIfIncludesNotAllowedSortByRules(allowedSorts, sortBy)) {
      throw new BadRequestException(Exception.NOT_ALLOWED_SEARCH_SORT);
    }

    if (checkIfIncludesNotAllowedFilters(allowedFilters, filters)) {
      throw new BadRequestException(Exception.NOT_ALLOWED_SEARCH_FILTERS);
    }

    const [data, total_count] = await repository.findAndCount(
      generateFilterQueries({ filters, predefinedFilters, searchFields, q }),
      {
        ...getPaginationSettings(pagination),
        orderBy: sortBy ? ({ [sortBy.path]: sortBy.direction } as QueryOrderMap<T>) : undefined,
        populate: relations as unknown as AutoPath<T, string>[],
      }
    );

    return {
      data,
      meta: getPaginationMeta(pagination, total_count),
    };
  }
}
