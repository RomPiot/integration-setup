import fs from "fs";
import nunjucks from 'nunjucks';

export function source(env) {
    env.addGlobal('source', function source(filePath) {
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
