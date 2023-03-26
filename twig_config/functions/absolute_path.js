import fs from "fs";
import chalk from "chalk";

const functionName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addGlobal(functionName, (pageName) => {
        const serverHost = process.env.SERVER_HOST || 'localhost';
        const serverPort = process.env.SERVER_PORT || 3001;

        const serverUri = 'http://' + serverHost + ':' + serverPort;

        if (pageName.endsWith('.html.twig')) {
            pageName = pageName.replace('.html.twig', '');
        }

        const pageToSearch = ['home', 'homepage'];
        const pagePath = "templates/" + pageName + ".html.twig";
        if (pageToSearch.includes(pageName)) {
            pageName = '';
        }

        if (!fs.existsSync(pagePath)) {
            console.error(`The file ${pagePath} does not exist`);
        }

        return serverUri + '/' + pageName;
    });
}
