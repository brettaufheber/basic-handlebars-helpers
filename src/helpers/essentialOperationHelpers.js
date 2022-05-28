const utils = require('../lib/utils');
const kindOf = require('kind-of');
const {JSONPath} = require('jsonpath-plus');
const yaml = require('js-yaml');

module.exports = {
    category: 'Essential Operations',
    description: 'Helpers that make the Handlebars template engine usable.',
    helpers: {
        'equals': {
            description: 'Checks whether the arguments are equal.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The values to compare.',
                    types: ['any'],
                    minimum: 2
                },
                hash: {
                    'deep': {
                        description: 'This flag allows comparing data structures recursively.',
                        types: ['implicit-boolean'],
                        default: false
                    }
                }
            },
            method: ((args, hash) => {

                const deep = utils.toBoolean(hash.deep);

                if (deep)
                    return utils.distinct(args.map((x) => JSON.stringify(x))).length === 1;

                return utils.distinct(args).length === 1;
            })
        },
        'not-equals': {
            description: 'Checks whether the arguments are not equal.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The values to compare.',
                    types: ['any'],
                    minimum: 2
                },
                hash: {
                    'deep': {
                        description: 'This flag allows comparing data structures recursively.',
                        types: ['implicit-boolean'],
                        default: false
                    }
                }
            },
            method: ((args, hash) => {

                const deep = utils.toBoolean(hash.deep);

                if (deep)
                    return utils.distinct(args.map((x) => JSON.stringify(x))).length === args.length;

                return utils.distinct(args).length === args.length;
            })
        },
        'and': {
            description: 'Applies the logical conjunction to multiple values.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The values on which the AND operation is applied.',
                    types: ['implicit-boolean'],
                    minimum: 0
                },
                hash: null
            },
            method: ((args) => {

                return utils.allMatch(args, (x) => utils.toBoolean(x));
            })
        },
        'or': {
            description: 'Applies the logical disjunction to multiple values.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The values on which the OR operation is applied.',
                    types: ['implicit-boolean'],
                    minimum: 0
                },
                hash: null
            },
            method: ((args) => {

                return utils.anyMatch(args, (x) => utils.toBoolean(x));
            })
        },
        'not': {
            description: 'Applies the logical negation to multiple values.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The values on which the NOT operation is applied.',
                    types: ['implicit-boolean'],
                    minimum: 0
                },
                hash: null
            },
            method: ((args) => {

                return utils.noneMatch(args, (x) => utils.toBoolean(x));
            })
        },
        'xor': {
            description: 'Applies the logical exclusive disjunction to multiple values.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The values on which the XOR operation is applied.',
                    types: ['implicit-boolean'],
                    minimum: 0
                },
                hash: null
            },
            method: ((args) => {

                return utils.oneMatch(args, (x) => utils.toBoolean(x));
            })
        },
        'iif': {
            description: 'Applies if-then-else in one method (known as inline if or ternary if).',
            parameters: {
                regular: [
                    {
                        description: 'The condition.',
                        types: ['implicit-boolean'],
                        optional: false
                    },
                    {
                        description: 'The value used if condition is true.',
                        types: ['any'],
                        optional: false
                    },
                    {
                        description: 'The value used if condition is false.',
                        types: ['any'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const condition = args[0];
                const value1 = args[1];
                const value2 = args[2];

                return utils.toBoolean(condition) ? value1 : value2;
            })
        },
        'type-of': {
            description: 'Gets the type of a value.',
            parameters: {
                regular: [
                    {
                        description: 'The value for which the type is to be determined.',
                        types: ['any'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return kindOf(head);
            })
        },
        'to-boolean': {
            description: 'Converts a value to a boolean type.',
            parameters: {
                regular: [
                    {
                        description: 'The value to be converted to boolean.',
                        types: ['any'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return utils.toBoolean(head);
            })
        },
        'to-number': {
            description: 'Converts a value to a number type.',
            parameters: {
                regular: [
                    {
                        description: 'The value to be converted to number.',
                        types: ['any'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                if (kindOf(head) === 'number')
                    return head;

                return Number(head);
            })
        },
        'to-string': {
            description: 'Converts a value to a string type.',
            parameters: {
                regular: [
                    {
                        description: 'The value to be converted to string.',
                        types: ['any'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                if (kindOf(head) === 'string')
                    return head;

                if (kindOf(head) === 'null' || kindOf(head) === 'boolean' || kindOf(head) === 'number')
                    return String(head);
            })
        },
        'to-json': {
            description: 'Converts a value to a JSON string.',
            parameters: {
                regular: [
                    {
                        description: 'The value to be converted to a JSON string.',
                        types: ['any'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'indent': {
                        description: 'The depth to indent. Zero means no indentation.',
                        types: ['number'],
                        default: 0
                    }
                }
            },
            method: ((args, hash) => {

                const head = args[0];
                const indent = hash.indent;

                return JSON.stringify(head, null, indent);
            })
        },
        'from-json': {
            description: 'Parses a JSON string.',
            parameters: {
                regular: [
                    {
                        description: 'The value to be parsed.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return JSON.parse(head);
            })
        },
        'to-yaml': {
            description: 'Converts a value to a YAML string.',
            parameters: {
                regular: [
                    {
                        description: 'The value to be converted to a YAML string.',
                        types: ['any'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args, _, options) => {

                const head = args[0];

                return yaml.dump(head, options.hash);
            })
        },
        'from-yaml': {
            description: 'Parses a YAML string.',
            parameters: {
                regular: [
                    {
                        description: 'The value to be parsed.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'multiple': {
                        description: 'This flag allows parsing of multi-document sources.',
                        types: ['implicit-boolean'],
                        default: false
                    }
                }
            },
            method: ((args, hash) => {

                const head = args[0];
                const multiple = utils.toBoolean(hash.multiple);

                if (multiple)
                    return yaml.loadAll(head, {json: true}).slice();

                return yaml.load(head, {json: true});
            })
        },
        'array': {
            description: 'Creates an array from arguments.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The elements of the new array.',
                    types: ['any'],
                    minimum: 0
                },
                hash: null
            },
            method: ((args) => {

                return args;
            })
        },
        'object': {
            description: 'Creates an object from hash arguments.',
            parameters: {
                regular: null,
                spread: null,
                hash: null
            },
            method: ((_, hash) => {

                return hash;
            })
        },
        'range': {
            description: 'Creates a range of numbers as an array.',
            parameters: {
                regular: [
                    {
                        description: 'The inclusive number at which the range is started.',
                        types: ['number'],
                        optional: false
                    },
                    {
                        description: 'The inclusive number at which the range is stopped.',
                        types: ['number'],
                        optional: true
                    },
                    {
                        description: 'The increment step or decrement step if this number negative. The default is 1.',
                        types: ['number'],
                        optional: true
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const from = args.length >= 2 ? args[0] : 1;
                const to = args.length >= 2 ? args[1] : args[0];
                const step = args.length === 3 ? args[2] : 1;

                let array = [];

                for (let i = from; i <= to; i += step)
                    array.push(i);

                return array;
            })
        },
        'get-root': {
            description: 'Gets the a value from the root object by a sequence of keys and indices.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The keys or indices used to find a value in the data structure.',
                    types: ['any'],
                    minimum: 0
                },
                hash: null
            },
            method: ((args, _, options) => {

                return utils.find(options.data.root, args);
            })
        },
        'get': {
            description: 'Gets a value from a data structure by a sequence of keys and indices.',
            parameters: {
                regular: [
                    {
                        description: 'The data structure.',
                        types: ['array', 'object'],
                        optional: false
                    }
                ],
                spread: {
                    description: 'The keys or indices used to find a value in the data structure.',
                    types: ['any'],
                    minimum: 0
                },
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const keys = args.slice(1);

                return utils.find(head, keys);
            })
        },
        'jsonpath': {
            description: 'Gets a value from a data structure by a JSONPath expression.',
            parameters: {
                regular: [
                    {
                        description: 'The data structure.',
                        types: ['array', 'object'],
                        optional: false
                    },
                    {
                        description: 'The query.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const query = args[1];

                return JSONPath({json: head, path: query});
            })
        }
    }
};
