export interface PagefindSearchOptions {
  /** If set, this call will load all assets but return before searching. Prefer using pagefind.preload() instead */
  preload?: boolean;
  /** Add more verbose console logging for this search query */
  verbose?: boolean;
  /** The set of filters to execute with this search. Input type is extremely flexible, see the filtering docs for details */
  filters?: object;
  /** The set of sorts to use for this search, instead of relevancy */
  sort?: object;
  /** Base URL for search results */
  baseUrl?: string;
  [key: string]: any;
}

export interface PagefindResult {
  excerpt: string;
  meta: {
    title: string;
  };
  raw_url: string;
  sub_results: {
    excerpt: string;
    title: string;
    url: string;
  }[];
  url: string;
}

export interface PagefindSearchResponse<T> {
  results: Array<{
    data(): Promise<T>;
  }>;
}

export interface Pagefind {
  debouncedSearch<T>(
    query: string,
    options?: PagefindSearchOptions
  ): Promise<PagefindSearchResponse<T> | null>;
  options(options: { baseUrl: string }): Promise<void>;
}

declare global {
  interface Window {
    pagefind?: {
      options: (options: PagefindSearchOptions) => Promise<void>;
      debouncedSearch: <T>(query: string, options?: PagefindSearchOptions) => Promise<{
        results: Array<{
          data: () => Promise<T>;
        }>;
      }>;
    };
  }
}

export {};
