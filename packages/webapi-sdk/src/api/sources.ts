import type { WebApiClient } from '../client/WebApiClient';
import type { SourceInfo, SourceCreate } from '../types/source';

export class SourcesApi {
  constructor(private readonly client: WebApiClient) {}

  list(): Promise<SourceInfo[]> {
    return this.client.get<SourceInfo[]>('/WebAPI/source/sources');
  }

  get(sourceKey: string): Promise<SourceInfo> {
    return this.client.get<SourceInfo>(`/WebAPI/source/${sourceKey}`);
  }

  create(data: SourceCreate): Promise<SourceInfo> {
    return this.client.post<SourceInfo>('/WebAPI/source', data);
  }

  delete(sourceKey: string): Promise<void> {
    return this.client.delete<void>(`/WebAPI/source/${sourceKey}`);
  }

  refresh(): Promise<SourceInfo[]> {
    return this.client.get<SourceInfo[]>('/WebAPI/source/refresh');
  }
}
