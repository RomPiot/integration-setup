export function random(env) {
    env.addGlobal('random', function (...args) {
            if (arguments.length === 1) {
                const arg = arguments[0];
                if (Array.isArray(arg)) {
                    // an array
                    return arg[Math.floor(Math.random() * arg.length)];
                } else if (typeof arg === 'string') {
                    // a string
                    return arg.charAt(Math.floor(Math.random() * arg.length));
                } else {
                    // a number
                    return Math.floor(Math.random() * arg);
                }
            } else if (arguments.length === 2) {
                // a range
                const min = arguments[0];
                const max = arguments[1];
                return Math.floor(Math.random() * (max - min + 1)) + min;
            } else {
                // no arguments
                return Math.random();
            }

        }
    )
    ;
}
