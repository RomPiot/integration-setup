const functionName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addGlobal(functionName, (...args) => {
        if (args.length > 1) {
            return Math.min(...args);
        }

        let [array] = args;

        if (typeof array === 'object') {
            array = Object.values(array);
        }

        return Math.min(...array);
    }
    )
    ;
}
