import type { Concept } from '../../types/concept';
export interface UseVocabularySearchResult {
    data: Concept[];
    isLoading: boolean;
    error: Error | null;
}
export declare function useVocabularySearch(query: string, sourceKey: string | null): UseVocabularySearchResult;
//# sourceMappingURL=useVocabularySearch.d.ts.map