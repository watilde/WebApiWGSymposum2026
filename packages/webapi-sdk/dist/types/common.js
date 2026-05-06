export class WebApiRequestError extends Error {
    constructor(message, status, path) {
        super(message);
        this.name = 'WebApiRequestError';
        this.status = status;
        this.path = path;
    }
}
//# sourceMappingURL=common.js.map