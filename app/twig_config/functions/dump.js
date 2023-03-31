import {dump as dumper} from 'dumper.js';
import nunjucks from 'nunjucks';
import {loadJsonData} from '../../services/page_service.js';

const functionName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addGlobal(functionName, (element) => {
        if (!element) {
            element = loadJsonData('home');
        }

        dumper(element);

        element = JSON.stringify(element, null, 4);
        element = '<pre>' + element + '</pre>';

        return new nunjucks.runtime.SafeString(element);
    });
}
