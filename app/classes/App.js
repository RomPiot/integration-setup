import {Request} from './Request.js';
import {loadJsonData} from '../services/page_service.js';

export class App {
    constructor() {
        this.request = new Request();
        this.routes = [];
        this.nav = [];
        for (let parameter in loadJsonData('site_parameters')) {
            this[parameter] = loadJsonData('site_parameters')[parameter];
        }
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

    setMainNav(nav) {
        this.nav = nav;
    }

    getNav() {
        return this.nav;
    }
}
