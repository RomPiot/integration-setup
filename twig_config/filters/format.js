const filterName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addFilter(filterName, (value, ...args) => {
        return value.replace(/%s/g, function () {
            return args.shift();
        });
    });
}
