import type { WebApiClient } from '../client/WebApiClient';
import type { Concept, VocabularySearchRequest, RelatedConceptResult } from '../types/concept';
export declare class VocabularyApi {
    private readonly client;
    constructor(client: WebApiClient);
    search(sourceKey: string, request: VocabularySearchRequest): Promise<Concept[]>;
    searchByText(sourceKey: string, query: string): Promise<Concept[]>;
    getConcept(sourceKey: string, conceptId: number): Promise<Concept>;
    lookupIdentifiers(sourceKey: string, conceptIds: number[]): Promise<Concept[]>;
    getRelated(sourceKey: string, conceptId: number): Promise<RelatedConceptResult[]>;
}
//# sourceMappingURL=vocabulary.d.ts.map