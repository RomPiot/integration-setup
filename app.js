import express from 'express';
import nunjucks from 'nunjucks';
import fs from 'fs';
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import {createRequire} from "module";

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
nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    watch: true
});

app.set('port', process.env.PORT || 3001);

const pageNames = fs.readdirSync('templates').filter(function (file) {
    return !(fs.statSync('templates/' + file).isDirectory() || file === '.' || file === '..');


}).map(function (file) {
    return file.replace('.html.twig', '');
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
