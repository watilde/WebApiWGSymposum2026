import type { WebApiClient } from '../client/WebApiClient';
import type { ConceptSetDTO, ConceptSetExpression } from '../types/concept';

export class ConceptSetsApi {
  constructor(private readonly client: WebApiClient) {}

  list(): Promise<ConceptSetDTO[]> {
    return this.client.get<ConceptSetDTO[]>('/WebAPI/conceptset');
  }

  get(id: number): Promise<ConceptSetDTO> {
    return this.client.get<ConceptSetDTO>(`/WebAPI/conceptset/${id}`);
  }

  getExpression(id: number): Promise<ConceptSetExpression> {
    return this.client.get<ConceptSetExpression>(`/WebAPI/conceptset/${id}/expression`);
  }

  create(data: Omit<ConceptSetDTO, 'id' | 'createdDate' | 'modifiedDate' | 'createdBy' | 'modifiedBy'>): Promise<ConceptSetDTO> {
    return this.client.post<ConceptSetDTO>('/WebAPI/conceptset', data);
  }

  update(id: number, data: ConceptSetDTO): Promise<ConceptSetDTO> {
    return this.client.put<ConceptSetDTO>(`/WebAPI/conceptset/${id}`, data);
  }

  delete(id: number): Promise<void> {
    return this.client.delete<void>(`/WebAPI/conceptset/${id}`);
  }
}
