export interface SearchApiResponseMeta {
  page: number;
  total_pages: number;
  limit: number;
  total_count: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}

export interface SearchApiPagination {
  page: number;
  limit: number;
}

export interface SearchApiResponse<T> {
  data: T[];
  meta: SearchApiResponseMeta;
}
