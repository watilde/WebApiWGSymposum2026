import type { WebApiClient } from '../client/WebApiClient';
import type { Concept, VocabularySearchRequest, RelatedConceptResult } from '../types/concept';

export class VocabularyApi {
  constructor(private readonly client: WebApiClient) {}

  search(sourceKey: string, request: VocabularySearchRequest): Promise<Concept[]> {
    return this.client.post<Concept[]>(`/WebAPI/vocabulary/${sourceKey}/search`, request);
  }

  searchByText(sourceKey: string, query: string): Promise<Concept[]> {
    return this.search(sourceKey, { QUERY: query });
  }

  getConcept(sourceKey: string, conceptId: number): Promise<Concept> {
    return this.client.get<Concept>(`/WebAPI/vocabulary/${sourceKey}/concept/${conceptId}`);
  }

  lookupIdentifiers(sourceKey: string, conceptIds: number[]): Promise<Concept[]> {
    return this.client.post<Concept[]>(`/WebAPI/vocabulary/${sourceKey}/lookup/identifiers`, conceptIds);
  }

  getRelated(sourceKey: string, conceptId: number): Promise<RelatedConceptResult[]> {
    return this.client.get<RelatedConceptResult[]>(`/WebAPI/vocabulary/${sourceKey}/concept/${conceptId}/related`);
  }
}
