export class CohortsApi {
    constructor(client) {
        this.client = client;
    }
    list() {
        return this.client.get('/WebAPI/cohortdefinition');
    }
    get(id) {
        return this.client.get(`/WebAPI/cohortdefinition/${id}`);
    }
    create(data) {
        return this.client.post('/WebAPI/cohortdefinition', data);
    }
    update(id, data) {
        return this.client.put(`/WebAPI/cohortdefinition/${id}`, data);
    }
    delete(id) {
        return this.client.delete(`/WebAPI/cohortdefinition/${id}`);
    }
    generate(id, sourceKey) {
        return this.client.get(`/WebAPI/cohortdefinition/${id}/generate/${sourceKey}`);
    }
    generationInfo(id) {
        return this.client.get(`/WebAPI/cohortdefinition/${id}/info`);
    }
}
//# sourceMappingURL=cohorts.js.map