
export class Route {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setUrl(url) {
        this.url = url;
    }

    getUrl() {
        return this.url;
    }
}
