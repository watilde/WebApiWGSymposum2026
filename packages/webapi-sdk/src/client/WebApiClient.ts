import { WebApiClientConfig, WebApiRequestError } from '../types/common';
import { SourcesApi } from '../api/sources';
import { CohortsApi } from '../api/cohorts';
import { ConceptSetsApi } from '../api/conceptSets';
import { VocabularyApi } from '../api/vocabulary';
import { AnalysesApi } from '../api/analyses';

export class WebApiClient {
  readonly baseUrl: string;
  readonly sources: SourcesApi;
  readonly cohorts: CohortsApi;
  readonly conceptSets: ConceptSetsApi;
  readonly vocabulary: VocabularyApi;
  readonly analyses: AnalysesApi;

  private readonly defaultHeaders: Record<string, string>;

  constructor(config: WebApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...config.headers,
    };
    this.sources = new SourcesApi(this);
    this.cohorts = new CohortsApi(this);
    this.conceptSets = new ConceptSetsApi(this);
    this.vocabulary = new VocabularyApi(this);
    this.analyses = new AnalysesApi(this);
  }

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      let message = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const body = await response.json();
        if (body?.message) message = body.message;
      } catch {
        // ignore parse error
      }
      throw new WebApiRequestError(message, response.status, path);
    }

    if (response.status === 204) return undefined as T;
    return response.json();
  }

  get<T>(path: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(path, { method: 'GET', headers });
  }

  post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

export function createWebApiClient(config: WebApiClientConfig): WebApiClient {
  return new WebApiClient(config);
}
