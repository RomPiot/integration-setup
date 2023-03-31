const functionName = import.meta.url.split('/').pop().replace('.js', '');

export default function (env) {
    env.addGlobal(functionName, (...args) => {
        if (args.length === 1) {
            const arg = args[0];
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
        } else if (args.length === 2) {
            // a range
            const min = args[0];
            const max = args[1];
            return Math.floor(Math.random() * (max - min + 1)) + min;
        } else {
            // no arguments
            return Math.random();
        }

    }
    )
    ;
}
