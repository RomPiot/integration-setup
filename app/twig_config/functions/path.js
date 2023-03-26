import fs from "fs";
import {homePage, templateExtension, templatePath} from "../../constants.js";

const functionName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addGlobal(functionName, (pageName) => {
        if (pageName.endsWith(templateExtension)) {
            pageName = pageName.replace(templateExtension, '');
        }

        const pagePath = templatePath + '/' + pageName + templateExtension;

        if (pageName === homePage) {
            pageName = '/';
        }

        if (!fs.existsSync(pagePath)) {
            console.error(`The file ${pagePath} does not exist`);
        }

        return pageName;
    });
}
