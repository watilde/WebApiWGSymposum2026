export class SourcesApi {
    constructor(client) {
        this.client = client;
    }
    list() {
        return this.client.get('/WebAPI/source/sources');
    }
    get(sourceKey) {
        return this.client.get(`/WebAPI/source/${sourceKey}`);
    }
    create(data) {
        return this.client.post('/WebAPI/source', data);
    }
    delete(sourceKey) {
        return this.client.delete(`/WebAPI/source/${sourceKey}`);
    }
    refresh() {
        return this.client.get('/WebAPI/source/refresh');
    }
}
//# sourceMappingURL=sources.js.map