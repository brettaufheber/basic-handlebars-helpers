const utils = require('../lib/utils');
const path = require('path');

module.exports = {
    category: 'Path Operations',
    helpers: {
        'basename': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
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

                const head = args[0];
                const ext = args.length === 2 ? args[1] : undefined;

                return path.posix.basename(head, ext);
            })
        },
        'dirname': {
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

                return path.posix.dirname(head);
            })
        },
        'extname': {
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

                return path.posix.extname(head);
            })
        },
        'is-absolute-path': {
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

                return path.posix.isAbsolute(head);
            })
        },
        'normalize-path': {
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

                return path.posix.normalize(head);
            })
        },
        'relative-path': {
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

                const from = path.posix.resolve('/', args[0]);
                const to = path.posix.resolve('/', args[1]);

                return path.posix.normalize(path.posix.relative(from, to));
            })
        },
        'resolve-path': {
            parameters: {
                regular: null,
                spread: {
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
            parameters: {
                regular: null,
                spread: {
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
