import type { SourceInfo } from '../../types/source';
export interface UseSourcesResult {
    data: SourceInfo[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}
export declare function useSources(): UseSourcesResult;
//# sourceMappingURL=useSources.d.ts.map