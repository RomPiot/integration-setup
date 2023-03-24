import {dump as dumper} from 'dumper.js';
import nunjucks from "nunjucks";

export function dump(env) {
    env.addGlobal('dump', function (element) {
        dumper(element);

        element = JSON.stringify(element, null, 4);
        return nunjucks.renderString(element, {whitespaceTrim: true});
    });
}
