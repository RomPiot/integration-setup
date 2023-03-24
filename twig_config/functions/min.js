export function min(env) {
    env.addGlobal('min', function (...args) {
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
