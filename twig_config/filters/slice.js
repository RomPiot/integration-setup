const filterName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addFilter(filterName, (array, start, length) => {
        if (typeof start === 'undefined') {
            start = 0;
        } else if (start < 0) {
            start = array.length + start;
        }

        if (typeof length === 'undefined') {
            length = array.length - start;
        }

        return array.slice(start, start + length);
    });
}
