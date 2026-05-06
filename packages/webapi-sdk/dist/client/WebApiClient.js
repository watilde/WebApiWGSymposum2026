import { WebApiRequestError } from '../types/common';
import { SourcesApi } from '../api/sources';
import { CohortsApi } from '../api/cohorts';
import { ConceptSetsApi } from '../api/conceptSets';
import { VocabularyApi } from '../api/vocabulary';
import { AnalysesApi } from '../api/analyses';
export class WebApiClient {
    constructor(config) {
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
    async request(path, options = {}) {
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
                if (body?.message)
                    message = body.message;
            }
            catch {
                // ignore parse error
            }
            throw new WebApiRequestError(message, response.status, path);
        }
        if (response.status === 204)
            return undefined;
        return response.json();
    }
    get(path, headers) {
        return this.request(path, { method: 'GET', headers });
    }
    post(path, body) {
        return this.request(path, {
            method: 'POST',
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
    }
    put(path, body) {
        return this.request(path, {
            method: 'PUT',
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
    }
    delete(path) {
        return this.request(path, { method: 'DELETE' });
    }
}
export function createWebApiClient(config) {
    return new WebApiClient(config);
}
//# sourceMappingURL=WebApiClient.js.map