import fs from "fs";
import nunjucks from 'nunjucks';

const functionName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addGlobal(functionName, function source(filePath) {
            const partialPath = "templates/" + filePath;
            if (!fs.existsSync(partialPath)) {
                console.error(`The file ${partialPath} does not exist`);
            }

            let content = fs.readFileSync(partialPath, 'utf8');
            content = "{% raw %}" + content + "{% endraw %}";

            return nunjucks.renderString(content, {whitespaceTrim: true});
        }
    )
    ;
}
