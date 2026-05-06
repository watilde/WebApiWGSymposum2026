import type { CohortDefinitionInfo, CohortDefinitionDTO } from '../../types/cohort';
export interface UseCohortsResult {
    data: CohortDefinitionInfo[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}
export declare function useCohorts(): UseCohortsResult;
export interface UseCohortResult {
    data: CohortDefinitionDTO | null;
    isLoading: boolean;
    error: Error | null;
}
export declare function useCohort(id: number | null): UseCohortResult;
//# sourceMappingURL=useCohorts.d.ts.map