export interface PaginatedRequest {
  /**
   * Return a specific page of results. Defaults to the first page. If set to a number that's greater than the number of
   * pages of results, an empty page is returned. (int32 >= 1)
   *
   * @default 1
   * @example 2
   */
  page?: number;
  /**
   * The number of results to return per response. (int32 >= 1)
   *
   * @default 25
   * @example 50
   */
  page_size?: number;
  /**
   * Controls the sort order of the query.
   *
   * @default "desc"
   */
  sort_dir?: 'asc' | 'desc';
}

export interface OptionalLink {
  href: string;
  type?: 'parent' | 'child';
}

export interface PaginatedResponse {
  total: number;
  pages: number;
  page: number;
  links: {
    first: OptionalLink;
    last: OptionalLink;
    next?: OptionalLink;
    prev?: OptionalLink;
  };
}
