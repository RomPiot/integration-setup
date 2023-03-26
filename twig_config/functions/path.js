import fs from "fs";

const functionName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addGlobal(functionName, (pageName) => {
        if (pageName.endsWith('.html.twig')) {
            pageName = pageName.replace('.html.twig', '');
        }

        const pageToSearch = ['home', 'homepage'];
        const pagePath = "templates/" + pageName + ".html.twig";

        if (pageToSearch.includes(pageName)) {
            pageName = '/';
        }

        if (!fs.existsSync(pagePath)) {
            console.error(`The file ${pagePath} does not exist`);
        }

        return pageName;
    });
}
