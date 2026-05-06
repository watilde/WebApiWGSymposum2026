export class AnalysesApi {
    constructor(client) {
        this.client = client;
    }
    listIncidenceRates() {
        return this.client.get('/WebAPI/ir');
    }
    getIncidenceRate(id) {
        return this.client.get(`/WebAPI/ir/${id}`);
    }
    listCharacterizations() {
        return this.client.get('/WebAPI/characterization');
    }
    getCharacterization(id) {
        return this.client.get(`/WebAPI/characterization/${id}`);
    }
    listEstimations() {
        return this.client.get('/WebAPI/estimation');
    }
    getEstimation(id) {
        return this.client.get(`/WebAPI/estimation/${id}`);
    }
    listPredictions() {
        return this.client.get('/WebAPI/prediction');
    }
    getPrediction(id) {
        return this.client.get(`/WebAPI/prediction/${id}`);
    }
    listPathways() {
        return this.client.get('/WebAPI/pathway-analysis');
    }
    getPathway(id) {
        return this.client.get(`/WebAPI/pathway-analysis/${id}`);
    }
}
//# sourceMappingURL=analyses.js.map