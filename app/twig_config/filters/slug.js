import slugify from "slugify";

const filterName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addFilter(filterName, (stringValue, separator) => {
        if (typeof separator === 'undefined') {
            separator = '-';
        }

        return slugify(stringValue, {
            lower: true,
            strict: true,
            remove: /[^\w\s]/g,
            replacement: separator,
        });
    });
}
