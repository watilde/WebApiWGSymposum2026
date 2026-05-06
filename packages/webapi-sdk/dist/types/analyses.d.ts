export interface AnalysisListItem {
    id: number;
    name: string;
    description?: string;
    createdBy?: {
        login: string;
        name: string;
    } | null;
    createdDate?: string;
    modifiedDate?: string | null;
}
export interface IRAnalysisDTO extends AnalysisListItem {
    expression: unknown;
}
export interface CharacterizationDTO extends AnalysisListItem {
    stratas: unknown[];
    featureAnalyses: unknown[];
    parameters: unknown[];
}
export interface EstimationDTO extends AnalysisListItem {
    specification: unknown;
}
export interface PredictionDTO extends AnalysisListItem {
    specification: unknown;
}
export interface PathwayAnalysisDTO extends AnalysisListItem {
    targetCohorts: unknown[];
    eventCohorts: unknown[];
    combinationWindow: number;
    minCellCount: number;
    maxDepth: number;
}
//# sourceMappingURL=analyses.d.ts.map