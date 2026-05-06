export class ConceptSetsApi {
    constructor(client) {
        this.client = client;
    }
    list() {
        return this.client.get('/WebAPI/conceptset');
    }
    get(id) {
        return this.client.get(`/WebAPI/conceptset/${id}`);
    }
    getExpression(id) {
        return this.client.get(`/WebAPI/conceptset/${id}/expression`);
    }
    create(data) {
        return this.client.post('/WebAPI/conceptset', data);
    }
    update(id, data) {
        return this.client.put(`/WebAPI/conceptset/${id}`, data);
    }
    delete(id) {
        return this.client.delete(`/WebAPI/conceptset/${id}`);
    }
}
//# sourceMappingURL=conceptSets.js.map