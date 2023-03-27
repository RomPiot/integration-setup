import express from 'express';
import nunjucks from 'nunjucks';
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import {autoloadTwigConfig} from "./twig_config/autoload_twig_config.js";
import chalk from 'chalk';
import {getAllPageNames, getPageData} from "./services/page_service.js";
import {homePage, publicPath, serverPort, serverUrl, templateExtension, templatePath} from "./constants.js";

const liveReloadServer = livereload.createServer();

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 10);
});

const server = express();
server.use(connectLiveReload());

const env = nunjucks.configure(templatePath, {
    autoescape: true,
    express: server,
    watch: true
});

autoloadTwigConfig(env);

const pageNames = getAllPageNames();

for (let pageName of pageNames) {
    if (pageName === homePage) {
        server.get('/', function (req, res) {
            const pageData = getPageData(req, pageName);
            res.render(pageName + templateExtension, pageData);
        });

        continue;
    }

    server.get('/' + pageName, function (req, res) {
        const pageData = getPageData(req, pageName);
        pageName = pageName.split('/')[0];
        res.render(pageName + templateExtension, pageData);
    });
}

server.use(express.static(publicPath));
server.set('port', serverPort);

server.listen(server.get('port'), function () {
    console.log('Server started on ' + chalk.blueBright(serverUrl));

    for (let pageName of getAllPageNames(false)) {
        if (pageName === homePage) {
            continue;
        }
        console.log('Route enabled: ' + chalk.blueBright(serverUrl + pageName.replace(templateExtension, '')));
    }
});

