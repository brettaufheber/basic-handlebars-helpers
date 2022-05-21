const crypto = require('crypto');
const kindOf = require('kind-of');

function find(value, keys) {

    return keys.reduce((acc, key) => (acc || [])[key], value);
}

function shuffle(array) {

    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

    for (let i = 0; i < array.length - 1; i++) {

        const j = crypto.randomInt(i, array.length); // i ≤ j < n

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function distinct(array) {

    return array.filter((x, i, self) => self.indexOf(x) === i);
}

function allMatch(array, callback) {

    return array.reduce((acc, x) => callback(x) && acc, true);
}

function anyMatch(array, callback) {

    return array.reduce((acc, x) => callback(x) || acc, false);
}

function noneMatch(array, callback) {

    return array.reduce((acc, x) => !callback(x) && acc, true);
}

function oneMatch(array, callback) {

    return array.reduce((acc, x) => (callback(x) ? 1 : 0) + acc, 0) === 1;
}

function toBoolean(value) {

    if (typeof value === 'boolean')
        return value;

    if (Array.isArray(value) && value.length === 0)
        return false;

    return !!value;
}

function toIterable(value) {

    if (kindOf(value) === 'string')
        return [...value];

    if (kindOf(value) === 'array')
        return value.slice();

    if (kindOf(value) === 'object')
        return Object.entries(value);
}

function merge(objects, deep) {

    const mergePair = function (left, right) {

        const merged = Object.fromEntries(Object.keys(left)
            .filter((key) => {

                if (key in left && key in right)
                    if (kindOf(left[key]) === 'object' && kindOf(right[key]) === 'object')
                        return true;

                return false;
            })
            .map((key) => {

                return [key, merge(left[key], right[key])];
            })
        );

        return Object.assign({}, left, right, merged);
    };

    if (objects.length > 0 && deep)
        return objects.slice(1).reduce((acc, x) => mergePair(acc, x), objects[0]);

    return Object.assign({}, ...objects);
}

function getAuthority(url) {

    const urlObject = new URL(url);
    const start = urlObject.href.indexOf('://');
    let authority;

    urlObject.pathname = '';
    urlObject.search = '';
    urlObject.hash = '';

    if (start >= 0) {

        authority = urlObject.href.slice(start + 3);

        if (authority.endsWith('/'))
            authority = authority.slice(0, -1);

        if (urlObject.port !== '' && !authority.endsWith(':' + urlObject.port))
            authority += ':' + urlObject.port;
    }

    return authority || '';
}

module.exports = {
    find,
    shuffle,
    distinct,
    allMatch,
    anyMatch,
    noneMatch,
    oneMatch,
    toBoolean,
    toIterable,
    merge,
    getAuthority,
};
