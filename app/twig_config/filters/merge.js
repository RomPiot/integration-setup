const filterName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addFilter(filterName, (value, args) => {
        if (!Array.isArray(args)) {
            console.error("Merge filter requires an array argument");
        }

        return [...value, ...args];
    });
}
