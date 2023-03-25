const filterName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addFilter(filterName, (object) => {
        if (!object) {
            return [];
        }
        return Object.keys(object);
    });
}
