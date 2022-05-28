const utils = require('../lib/utils');
const path = require('path');

module.exports = {
    category: 'Path Operations',
    description: 'Helpers for working with path strings.',
    helpers: {
        'basename': {
            description: 'Gets the last part of a given path.',
            parameters: {
                regular: [
                    {
                        description: 'The given path.',
                        types: ['string'],
                        optional: false
                    },
                    {
                        description: 'An optional file extension.',
                        types: ['string'],
                        optional: true
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const ext = args.length === 2 ? args[1] : undefined;

                return path.posix.basename(head, ext);
            })
        },
        'dirname': {
            description: 'Gets the directory name of a given path.',
            parameters: {
                regular: [
                    {
                        description: 'The given path.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return path.posix.dirname(head);
            })
        },
        'extname': {
            description: 'Gets the file extension of the given path.',
            parameters: {
                regular: [
                    {
                        description: 'The given path.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return path.posix.extname(head);
            })
        },
        'is-absolute-path': {
            description: 'Checks whether the given path is absolute.',
            parameters: {
                regular: [
                    {
                        description: 'The given path.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return path.posix.isAbsolute(head);
            })
        },
        'normalize-path': {
            description: 'Normalizes a given path.',
            parameters: {
                regular: [
                    {
                        description: 'The given path.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];

                return path.posix.normalize(head);
            })
        },
        'relative-path': {
            description: 'Gets a relative path.',
            parameters: {
                regular: [
                    {
                        description: 'A path to relativize from this path to another path.',
                        types: ['string'],
                        optional: false
                    },
                    {
                        description: 'A path to relativize from the other path to this path.',
                        types: ['string'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const from = path.posix.resolve('/', args[0]);
                const to = path.posix.resolve('/', args[1]);

                return path.posix.normalize(path.posix.relative(from, to));
            })
        },
        'resolve-path': {
            description: 'Gets a resolved path from multiple paths.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The given paths to resolve.',
                    types: ['string'],
                    minimum: 1
                },
                hash: null
            },
            method: ((args) => {

                let padding = '/null'.repeat(args.reduce((acc, x) =>
                    path.posix.normalize(x).split('/').filter((y) => y === '..').length + acc, 1));

                if (utils.noneMatch(args, (x) => path.posix.isAbsolute(x)))
                    return path.posix.normalize(path.posix.relative(padding, path.posix.resolve(padding, ...args)));
                else
                    return path.posix.normalize(path.posix.resolve(...args));
            })
        },
        'join-path': {
            description: 'Joins all given paths together.',
            parameters: {
                regular: null,
                spread: {
                    description: 'The given paths to join.',
                    types: ['string'],
                    minimum: 1
                },
                hash: null
            },
            method: ((args) => {

                return path.posix.normalize(path.posix.join(...args));
            })
        }
    }
};
