export function assets(env) {
    env.addGlobal('assets', function (filePath) {
        return filePath;
    });
}
