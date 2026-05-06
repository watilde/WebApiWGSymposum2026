import { WebApiClientConfig } from '../types/common';
import { SourcesApi } from '../api/sources';
import { CohortsApi } from '../api/cohorts';
import { ConceptSetsApi } from '../api/conceptSets';
import { VocabularyApi } from '../api/vocabulary';
import { AnalysesApi } from '../api/analyses';
export declare class WebApiClient {
    readonly baseUrl: string;
    readonly sources: SourcesApi;
    readonly cohorts: CohortsApi;
    readonly conceptSets: ConceptSetsApi;
    readonly vocabulary: VocabularyApi;
    readonly analyses: AnalysesApi;
    private readonly defaultHeaders;
    constructor(config: WebApiClientConfig);
    request<T>(path: string, options?: RequestInit): Promise<T>;
    get<T>(path: string, headers?: Record<string, string>): Promise<T>;
    post<T>(path: string, body?: unknown): Promise<T>;
    put<T>(path: string, body?: unknown): Promise<T>;
    delete<T>(path: string): Promise<T>;
}
export declare function createWebApiClient(config: WebApiClientConfig): WebApiClient;
//# sourceMappingURL=WebApiClient.d.ts.map