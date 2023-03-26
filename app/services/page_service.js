import fs from "fs";
import * as dotenv from "dotenv";
import {createRequire} from "module";
import {Route} from "../classes/Route.js";
import {app, dataPath, homePage, projectRoot, serverUrl, templateExtension} from "../constants.js";

dotenv.config();

const require = createRequire(import.meta.url);

export const getPageNames = () => {
    return fs.readdirSync('templates').filter(function (file) {
        return !(fs.statSync('templates/' + file).isDirectory() || file === '.' || file === '..');
    }).map(function (file) {
        return file.replace(templateExtension, '');
    });
}

export const getPageData = (req, pageName) => {
    const pageData = require(projectRoot + dataPath + '/' + pageName + '.json');
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
    return pageData;
}
