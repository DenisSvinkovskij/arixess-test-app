export interface AxiosResponse<T> {
  data: T;
}

export interface SearchResponse<T> {
  results: T[];
  info: Info;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface PaginationRequest {
  currentPage?: number;
  perPage?: number;
  gender?: 'male' | 'female';
}

export interface Range {
  min: number;
  max: number;
}
