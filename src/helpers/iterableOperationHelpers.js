const utils = require('../lib/utils');
const kindOf = require('kind-of');

module.exports = {
    category: 'Iterable Operations',
    description: 'Helpers for iterable types such as strings, arrays and objects.',
    helpers: {
        'length': {
            description: 'Gets the length of an iterable value.',
            parameters: {
                regular: [
                    {
                        description: 'The given iterable value.',
                        types: ['string', 'array', 'object'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const iterable = utils.toIterable(head);

                return iterable.length;
            })
        },
        'empty': {
            description: 'Checks whether an iterable value is empty.',
            parameters: {
                regular: [
                    {
                        description: 'The given iterable value.',
                        types: ['string', 'array', 'object'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const iterable = utils.toIterable(head);

                return iterable.length === 0;
            })
        },
        'in': {
            description: 'Checks whether all of the given elements are included in an iterable value.',
            parameters: {
                regular: [
                    {
                        description: 'The given iterable value.',
                        types: ['string', 'array', 'object'],
                        optional: false
                    }
                ],
                spread: {
                    description: 'The values to test.',
                    types: ['any'],
                    minimum: 1
                },
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const tail = args.slice(1);

                if (kindOf(head) === 'string' || kindOf(head) === 'array')
                    return utils.allMatch(tail, (x) => head.includes(x));

                if (kindOf(head) === 'object')
                    return utils.allMatch(tail, (x) => x in head);
            })
        },
        'any-in': {
            description: 'Checks whether any of the given elements is included in an iterable value.',
            parameters: {
                regular: [
                    {
                        description: 'The given iterable value.',
                        types: ['string', 'array', 'object'],
                        optional: false
                    }
                ],
                spread: {
                    description: 'The values to test.',
                    types: ['any'],
                    minimum: 1
                },
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const tail = args.slice(1);

                if (kindOf(head) === 'string' || kindOf(head) === 'array')
                    return utils.anyMatch(tail, (x) => head.includes(x));

                if (kindOf(head) === 'object')
                    return utils.anyMatch(tail, (x) => x in head);
            })
        },
        'chunk': {
            description: 'Gets chunks of an iterable value with variable length.',
            parameters: {
                regular: [
                    {
                        description: 'The given iterable value.',
                        types: ['string', 'array', 'object'],
                        optional: false
                    },
                    {
                        description: 'The size of the chunks.',
                        types: ['number'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const iterable = utils.toIterable(head);
                const size = args[1];
                const chunks = [];

                for (let i = 0; i < iterable.length; i += size)
                    chunks.push(iterable.slice(i, i + size));

                if (kindOf(head) === 'string')
                    return chunks.map((x) => x.join(''));

                if (kindOf(head) === 'object')
                    return chunks.map((x) => Object.fromEntries(x));

                return chunks;
            })
        },
        'slice': {
            description: 'Gets a contiguous subsequence of an iterable value.',
            parameters: {
                regular: [
                    {
                        description: 'The given iterable value.',
                        types: ['string', 'array', 'object'],
                        optional: false
                    },
                    {
                        description: 'The inclusive index at which the slice begins.',
                        types: ['number'],
                        optional: false
                    },
                    {
                        description: 'The exclusive index at which the slice ends.',
                        types: ['number'],
                        optional: true
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const iterable = utils.toIterable(head);
                const start = args[1];
                const end = args.length === 3 ? args[2] : iterable.length;

                const sliced = iterable.slice(start, end);

                if (kindOf(head) === 'string')
                    return sliced.join('');

                if (kindOf(head) === 'object')
                    return Object.fromEntries(sliced);

                return sliced;
            })
        },
        'reverse': {
            description: 'Gets the elements of an iterable value in reverse order.',
            parameters: {
                regular: [
                    {
                        description: 'The given iterable value.',
                        types: ['string', 'array', 'object'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const iterable = utils.toIterable(head);

                const reversed = iterable.reverse();

                if (kindOf(head) === 'string')
                    return reversed.join('');

                if (kindOf(head) === 'object')
                    return Object.fromEntries(reversed);

                return reversed;
            })
        },
        'shuffle': {
            description: 'Shuffles the elements of an iterable value in random order.',
            parameters: {
                regular: [
                    {
                        description: 'The given iterable value.',
                        types: ['string', 'array', 'object'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const iterable = utils.toIterable(head);

                const shuffled = utils.shuffle(iterable);

                if (kindOf(head) === 'string')
                    return shuffled.join('');

                if (kindOf(head) === 'object')
                    return Object.fromEntries(shuffled);

                return shuffled;
            })
        },
        'sort': {
            description: 'Sorts the elements of an iterable value.',
            parameters: {
                regular: [
                    {
                        description: 'The given iterable value.',
                        types: ['string', 'array', 'object'],
                        optional: false
                    }
                ],
                spread: {
                    description: 'The keys or indices used to find the values to compare.',
                    types: ['any'],
                    minimum: 0
                },
                hash: {
                    'descending': {
                        description: 'This flag switches from ascending to descending order.',
                        types: ['implicit-boolean'],
                        default: false
                    },
                    'ignorecase': {
                        description: 'This flag allows ignore-case comparison.',
                        types: ['implicit-boolean'],
                        default: false
                    }
                }
            },
            method: ((args, hash) => {

                const head = args[0];
                const iterable = utils.toIterable(head);
                const keys = args.slice(1);
                const descending = utils.toBoolean(hash.descending);
                const ignorecase = utils.toBoolean(hash.ignorecase);

                if (kindOf(head) === 'object')
                    for (let i = 0; i < iterable.length; i++)
                        iterable[i] = {key: iterable[i][0], value: iterable[i][1]};

                if (kindOf(head) === 'object' && keys.length === 0)
                    keys.push('key');

                const compare = function (a, b) {

                    let left = utils.find(a, keys);
                    let right = utils.find(b, keys);

                    if (descending)
                        [left, right] = [right, left];

                    if (kindOf(left) === 'string' && ignorecase)
                        left = left.toLowerCase();

                    if (kindOf(right) === 'string' && ignorecase)
                        right = right.toLowerCase();

                    if (kindOf(left) === 'undefined')
                        left = null;

                    if (kindOf(right) === 'undefined')
                        right = null;

                    if (kindOf(left) === 'number' && kindOf(right) === 'number')
                        return left - right;

                    if (left < right)
                        return -1;

                    if (left > right)
                        return 1;

                    return 0;
                };

                const sorted = iterable.sort(compare);

                if (kindOf(head) === 'string')
                    return sorted.join('');

                if (kindOf(head) === 'object')
                    return Object.fromEntries(sorted.map(x => [x.key, x.value]));

                return sorted;
            })
        },
        'first': {
            description: 'Gets the first element of an iterable value.',
            parameters: {
                regular: [
                    {
                        description: 'The given iterable value.',
                        types: ['string', 'array', 'object'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const iterable = utils.toIterable(head);
                const element = iterable[0];

                if (kindOf(head) === 'object' && kindOf(element) !== 'undefined')
                    return element[1];

                return element;
            })
        },
        'last': {
            description: 'Gets the last element of an iterable value.',
            parameters: {
                regular: [
                    {
                        description: 'The given iterable value.',
                        types: ['string', 'array', 'object'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const iterable = utils.toIterable(head);
                const element = iterable[iterable.length - 1];

                if (kindOf(head) === 'object' && kindOf(element) !== 'undefined')
                    return element[1];

                return element;
            })
        },
        'at': {
            description: 'Gets an element at a specific index of an iterable value.',
            parameters: {
                regular: [
                    {
                        description: 'The given iterable value.',
                        types: ['string', 'array', 'object'],
                        optional: false
                    },
                    {
                        description: 'The index of the value to get.',
                        types: ['any'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const iterable = utils.toIterable(head);
                const index = args[1];
                const element = iterable[index];

                if (kindOf(head) === 'object' && kindOf(element) !== 'undefined')
                    return element[1];

                return element;
            })
        },
        'concat': {
            description: 'Concatenates two or more strings or arrays.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The strings or arrays to concatenate.',
                    types: ['string', 'array'],
                    minimum: 2,
                    allSameType: true,
                },
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const tail = args.slice(1);

                return head.concat(...tail);
            })
        },
        'flatten': {
            description: 'Flattens an array with variable depth.',
            parameters: {
                regular: [
                    {
                        description: 'The given array.',
                        types: ['array'],
                        optional: false
                    },
                    {
                        description: 'The depth to flatten. Zero means infinite depth. The default value is 1.',
                        types: ['number'],
                        optional: true
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const depth = args.length === 2 ? args[1] : 1;

                if (depth === 0)
                    return head.flat(Infinity);

                return head.flat(depth);
            })
        },
        'keys': {
            description: 'Gets the keys of an object.',
            parameters: {
                regular: [
                    {
                        description: 'The given object.',
                        types: ['object'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return Object.keys(head);
            })
        },
        'values': {
            description: 'Gets the values of an object.',
            parameters: {
                regular: [
                    {
                        description: 'The given object.',
                        types: ['object'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return Object.values(head);
            })
        }
    }
};
