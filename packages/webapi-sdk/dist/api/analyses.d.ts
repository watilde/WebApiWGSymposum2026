import type { WebApiClient } from '../client/WebApiClient';
import type { AnalysisListItem, IRAnalysisDTO, CharacterizationDTO, EstimationDTO, PredictionDTO, PathwayAnalysisDTO } from '../types/analyses';
export declare class AnalysesApi {
    private readonly client;
    constructor(client: WebApiClient);
    listIncidenceRates(): Promise<AnalysisListItem[]>;
    getIncidenceRate(id: number): Promise<IRAnalysisDTO>;
    listCharacterizations(): Promise<AnalysisListItem[]>;
    getCharacterization(id: number): Promise<CharacterizationDTO>;
    listEstimations(): Promise<AnalysisListItem[]>;
    getEstimation(id: number): Promise<EstimationDTO>;
    listPredictions(): Promise<AnalysisListItem[]>;
    getPrediction(id: number): Promise<PredictionDTO>;
    listPathways(): Promise<AnalysisListItem[]>;
    getPathway(id: number): Promise<PathwayAnalysisDTO>;
}
//# sourceMappingURL=analyses.d.ts.map