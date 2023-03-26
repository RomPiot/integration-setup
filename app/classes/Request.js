export class Request {
    constructor() {
        this.uri = '';
    }

    setUri(uri) {
        this.uri = uri;
    }

    getUri() {
        return this.uri;
    }
}
