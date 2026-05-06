import type { WebApiClient } from '../client/WebApiClient';
import type { SourceInfo, SourceCreate } from '../types/source';
export declare class SourcesApi {
    private readonly client;
    constructor(client: WebApiClient);
    list(): Promise<SourceInfo[]>;
    get(sourceKey: string): Promise<SourceInfo>;
    create(data: SourceCreate): Promise<SourceInfo>;
    delete(sourceKey: string): Promise<void>;
    refresh(): Promise<SourceInfo[]>;
}
//# sourceMappingURL=sources.d.ts.map