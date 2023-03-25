const filterName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addFilter(filterName, (array, key) => {
        const result = [];

        for (let i = 0; i < array.length; i++) {
            result.push(array[i][key]);
        }

        return result;
    });
}
