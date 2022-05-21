module.exports = {
    category: 'Number Operations',
    helpers: {
        'is-nan': {
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return isNaN(head);
            })
        },
        'is-finite': {
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return isFinite(head);
            })
        },
        'lt': {
            parameters: {
                regular: null,
                spread: {
                    types: ['number'],
                    minimum: 2
                },
                hash: null
            },
            method: ((args) => {

                return args.slice(1).every((x, i) => args[i] < x);
            })
        },
        'lte': {
            parameters: {
                regular: null,
                spread: {
                    types: ['number'],
                    minimum: 2
                },
                hash: null
            },
            method: ((args) => {

                return args.slice(1).every((x, i) => args[i] <= x);
            })
        },
        'gt': {
            parameters: {
                regular: null,
                spread: {
                    types: ['number'],
                    minimum: 2
                },
                hash: null
            },
            method: ((args) => {

                return args.slice(1).every((x, i) => args[i] > x);
            })
        },
        'gte': {
            parameters: {
                regular: null,
                spread: {
                    types: ['number'],
                    minimum: 2
                },
                hash: null
            },
            method: ((args) => {

                return args.slice(1).every((x, i) => args[i] >= x);
            })
        },
        'even': {
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return head % 2 === 0;
            })
        },
        'odd': {
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return head % 2 !== 0;
            })
        },
        'nth': {
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    },
                    {
                        types: ['number'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const dividend = args[0];
                const divisor = args[1];

                return dividend % divisor === 0;
            })
        },
        'round': {
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    },
                    {
                        types: ['number'],
                        optional: true
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const position = args.length === 2 ? args[1] : 0;
                const factor = Math.pow(10, position);

                return Math.round(head * factor) / factor;
            })
        },
        'floor': {
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    },
                    {
                        types: ['number'],
                        optional: true
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const position = args.length === 2 ? args[1] : 0;
                const factor = Math.pow(10, position);

                return Math.floor(head * factor) / factor;
            })
        },
        'ceil': {
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    },
                    {
                        types: ['number'],
                        optional: true
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const position = args.length === 2 ? args[1] : 0;
                const factor = Math.pow(10, position);

                return Math.ceil(head * factor) / factor;
            })
        },
        'inc': {
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    },
                    {
                        types: ['number'],
                        optional: true
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const step = args.length === 2 ? args[1] : 1;

                return head + step;
            })
        },
        'dec': {
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    },
                    {
                        types: ['number'],
                        optional: true
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const step = args.length === 2 ? args[1] : 1;

                return head - step;
            })
        },
        'abs': {
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return Math.abs(head);
            })
        },
        'neg': {
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return -head;
            })
        }
    }
};
