import type { WebApiClient } from '../client/WebApiClient';
import type { ConceptSetDTO, ConceptSetExpression } from '../types/concept';
export declare class ConceptSetsApi {
    private readonly client;
    constructor(client: WebApiClient);
    list(): Promise<ConceptSetDTO[]>;
    get(id: number): Promise<ConceptSetDTO>;
    getExpression(id: number): Promise<ConceptSetExpression>;
    create(data: Omit<ConceptSetDTO, 'id' | 'createdDate' | 'modifiedDate' | 'createdBy' | 'modifiedBy'>): Promise<ConceptSetDTO>;
    update(id: number, data: ConceptSetDTO): Promise<ConceptSetDTO>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=conceptSets.d.ts.map