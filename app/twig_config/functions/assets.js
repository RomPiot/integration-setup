const functionName = import.meta.url.split('/').pop().replace('.js', '');

export default async function (env) {
    env.addGlobal(functionName, (filePath) => {
        return filePath;
    });
}
