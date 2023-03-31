import {serverUrl} from '../../constants.js';
import * as getPageName from './path.js';

const functionName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addGlobal(functionName, (pageName) => {
        pageName = getPageName.default(env)(pageName);

        return serverUrl + pageName;
    });
}
