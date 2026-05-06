export interface PageRequest {
  page?: number;
  pageSize?: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface WebApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface WebApiError {
  status: number;
  message: string;
  path?: string;
}

export class WebApiRequestError extends Error {
  readonly status: number;
  readonly path?: string;
  constructor(message: string, status: number, path?: string) {
    super(message);
    this.name = 'WebApiRequestError';
    this.status = status;
    this.path = path;
  }
}
