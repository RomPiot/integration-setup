const functionName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addGlobal(functionName, function (filePath) {
        return filePath;
    });
}
