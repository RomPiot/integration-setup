import express from 'express';
import nunjucks from 'nunjucks';
import fs from 'fs';
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import {createRequire} from "module";
import path from "path";
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

const app = express();
app.use(connectLiveReload());

// Setup nunjucks templating engine
const env = nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    watch: true
});

env.addGlobal('assets', function (pathUrl) {
    return pathUrl;
});

app.set('port', process.env.PORT || 3001);

const pageNames = fs.readdirSync('templates').filter(function (file) {
    return !(fs.statSync('templates/' + file).isDirectory() || file === '.' || file === '..');


}).map(function (file) {
    return file.replace('.html.twig', '');
});

// render css & js
app.get('/build/front.css', function (req, res) {
    res.sendFile(__dirname + '/public/build/front.css');
});

app.get('/build/front.js', function (req, res) {
    res.sendFile(__dirname + '/public/build/front.js');
});

for (let pageName of pageNames) {
    console.log('Adding route for page: ' + pageName)
    app.get('/' + pageName, function (req, res) {
        const page_data = require('./data/' + pageName + '.json');

        res.render(pageName + '.html.twig', page_data);
    });
}

app.listen(app.get('port'), function () {
    console.log('Server started on port', app.get('port'));
});
