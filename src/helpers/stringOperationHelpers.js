const utils = require('../lib/utils');
const {vsprintf} = require('sprintf-js');

module.exports = {
    category: 'String Operations',
    helpers: {
        'format': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
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

                const format = args[0];
                const tail = args.slice(1);

                return vsprintf(format, tail);
            })
        },
        'lowercase': {
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

                return head.toLowerCase();
            })
        },
        'uppercase': {
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

                return head.toUpperCase();
            })
        },
        'capitalize': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'global': {
                        types: ['implicit-boolean'],
                        default: false
                    }
                }
            },
            method: ((args, hash) => {

                const head = args[0];
                const global = utils.toBoolean(hash.global);

                if (!global)
                    return head.replace(/^\s*\w/u, (c) => c.toUpperCase());

                return head.replace(/\w\S*/ug, (w) => (w.replace(/^\w/u, (c) => c.toUpperCase())));
            })
        },
        'replace': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
                        optional: false
                    },
                    {
                        types: ['string'],
                        optional: false
                    },
                    {
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'global': {
                        types: ['implicit-boolean'],
                        default: false
                    },
                    'multiline': {
                        types: ['implicit-boolean'],
                        default: false
                    }
                }
            },
            method: ((args, hash) => {

                const head = args[0];
                const pattern = args[1];
                const replacement = args[2];
                const global = utils.toBoolean(hash.global);
                const multiline = utils.toBoolean(hash.multiline);
                const regex = new RegExp(pattern, 'u' + (global ? 'g' : '') + (multiline ? 'm' : 's'));

                return head.replace(regex, replacement);
            })
        },
        'match': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
                        optional: false
                    },
                    {
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'global': {
                        types: ['implicit-boolean'],
                        default: false
                    },
                    'multiline': {
                        types: ['implicit-boolean'],
                        default: false
                    }
                }
            },
            method: ((args, hash) => {

                const head = args[0];
                const pattern = args[1];
                const global = utils.toBoolean(hash.global);
                const multiline = utils.toBoolean(hash.multiline);
                const regex = new RegExp(pattern, 'u' + (global ? 'g' : '') + (multiline ? 'm' : 's'));

                if (!global)
                    return (regex.exec(head) || []).slice();

                const result = [];
                let match;

                while ((match = regex.exec(head)) !== null)
                    result.push(match.slice());

                return result;
            })
        },
        'matches': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
                        optional: false
                    },
                    {
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'multiline': {
                        types: ['implicit-boolean'],
                        default: false
                    }
                }
            },
            method: ((args, hash) => {

                const head = args[0];
                const pattern = args[1];
                const multiline = utils.toBoolean(hash.multiline);
                const regex = new RegExp(pattern, 'u' + (multiline ? 'm' : 's'));

                return regex.test(head);
            })
        },
        'blank': {
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

                return /^\s*$/u.test(head);
            })
        },
        'starts-with': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
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
                const arg = args[1];

                return head.startsWith(arg);
            })
        },
        'ends-with': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
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
                const arg = args[1];

                return head.endsWith(arg);
            })
        },
        'trim': {
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

                return head.trim();
            })
        },
        'trim-left': {
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

                return head.trimStart();
            })
        },
        'trim-right': {
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

                return head.trimEnd();
            })
        },
        'split': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
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
                const separator = args[1];

                if (separator === '')
                    return utils.toIterable(head);

                return head.split(separator);
            })
        },
        'join': {
            parameters: {
                regular: [
                    {
                        types: ['array'],
                        optional: false
                    },
                    {
                        types: ['string'],
                        optional: true
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const array = args[0];
                const separator = args.length === 2 ? args[1] : '';

                return array.join(separator);
            })
        }
    }
};
