import type { ConceptSetDTO } from '../../types/concept';
export interface UseConceptSetsResult {
    data: ConceptSetDTO[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}
export declare function useConceptSets(): UseConceptSetsResult;
//# sourceMappingURL=useConceptSets.d.ts.map