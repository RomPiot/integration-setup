import path from 'path';
import fs from 'fs';
import {appRoot} from '../constants.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export function autoloadTwigConfig(env) {
    const directories = ['functions', 'filters'];
    for (let directory of directories) {
        const directoryPath = path.join(__dirname, directory);

        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Error on reading the folder', err);
                return;
            }

            files = files.filter((file) => {
                return file.endsWith('.js');
            });

            files.forEach((file) => {
                import(appRoot + 'twig_config/' + directory + '/' + file).then((module) => {
                    module.default(env);
                });
            });
        });
    }
}



