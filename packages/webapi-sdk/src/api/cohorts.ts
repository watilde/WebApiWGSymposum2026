import type { WebApiClient } from '../client/WebApiClient';
import type { CohortDefinitionInfo, CohortDefinitionDTO, CohortGenerationInfo } from '../types/cohort';

export class CohortsApi {
  constructor(private readonly client: WebApiClient) {}

  list(): Promise<CohortDefinitionInfo[]> {
    return this.client.get<CohortDefinitionInfo[]>('/WebAPI/cohortdefinition');
  }

  get(id: number): Promise<CohortDefinitionDTO> {
    return this.client.get<CohortDefinitionDTO>(`/WebAPI/cohortdefinition/${id}`);
  }

  create(data: Omit<CohortDefinitionDTO, 'id'>): Promise<CohortDefinitionDTO> {
    return this.client.post<CohortDefinitionDTO>('/WebAPI/cohortdefinition', data);
  }

  update(id: number, data: CohortDefinitionDTO): Promise<CohortDefinitionDTO> {
    return this.client.put<CohortDefinitionDTO>(`/WebAPI/cohortdefinition/${id}`, data);
  }

  delete(id: number): Promise<void> {
    return this.client.delete<void>(`/WebAPI/cohortdefinition/${id}`);
  }

  generate(id: number, sourceKey: string): Promise<void> {
    return this.client.get<void>(`/WebAPI/cohortdefinition/${id}/generate/${sourceKey}`);
  }

  generationInfo(id: number): Promise<CohortGenerationInfo[]> {
    return this.client.get<CohortGenerationInfo[]>(`/WebAPI/cohortdefinition/${id}/info`);
  }
}
