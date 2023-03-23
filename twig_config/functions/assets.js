export function assets(env) {
    env.addGlobal('assets', function (pathUrl) {
        return pathUrl;
    });
}
