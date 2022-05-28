const utils = require('../lib/utils');
const kindOf = require('kind-of');

module.exports = {
    category: 'Set Operations',
    description: 'Helpers to apply set operations to arrays and objects.',
    helpers: {
        'union': {
            description: 'Creates the union of multiple arrays or objects',
            parameters: {
                regular: null,
                spread: {
                    description: 'The given arrays or objects.',
                    types: ['array', 'object'],
                    minimum: 1,
                    allSameType: true,
                },
                hash: {
                    'deep': {
                        description: 'This flag allows merging data structures recursively.',
                        types: ['implicit-boolean'],
                        default: false
                    }
                }
            },
            method: ((args, hash) => {

                const deep = utils.toBoolean(hash.deep);

                if (utils.allMatch(args, (x) => kindOf(x) === 'array'))
                    return utils.distinct(deep ? args.flat(Infinity) : args.flat());

                if (utils.allMatch(args, (x) => kindOf(x) === 'object'))
                    return utils.merge(args, deep);
            })
        },
        'intersection': {
            description: 'Creates the intersection of multiple arrays or objects',
            parameters: {
                regular: null,
                spread: {
                    description: 'The given arrays or objects.',
                    types: ['array', 'object'],
                    minimum: 1,
                    allSameType: true,
                },
                hash: null
            },
            method: ((args) => {

                if (utils.allMatch(args, (x) => kindOf(x) === 'array'))
                    return utils.distinct(args.flat())
                        .filter((value) => utils.allMatch(args, (x) => x.includes(value)));

                if (utils.allMatch(args, (x) => kindOf(x) === 'object'))
                    return Object.fromEntries(Object.entries(utils.merge(args, false))
                        .filter(([key]) => utils.allMatch(args, (x) => key in x))
                    );
            })
        },
        'sym-difference': {
            description: 'Creates the symmetric difference of multiple arrays or objects',
            parameters: {
                regular: null,
                spread: {
                    description: 'The given arrays or objects.',
                    types: ['array', 'object'],
                    minimum: 1,
                    allSameType: true,
                },
                hash: null
            },
            method: ((args) => {

                if (utils.allMatch(args, (x) => kindOf(x) === 'array'))
                    return utils.distinct(args.flat())
                        .filter((value) => utils.oneMatch(args, (x) => x.includes(value)));

                if (utils.allMatch(args, (x) => kindOf(x) === 'object'))
                    return Object.fromEntries(Object.entries(utils.merge(args, false))
                        .filter(([key]) => utils.oneMatch(args, (x) => key in x))
                    );
            })
        },
        'difference': {
            description: 'Creates the difference by applying the first one to all further arrays or objects',
            parameters: {
                regular: null,
                spread: {
                    description: 'The given arrays or objects.',
                    types: ['array', 'object'],
                    minimum: 2,
                    allSameType: true,
                },
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const tail = args.slice(1);

                if (utils.allMatch(args, (x) => kindOf(x) === 'array'))
                    return utils.distinct(head)
                        .filter((value) => utils.noneMatch(tail, (x) => x.includes(value)));

                if (utils.allMatch(args, (x) => kindOf(x) === 'object'))
                    return Object.fromEntries(Object.entries(head)
                        .filter(([key]) => utils.noneMatch(tail, (x) => key in x))
                    );
            })
        }
    }
};
