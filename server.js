import express from 'express';
import nunjucks from 'nunjucks';
import fs from 'fs';
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import {createRequire} from "module";
import * as dotenv from 'dotenv';
import {autoloadTwigConfig} from "./twig_config/autoload_twig_config.js";
import chalk from 'chalk';

dotenv.config();

const require = createRequire(import.meta.url);
const liveReloadServer = livereload.createServer();

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 10);
});

const server = express();
server.use(connectLiveReload());

// Setup nunjucks templating engine
const env = nunjucks.configure('templates', {
    autoescape: true,
    express: server,
    watch: true
});


const getPageNames = () => {
    return fs.readdirSync('templates').filter(function (file) {
        return !(fs.statSync('templates/' + file).isDirectory() || file === '.' || file === '..');
    }).map(function (file) {
        return file.replace('.html.twig', '');
    });
}

const pageNames = getPageNames();

const pageToSearch = ['home', 'homepage'];
for (let pageName of pageToSearch) {
    if (pageNames.includes(pageName)) {
        pageNames.splice(pageNames.indexOf(pageName), 1);
        server.get('/', function (req, res) {
            const pageData = getPageData(req, pageName);
            res.render(pageName + '.html.twig', pageData);
        });
    }
}

for (let pageName of pageNames) {
    server.get('/' + pageName, function (req, res) {
        const pageData = getPageData(req, pageName);
        res.render(pageName + '.html.twig', pageData);
    });
}

autoloadTwigConfig(env);

server.use(express.static('public'));

server.set('port', process.env.SERVER_PORT || 3001);

server.listen(server.get('port'), function () {
    const serverHost = process.env.SERVER_HOST || 'localhost';
    const serverPort = process.env.SERVER_PORT || 3001;
    const serverUri = 'http://' + serverHost + ':' + serverPort;

    console.log('Server started on ' + chalk.blueBright(serverUri));

    for (let pageName of pageNames) {
        console.log('Route enabled: ' + chalk.blueBright(serverUri + '/' + pageName));
    }
});

const getPageData = (req, pageName) => {
    const pageApp = {
        request: {
            uri: ''
        }
    }

    const pageData = require('./data/' + pageName + '.json');
    pageData.url = req.protocol + '://' + req.get('host') + '/' + pageName;
    pageData.app = pageApp;
    pageData.app.request.uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    pageData.app.routes = [];

    for (let pageName of getPageNames()) {
        pageData.app.routes.push({
            name: pageName,
            url: req.protocol + '://' + req.get('host') + '/' + pageName
        });
    }

    return pageData;
}

