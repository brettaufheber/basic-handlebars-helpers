const utils = require('../lib/utils');
const kindOf = require('kind-of');

module.exports = {
    category: 'Set Operations',
    helpers: {
        'union': {
            parameters: {
                regular: null,
                spread: {
                    types: ['array', 'object'],
                    minimum: 1,
                    allSameType: true,
                },
                hash: {
                    'deep': {
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
            parameters: {
                regular: null,
                spread: {
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
            parameters: {
                regular: null,
                spread: {
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
            parameters: {
                regular: null,
                spread: {
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
