import path from "path";
import fs from "fs";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export function autoloadTwigConfig(env) {
    const directories = ['functions', 'filters'];
    for (let directory of directories) {
        const directoryPath = path.join(__dirname, directory);

        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Erreur lors de la lecture du dossier', err);
                return;
            }

            files.forEach((file) => {
                const filename = file.replace('.js', '');
                import('./' + directory + '/' + file).then((module) => {
                    module[filename](env);
                })
            });
        });
    }
}


