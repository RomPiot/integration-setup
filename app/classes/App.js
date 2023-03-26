import {Request} from "./Request.js";

export class App {
    constructor() {
        this.request = new Request();
        this.routes = [];
    }

    setRequest(request) {
        this.request = request;
    }

    getRequest() {
        return this.request;
    }


    setRoutes(routes) {
        this.routes = routes;
    }

    getRoutes() {
        return this.routes;
    }
}
