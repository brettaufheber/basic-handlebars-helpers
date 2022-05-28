module.exports = {
    category: 'Number Operations',
    description: 'Helpers for working with numbers.',
    helpers: {
        'is-nan': {
            description: 'Checks whether a number is NaN.',
            parameters: {
                regular: [
                    {
                        description: 'The given number.',
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
            description: 'Checks whether a number is finite.',
            parameters: {
                regular: [
                    {
                        description: 'The given number.',
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
            description: 'Checks strictly increasing order of multiple numbers.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The given numbers to compare.',
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
            description: 'Checks increasing order of multiple numbers.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The given numbers to compare.',
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
            description: 'Checks strictly decreasing order of multiple numbers.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The given numbers to compare.',
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
            description: 'Checks decreasing order of multiple numbers.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The given numbers to compare.',
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
            description: 'Checks for even numbers.',
            parameters: {
                regular: [
                    {
                        description: 'The given number.',
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
            description: 'Checks for odd numbers.',
            parameters: {
                regular: [
                    {
                        description: 'The given number.',
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
            description: 'Checks for multiples of a number.',
            parameters: {
                regular: [
                    {
                        description: 'The given number to check.',
                        types: ['number'],
                        optional: false
                    },
                    {
                        description: 'The factor.',
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
            description: 'Rounds a number to the nearest digit value at a specific decimal position.',
            parameters: {
                regular: [
                    {
                        description: 'The given number.',
                        types: ['number'],
                        optional: false
                    },
                    {
                        description: 'The number of digits after the floating point to round. The default is zero.',
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
            description: 'Rounds a number down at a specific decimal position.',
            parameters: {
                regular: [
                    {
                        description: 'The given number.',
                        types: ['number'],
                        optional: false
                    },
                    {
                        description: 'The number of digits after the floating point to round. The default is zero.',
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
            description: 'Rounds a number up at a specific decimal position.',
            parameters: {
                regular: [
                    {
                        description: 'The given number.',
                        types: ['number'],
                        optional: false
                    },
                    {
                        description: 'The number of digits after the floating point to round. The default is zero.',
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
            description: 'Increases a number.',
            parameters: {
                regular: [
                    {
                        description: 'The given number.',
                        types: ['number'],
                        optional: false
                    },
                    {
                        description: 'The increment step. The default value is 1.',
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
            description: 'Decreases a number.',
            parameters: {
                regular: [
                    {
                        description: 'The given number.',
                        types: ['number'],
                        optional: false
                    },
                    {
                        description: 'The decrement step. The default value is 1.',
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
            description: 'Gets the absolute value of a number.',
            parameters: {
                regular: [
                    {
                        description: 'The given number.',
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
            description: 'Gets the negated value of a number.',
            parameters: {
                regular: [
                    {
                        description: 'The given number.',
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
