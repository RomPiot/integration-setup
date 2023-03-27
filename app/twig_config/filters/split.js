const filterName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addFilter(filterName, (str, delimiter, limit) => {
        if (!delimiter && limit) {
            // split str each limit chars
            let parts = [];
            for (let i = 0; i < str.length; i += limit) {
                parts.push(str.substr(i, limit));
            }
            return parts;
        }

        if (!delimiter) {
            delimiter = '';
        }

        let parts = str.split(delimiter);

        if (limit && parts.length > limit) {
            const last = parts.splice(limit - 1).join(delimiter);
            parts.push(last);
        }
        return parts;
    });
}
