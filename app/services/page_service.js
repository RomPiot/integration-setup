import fs from "fs";
import * as dotenv from "dotenv";
import {createRequire} from "module";
import {Route} from "../classes/Route.js";
import {
    app,
    dataPath,
    dataRoot,
    elementSelector,
    homePage,
    listSelector,
    projectRoot,
    serverUrl,
    templateExtension,
    templatePath
} from "../constants.js";
import {mainNavigation} from "./navigation_service.js";

dotenv.config();

const require = createRequire(import.meta.url);

export const getAllPageNames = (full = true) => {
    let allPageNames = [];

    let pageNames = fs.readdirSync(templatePath).filter(function (file) {
        return !(fs.statSync(templatePath + '/' + file).isDirectory() || file === '.' || file === '..');
    }).map(function (file) {
        return file.replace(templateExtension, '');
    });

    for (let pageName of pageNames) {
        const pageData = loadJsonData({}, pageName);

        if (pageData && pageData[listSelector]) {
            const list = pageData[listSelector];

            for (let item of list) {
                if (item[elementSelector]) {
                    if (full) {
                        allPageNames.push(pageName + '/' + item[elementSelector]);
                    } else {
                        allPageNames.push(pageName + '/{' + elementSelector + '}');
                        break;
                    }

                }
            }
        } else {
            allPageNames.push(pageName);
        }
    }

    return allPageNames;
}

export const getPageData = (req, pageName) => {
    const pageData = loadJsonData(req, pageName);
    pageData.url = serverUrl + pageName;
    pageData.app = app;
    const originalUrl = req.originalUrl.replace('/', '');
    pageData.app.request.setUri(serverUrl + originalUrl);

    let routes = [];
    for (let pageName of getAllPageNames()) {
        const pageUrl = pageName === homePage ? '' : pageName;
        const route = new Route(pageName, serverUrl + pageUrl);
        routes.push(route);
    }

    pageData.app.setRoutes(routes);
    pageData.app.setMainNav(mainNavigation())
    return pageData;
}

function loadJsonData(req, pageName) {
    console.log({pageName})
    let pageElement = null;
    const pageData = pageName.split('/');
    if (pageData.length > 1) {
        pageName = pageData[0];
        pageElement = parseInt(pageData[1]);
    }

    let jsonData = require(projectRoot + dataPath + '/' + pageName + '.json');

    if (pageElement) {
        for (let item of jsonData[listSelector]) {
            if (parseInt(item[elementSelector]) === pageElement) {
                jsonData = item;
                break;
            }
        }
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
        jsonData[property] = require(jsonPath)[listSelector];
    }

    return jsonData;
}
