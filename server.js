import express from 'express';
import nunjucks from 'nunjucks';
import fs from 'fs';
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import {createRequire} from "module";
import path from "path";
import * as dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const require = createRequire(import.meta.url);
const liveReloadServer = livereload.createServer();

liveReloadServer.watch('assets');
liveReloadServer.watch('templates');

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

const server = express();
server.use(connectLiveReload());

// Setup nunjucks templating engine
const env = nunjucks.configure('templates', {
    autoescape: true,
    express: server,
    watch: true
});

env.addGlobal('assets', function (pathUrl) {
    return pathUrl;
});

server.set('port', process.env.SERVER_PORT || 3001);

const pageNames = fs.readdirSync('templates').filter(function (file) {
    return !(fs.statSync('templates/' + file).isDirectory() || file === '.' || file === '..');


}).map(function (file) {
    return file.replace('.html.twig', '');
});

// render css & js
server.get('/build/app.css', function (req, res) {
    res.sendFile(__dirname + '/public/build/app.css');
});

server.get('/build/app.js', function (req, res) {
    res.sendFile(__dirname + '/public/build/app.js');
});

for (let pageName of pageNames) {
    console.log('Adding route for page: ' + pageName)
    server.get('/' + pageName, function (req, res) {
        const page_data = require('./data/' + pageName + '.json');

        res.render(pageName + '.html.twig', page_data);
    });
}

server.listen(server.get('port'), function () {
    console.log('Server started on port', server.get('port'));
});
