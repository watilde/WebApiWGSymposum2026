export class VocabularyApi {
    constructor(client) {
        this.client = client;
    }
    search(sourceKey, request) {
        return this.client.post(`/WebAPI/vocabulary/${sourceKey}/search`, request);
    }
    searchByText(sourceKey, query) {
        return this.search(sourceKey, { QUERY: query });
    }
    getConcept(sourceKey, conceptId) {
        return this.client.get(`/WebAPI/vocabulary/${sourceKey}/concept/${conceptId}`);
    }
    lookupIdentifiers(sourceKey, conceptIds) {
        return this.client.post(`/WebAPI/vocabulary/${sourceKey}/lookup/identifiers`, conceptIds);
    }
    getRelated(sourceKey, conceptId) {
        return this.client.get(`/WebAPI/vocabulary/${sourceKey}/concept/${conceptId}/related`);
    }
}
//# sourceMappingURL=vocabulary.js.map