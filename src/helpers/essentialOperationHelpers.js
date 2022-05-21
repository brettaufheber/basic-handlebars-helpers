const utils = require('../lib/utils');
const kindOf = require('kind-of');
const {JSONPath} = require('jsonpath-plus');
const yaml = require('js-yaml');

module.exports = {
    category: 'Essential Operations',
    helpers: {
        'equals': {
            parameters: {
                regular: null,
                spread: {
                    types: ['any'],
                    minimum: 2
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

                if (deep)
                    return utils.distinct(args.map((x) => JSON.stringify(x))).length === 1;

                return utils.distinct(args).length === 1;
            })
        },
        'not-equals': {
            parameters: {
                regular: null,
                spread: {
                    types: ['any'],
                    minimum: 2
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

                if (deep)
                    return utils.distinct(args.map((x) => JSON.stringify(x))).length === args.length;

                return utils.distinct(args).length === args.length;
            })
        },
        'and': {
            parameters: {
                regular: null,
                spread: {
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
            parameters: {
                regular: null,
                spread: {
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
            parameters: {
                regular: null,
                spread: {
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
            parameters: {
                regular: null,
                spread: {
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
            parameters: {
                regular: [
                    {
                        types: ['implicit-boolean'],
                        optional: false
                    },
                    {
                        types: ['any'],
                        optional: false
                    },
                    {
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
            parameters: {
                regular: [
                    {
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
            parameters: {
                regular: [
                    {
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
            parameters: {
                regular: [
                    {
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
            parameters: {
                regular: [
                    {
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
            parameters: {
                regular: [
                    {
                        types: ['any'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'indent': {
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
            parameters: {
                regular: [
                    {
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
            parameters: {
                regular: [
                    {
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
            parameters: {
                regular: [
                    {
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'multiple': {
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
            parameters: {
                regular: null,
                spread: {
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
            parameters: {
                regular: [
                    {
                        types: ['number'],
                        optional: false
                    },
                    {
                        types: ['number'],
                        optional: true
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
            parameters: {
                regular: null,
                spread: {
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
            parameters: {
                regular: [
                    {
                        types: ['array', 'object'],
                        optional: false
                    }
                ],
                spread: {
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
            parameters: {
                regular: [
                    {
                        types: ['array', 'object'],
                        optional: false
                    },
                    {
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
