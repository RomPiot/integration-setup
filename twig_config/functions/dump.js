import {dump as dumper} from 'dumper.js';
import nunjucks from "nunjucks";

const functionName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addGlobal(functionName, function (element) {
        dumper(element);

        element = JSON.stringify(element, null, 4);
        return nunjucks.renderString(element, {whitespaceTrim: true});
    });
}
