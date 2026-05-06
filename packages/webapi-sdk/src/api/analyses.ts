import type { WebApiClient } from '../client/WebApiClient';
import type { AnalysisListItem, IRAnalysisDTO, CharacterizationDTO, EstimationDTO, PredictionDTO, PathwayAnalysisDTO } from '../types/analyses';

export class AnalysesApi {
  constructor(private readonly client: WebApiClient) {}

  listIncidenceRates(): Promise<AnalysisListItem[]> {
    return this.client.get<AnalysisListItem[]>('/WebAPI/ir');
  }

  getIncidenceRate(id: number): Promise<IRAnalysisDTO> {
    return this.client.get<IRAnalysisDTO>(`/WebAPI/ir/${id}`);
  }

  listCharacterizations(): Promise<AnalysisListItem[]> {
    return this.client.get<AnalysisListItem[]>('/WebAPI/characterization');
  }

  getCharacterization(id: number): Promise<CharacterizationDTO> {
    return this.client.get<CharacterizationDTO>(`/WebAPI/characterization/${id}`);
  }

  listEstimations(): Promise<AnalysisListItem[]> {
    return this.client.get<AnalysisListItem[]>('/WebAPI/estimation');
  }

  getEstimation(id: number): Promise<EstimationDTO> {
    return this.client.get<EstimationDTO>(`/WebAPI/estimation/${id}`);
  }

  listPredictions(): Promise<AnalysisListItem[]> {
    return this.client.get<AnalysisListItem[]>('/WebAPI/prediction');
  }

  getPrediction(id: number): Promise<PredictionDTO> {
    return this.client.get<PredictionDTO>(`/WebAPI/prediction/${id}`);
  }

  listPathways(): Promise<AnalysisListItem[]> {
    return this.client.get<AnalysisListItem[]>('/WebAPI/pathway-analysis');
  }

  getPathway(id: number): Promise<PathwayAnalysisDTO> {
    return this.client.get<PathwayAnalysisDTO>(`/WebAPI/pathway-analysis/${id}`);
  }
}
