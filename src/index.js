const utils = require('./lib/utils');
const kindOf = require('kind-of');
const hbs = require('handlebars');

function getBasicHelperDefinitions() {

    return [
        require('./helpers/essentialOperationHelpers'),
        require('./helpers/iterableOperationHelpers'),
        require('./helpers/numberOperationHelpers'),
        require('./helpers/pathOperationHelpers'),
        require('./helpers/setOperationHelpers'),
        require('./helpers/stringOperationHelpers'),
        require('./helpers/urlOperationHelpers')
    ];
}

function register() {

    registerHelpers(Object.assign({}, ...getBasicHelperDefinitions().map((category) => category.helpers)));
}

function registerHelpers(helpers) {

    Object.entries(helpers).forEach(([name, properties]) => {

        registerHelper(name, properties);
    });
}

function registerHelper(name, definition) {

    hbs.registerHelper(name, function () {

        const args = [];
        const hash = {};
        const options = arguments[arguments.length - 1];

        // copy hash object
        if ('hash' in options)
            Object.entries(options.hash).reverse().forEach(([key, value]) => hash[key] = value);

        // extract arguments
        for (let i = 0; i < arguments.length - 1; i++)
            args.push(arguments[i]);

        // validate arguments and hash entries
        checkArgumentRange(name, definition.parameters, args);
        checkArgumentTypes(name, definition.parameters, args);
        checkHashTypes(name, definition.parameters, hash);

        // call helper method
        return definition.method(args, hash, options);
    });
}

function checkArgumentRange(name, parameters, args) {

    const hasRegular = 'regular' in parameters && parameters.regular != null;
    const hasSpread = 'spread' in parameters && parameters.spread != null;
    const hasSpreadMinimum = hasSpread && 'minimum' in parameters.spread && parameters.spread.minimum != null;

    let maxArgs = 0;
    let minArgs = 0;

    if (hasSpread)
        maxArgs = Infinity;
    else if (hasRegular)
        maxArgs = parameters.regular.length;

    if (hasSpread)
        minArgs += hasSpreadMinimum ? parameters.spread.minimum : 0;

    if (hasRegular)
        minArgs += parameters.regular.reduce((acc, x) => (x.optional ? 0 : 1) + acc, 0);

    if (args.length > maxArgs)
        throw new TypeError(`The helper ${name} requires at most ${maxArgs} arguments`);

    if (args.length < minArgs)
        throw new TypeError(`The helper ${name} requires at least ${minArgs} arguments`);
}

function checkArgumentTypes(name, parameters, args) {

    const hasRegular = 'regular' in parameters && parameters.regular != null;
    const hasSpread = 'spread' in parameters && parameters.spread != null;
    const hasSpreadMinimum = hasSpread && 'minimum' in parameters.spread && parameters.spread.minimum != null;

    let index = 0;

    if (hasRegular) {

        parameters.regular.forEach((entry) => {

            if (index < args.length) {

                if (!utils.anyMatch(entry.types, (type) => hasCorrectType(args[index], type))) {

                    if (!entry.optional)
                        throw new TypeError(`The helper ${name} requires a correct type ` +
                            `(given: ${kindOf(args[index])}) ` +
                            `(expected: ${entry.types.join(', ')}) ` +
                            `for argument at position ${index + 1}`);

                } else
                    index++;

            } else {

                if (!entry.optional)
                    throw new TypeError(`The helper ${name} is called with a missing argument ` +
                        `(expected: ${entry.types.join(', ')})`);
            }
        });
    }

    if (hasSpread) {

        if (hasSpreadMinimum && index + parameters.spread.minimum > args.length)
            throw new TypeError(`The helper ${name} is called with a missing argument ` +
                `(expected: ${parameters.spread.types.join(', ')})`);

        if (index < args.length) {

            if ('allSameType' in parameters.spread && parameters.spread.allSameType) {

                if (!utils.anyMatch(parameters.spread.types, (type) =>
                    utils.allMatch(args.slice(index), (arg) => hasCorrectType(arg, type))))
                    throw new TypeError(`The helper ${name} requires the same correct type ` +
                        `(expected: ${parameters.spread.types.join(', ')}) ` +
                        `for all spread arguments at position ${index + 1}...${args.length}`);

            } else {

                if (!utils.allMatch(args.slice(index), (arg) =>
                    utils.anyMatch(parameters.spread.types, (type) => hasCorrectType(arg, type))))
                    throw new TypeError(`The helper ${name} requires correct type ` +
                        `(expected: ${parameters.spread.types.join(', ')}) ` +
                        `for spread arguments at position ${index + 1}...${args.length}`);
            }
        }

    } else {

        if (index < args.length)
            throw new TypeError(`The helper ${name} is called with an unexpected argument ` +
                `(given: ${kindOf(args[index])}) ` +
                `at position ${index + 1}`);
    }
}

function checkHashTypes(name, parameters, hash) {

    const hasHash = 'hash' in parameters && parameters.hash != null;

    if (hasHash) {

        Object.entries(parameters.hash).forEach(([key, value]) => {

            if (key in hash) {

                if (!utils.anyMatch(value.types, (type) => hasCorrectType(hash[key], type)))
                    throw new TypeError(`The helper ${name} requires a correct type ` +
                        `(given: ${kindOf(hash[key])}) ` +
                        `(expected: ${value.types.join(', ')}) ` +
                        `for hash entry ${key}`);

            } else {

                hash[key] = value.default;
            }
        });
    }
}

function hasCorrectType(value, type) {

    return type === kindOf(value) || type === 'any' || type.startsWith('implicit-');
}

module.exports = {
    getBasicHelperDefinitions,
    register,
    registerHelpers,
    registerHelper,
};
