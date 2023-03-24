export function max(env) {
    env.addGlobal('max', function (...args) {
            if (args.length > 1) {
                return Math.max(...args);
            }

            let [array] = args;

            if (typeof array === 'object') {
                array = Object.values(array);
            }

            return Math.max(...array);
        }
    )
    ;
}
