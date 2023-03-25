const filterName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addFilter(filterName, (value, decimal = 0, decimalSeparator = '.', thousandSeparator = ',') => {
        if (isNaN(value)) {
            return value;
        }

        const parts = value.toFixed(decimal).toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

        return parts.join(decimalSeparator);
    });
}
