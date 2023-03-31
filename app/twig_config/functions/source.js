import fs from 'fs';
import nunjucks from 'nunjucks';

const functionName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addGlobal(functionName, (filePath) => {
        filePath = 'templates/' + filePath;
        if (!fs.existsSync(filePath)) {
            console.error(`The file ${filePath} does not exist`);
        }

        let content = fs.readFileSync(filePath, 'utf8');
        content = '{% raw %}' + content + '{% endraw %}';

        return nunjucks.renderString(content, {whitespaceTrim: true});
    }
    )
    ;
}
