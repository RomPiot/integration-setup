import fs from "fs";
import * as dotenv from "dotenv";
import {createRequire} from "module";

dotenv.config();
const require = createRequire(import.meta.url);

export const templateExtension = '.' + process.env.TEMPLATE_EXTENSION || '.html.twig';
export const templatePath = process.env.TEMPLATE_PATH || 'templates';
export const dataPath = process.env.DATA_PATH || 'data';
export const publicPath = process.env.PUBLIC_PATH || 'public';
export const serverProtocol = 'http://';
export const serverHost = process.env.SERVER_HOST || 'localhost';
export const serverPort = process.env.SERVER_PORT || 3001;
export const serverUrl = serverProtocol + serverHost + ':' + serverPort + '/';
export const homePage = process.env.HOME_PAGE || 'home';

export const getPageNames = () => {
    return fs.readdirSync('templates').filter(function (file) {
        return !(fs.statSync('templates/' + file).isDirectory() || file === '.' || file === '..');
    }).map(function (file) {
        return file.replace(templateExtension, '');
    });
}

export const getPageData = (req, pageName) => {
    const pageApp = {
        request: {
            uri: ''
        }
    }

    const pageData = require('./' + dataPath + '/' + pageName + '.json');
    pageData.url = serverUrl + pageName;
    pageData.app = pageApp;
    const originalUrl = req.originalUrl.replace('/', '');
    pageData.app.request.uri = serverUrl + originalUrl;
    pageData.app.routes = [];

    for (let pageName of getPageNames()) {
        const pageUrl = pageName === homePage ? '' : pageName;
        pageData.app.routes.push({
            name: pageName,
            url: serverUrl + pageUrl
        });
    }

    return pageData;
}
