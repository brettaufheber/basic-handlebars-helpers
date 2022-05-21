const utils = require('../lib/utils');
const kindOf = require('kind-of');

module.exports = {
    category: 'URL Operations',
    helpers: {
        'parse-url': {
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
                const url = new URL(head);

                return {
                    href: url.href,
                    origin: url.origin,
                    protocol: url.protocol,
                    scheme: url.protocol.slice(0, -1),
                    authority: utils.getAuthority(head),
                    username: url.username,
                    password: url.password,
                    host: url.host,
                    hostname: url.hostname,
                    port: url.port,
                    pathname: url.pathname,
                    search: url.search,
                    query: url.search.slice(1),
                    hash: url.hash,
                    fragment: url.hash.slice(1),
                    params: Array.from(url.searchParams.entries()).map(([key, value]) => ({key: key, value: value}))
                };
            })
        },
        'with-auth': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
                        optional: false
                    },
                    {
                        types: ['string', 'null'],
                        optional: false
                    },
                    {
                        types: ['string', 'null'],
                        optional: true
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const username = args[1];
                const password = args.length === 3 ? args[2] : '';
                const url = new URL(head);

                url.username = username || '';
                url.password = username ? (password || '') : '';

                return url.href;
            })
        },
        'with-hostname': {
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
                const hostname = args[1];
                const url = new URL(head);

                url.hostname = hostname;

                return url.href;
            })
        },
        'with-port': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
                        optional: false
                    },
                    {
                        types: ['string', 'number', 'null'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const port = args[1];
                const url = new URL(head);

                url.port = port != null ? port : '';

                return url.href;
            })
        },
        'with-pathname': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
                        optional: false
                    },
                    {
                        types: ['string', 'null'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const pathname = args[1];
                const url = new URL(head);

                url.pathname = pathname || '';

                return url.href;
            })
        },
        'with-query': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
                        optional: false
                    },
                    {
                        types: ['string', 'array', 'object', 'null'],
                        optional: false
                    }
                ],
                spread: null,
                hash: {
                    'append': {
                        types: ['implicit-boolean'],
                        default: false
                    }
                }
            },
            method: ((args, hash) => {

                const head = args[0];
                const query = args[1];
                const append = utils.toBoolean(hash.append);
                const url = new URL(head);

                if (kindOf(query) === 'null')
                    url.search = '';
                else if (kindOf(query) === 'string') {

                    if (!append)
                        url.search = '?' + query;
                    else
                        Array.from((new URLSearchParams(query)).entries())
                            .forEach(([k, v]) => url.searchParams.append(k, v));

                } else if (kindOf(query) === 'array') {

                    if (!append)
                        url.search = '';

                    query.forEach((x) => url.searchParams.append(x.key, x.value));

                } else if (kindOf(query) === 'object') {

                    if (!append)
                        url.search = '';

                    Object.entries(query).forEach(([k, v]) => url.searchParams.append(k, v));
                }

                return url.href;
            })
        },
        'with-fragment': {
            parameters: {
                regular: [
                    {
                        types: ['string'],
                        optional: false
                    },
                    {
                        types: ['string', 'null'],
                        optional: false
                    }
                ],
                spread: null,
                hash: null
            },
            method: ((args) => {

                const head = args[0];
                const fragment = args[1];
                const url = new URL(head);

                if (kindOf(fragment) === 'null')
                    url.hash = '';
                else
                    url.hash = '#' + fragment;

                return url.href;
            })
        }
    }
};
