import type { WebApiClient } from '../client/WebApiClient';
import type { CohortDefinitionInfo, CohortDefinitionDTO, CohortGenerationInfo } from '../types/cohort';
export declare class CohortsApi {
    private readonly client;
    constructor(client: WebApiClient);
    list(): Promise<CohortDefinitionInfo[]>;
    get(id: number): Promise<CohortDefinitionDTO>;
    create(data: Omit<CohortDefinitionDTO, 'id'>): Promise<CohortDefinitionDTO>;
    update(id: number, data: CohortDefinitionDTO): Promise<CohortDefinitionDTO>;
    delete(id: number): Promise<void>;
    generate(id: number, sourceKey: string): Promise<void>;
    generationInfo(id: number): Promise<CohortGenerationInfo[]>;
}
//# sourceMappingURL=cohorts.d.ts.map