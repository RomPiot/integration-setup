import fs from "fs";
import * as dotenv from "dotenv";
import {createRequire} from "module";
import {Route} from "../classes/Route.js";
import {
    app,
    dataPath,
    dataRoot,
    homePage,
    projectRoot,
    serverUrl,
    templateExtension,
    templatePath
} from "../constants.js";
import {mainNavigation} from "./navigation_service.js";

dotenv.config();

const require = createRequire(import.meta.url);

export const getPageNames = () => {
    return fs.readdirSync(templatePath).filter(function (file) {
        return !(fs.statSync(templatePath + '/' + file).isDirectory() || file === '.' || file === '..');
    }).map(function (file) {
        return file.replace(templateExtension, '');
    });
}

export const getPageData = (req, pageName) => {
    const pageData = load_json_data(req, pageName);
    pageData.url = serverUrl + pageName;
    pageData.app = app;
    const originalUrl = req.originalUrl.replace('/', '');
    pageData.app.request.setUri(serverUrl + originalUrl);

    let routes = [];
    for (let pageName of getPageNames()) {
        const pageUrl = pageName === homePage ? '' : pageName;
        const route = new Route(pageName, serverUrl + pageUrl);
        routes.push(route);
    }

    pageData.app.setRoutes(routes);
    pageData.app.setMainNav(mainNavigation())
    return pageData;
}

function load_json_data(req, pageName) {
    let jsonData = require(projectRoot + dataPath + '/' + pageName + '.json');
    if (!jsonData) {
        jsonData = require(projectRoot + dataPath + '/list/' + pageName + '.json');
    }

    const toSearch = "include_data";

    let jsonToLoad = [];

    for (let property in jsonData) {
        const propertyValue = jsonData[property];
        if (typeof propertyValue === 'string' && propertyValue.includes(toSearch)) {
            let jsonPath = propertyValue.replace(toSearch + '(', '').replace(')', '');
            jsonPath = jsonPath.replace(/'/g, '');
            jsonPath = dataRoot + jsonPath;

            jsonToLoad[property] = jsonPath;
        }
    }

    for (let property in jsonToLoad) {
        const jsonPath = jsonToLoad[property];
        jsonData[property] = require(jsonPath)['list'];
    }

    return jsonData;
}
