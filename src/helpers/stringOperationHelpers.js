const utils = require('../lib/utils');
const asciidoc = require('../asciidoc');
const {vsprintf} = require('sprintf-js');

module.exports = {
    category: 'String Operations',
    description: 'Helpers for working with strings.',
    helpers: {
        'asciidoc': {
            description: 'Converts AsciiDoc to HTML.',
            parameters: {
                regular: [
                    {
                        description: 'A string with AsciiDoc content.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'inline': {
                        description: 'This flag switches the doctype between article and inline.',
                        types: ['implicit-boolean'],
                        default: false
                    }
                }
            },
            method: ((args, hash) => {

                const content = args[0];
                const inline = utils.toBoolean(hash.inline);

                return asciidoc.convert(content, inline);
            })
        },
        'format': {
            description: 'Formats a string in the way of the sprintf method.',
            parameters: {
                regular: [
                    {
                        description: 'The format string.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: {
                    description: 'The arguments for the format string.',
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
            description: 'Gets the lowercase string.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
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
            description: 'Gets the uppercase string.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
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
            description: 'Gets the capitalized string.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'global': {
                        description: 'This flag allows to capitalize all words.',
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
            description: 'Replaces some parts of a string by a regular expression.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
                        types: ['string'],
                        optional: false
                    },
                    {
                        description: 'The pattern.',
                        types: ['string'],
                        optional: false
                    },
                    {
                        description: 'The replacement.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'global': {
                        description: 'This flag allows replacing with any occurrence instead of just the first match.',
                        types: ['implicit-boolean'],
                        default: false
                    },
                    'multiline': {
                        description: 'This flag allows matching every line as a separate input.',
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
            description: 'Extracts parts of a string by a regular expression.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
                        types: ['string'],
                        optional: false
                    },
                    {
                        description: 'The pattern.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'global': {
                        description: 'This flag allows extracting all occurrences instead of just the first match.',
                        types: ['implicit-boolean'],
                        default: false
                    },
                    'multiline': {
                        description: 'This flag allows matching every line as a separate input.',
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
            description: 'Checks whether a string matches a regular expression.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
                        types: ['string'],
                        optional: false
                    },
                    {
                        description: 'The pattern.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'multiline': {
                        description: 'This flag allows matching every line as a separate input.',
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
            description: 'Checks whether a string is empty or contains only spaces.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
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
            description: 'Checks whether a string starts with another string.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
                        types: ['string'],
                        optional: false
                    },
                    {
                        description: 'The search string.',
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
            description: 'Checks whether a string ends with another string.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
                        types: ['string'],
                        optional: false
                    },
                    {
                        description: 'The search string.',
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
            description: 'Gets a string without leading or trailing spaces.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
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
            description: 'Gets a string without leading spaces.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
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
            description: 'Gets a string without trailing spaces.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
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
            description: 'Splits a string into an array by a separator.',
            parameters: {
                regular: [
                    {
                        description: 'The given string.',
                        types: ['string'],
                        optional: false
                    },
                    {
                        description: 'The separator.',
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
            description: 'Joins an array of strings together to one string by a separator.',
            parameters: {
                regular: [
                    {
                        description: 'The given array of strings.',
                        types: ['array'],
                        optional: false
                    },
                    {
                        description: 'The separator. The default value is an empty string.',
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
