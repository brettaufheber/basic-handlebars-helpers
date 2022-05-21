const {helpers} = require('../../index');
const hbs = require("handlebars");

helpers.register();

test('test Handlebars helper "is-nan"', async () => {

    const options = {
        foo: 42,
        bar: 73.42,
        baz: NaN,
        bla1: Infinity,
        bla2: -Infinity
    };

    expect(() => hbs.compile('{{is-nan}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{is-nan null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{is-nan foo}}')(options)).toBe(isNaN(options.foo).toString());
    expect(hbs.compile('{{is-nan bar}}')(options)).toBe(isNaN(options.bar).toString());
    expect(hbs.compile('{{is-nan baz}}')(options)).toBe(isNaN(options.baz).toString());
    expect(hbs.compile('{{is-nan bla1}}')(options)).toBe(isNaN(options.bla1).toString());
    expect(hbs.compile('{{is-nan bla2}}')(options)).toBe(isNaN(options.bla2).toString());
});

test('test Handlebars helper "is-finite"', async () => {

    const options = {
        foo: 42,
        bar: 73.42,
        baz: NaN,
        bla1: Infinity,
        bla2: -Infinity
    };

    expect(() => hbs.compile('{{is-finite}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{is-finite null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{is-finite foo}}')(options)).toBe(isFinite(options.foo).toString());
    expect(hbs.compile('{{is-finite bar}}')(options)).toBe(isFinite(options.bar).toString());
    expect(hbs.compile('{{is-finite baz}}')(options)).toBe(isFinite(options.baz).toString());
    expect(hbs.compile('{{is-finite bla1}}')(options)).toBe(isFinite(options.bla1).toString());
    expect(hbs.compile('{{is-finite bla2}}')(options)).toBe(isFinite(options.bla2).toString());
});

test('test Handlebars helper "lt"', async () => {

    expect(() => hbs.compile('{{lt}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{lt null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{lt 42 73 99}}')()).toBe('true');
    expect(hbs.compile('{{lt 42 99 73}}')()).toBe('false');
    expect(hbs.compile('{{lt 73 42 99}}')()).toBe('false');

    expect(hbs.compile('{{lt 42 42}}')()).toBe('false');
});

test('test Handlebars helper "lte"', async () => {

    expect(() => hbs.compile('{{lte}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{lte null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{lte 42 73 99}}')()).toBe('true');
    expect(hbs.compile('{{lte 42 99 73}}')()).toBe('false');
    expect(hbs.compile('{{lte 73 42 99}}')()).toBe('false');

    expect(hbs.compile('{{lte 42 42}}')()).toBe('true');
});

test('test Handlebars helper "gt"', async () => {

    expect(() => hbs.compile('{{gt}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{gt null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{gt 99 73 42}}')()).toBe('true');
    expect(hbs.compile('{{gt 99 42 73}}')()).toBe('false');
    expect(hbs.compile('{{gt 42 73 99}}')()).toBe('false');

    expect(hbs.compile('{{gt 42 42}}')()).toBe('false');
});

test('test Handlebars helper "gte"', async () => {

    expect(() => hbs.compile('{{gte}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{gte null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{gte 99 73 42}}')()).toBe('true');
    expect(hbs.compile('{{gte 99 42 73}}')()).toBe('false');
    expect(hbs.compile('{{gte 42 73 99}}')()).toBe('false');

    expect(hbs.compile('{{gte 42 42}}')()).toBe('true');
});

test('test Handlebars helper "even"', async () => {

    expect(() => hbs.compile('{{even}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{even null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{even 42}}')()).toBe('true');
    expect(hbs.compile('{{even 73}}')()).toBe('false');
});

test('test Handlebars helper "odd"', async () => {

    expect(() => hbs.compile('{{odd}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{odd null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{odd 42}}')()).toBe('false');
    expect(hbs.compile('{{odd 73}}')()).toBe('true');
});

test('test Handlebars helper "nth"', async () => {

    expect(() => hbs.compile('{{nth}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{nth null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{nth null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{nth 0 3}}')()).toBe('true');
    expect(hbs.compile('{{nth 1 3}}')()).toBe('false');
    expect(hbs.compile('{{nth 2 3}}')()).toBe('false');
    expect(hbs.compile('{{nth 3 3}}')()).toBe('true');
    expect(hbs.compile('{{nth 4 3}}')()).toBe('false');
    expect(hbs.compile('{{nth 5 3}}')()).toBe('false');
    expect(hbs.compile('{{nth 6 3}}')()).toBe('true');
    expect(hbs.compile('{{nth 7 3}}')()).toBe('false');
});

test('test Handlebars helper "round"', async () => {

    expect(() => hbs.compile('{{round}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{round null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{round 1.537}}')()).toBe('2');
    expect(hbs.compile('{{round 1.537 0}}')()).toBe('2');
    expect(hbs.compile('{{round 1.537 1}}')()).toBe('1.5');
    expect(hbs.compile('{{round 1.537 2}}')()).toBe('1.54');
    expect(hbs.compile('{{round 1.537 3}}')()).toBe('1.537');

    expect(hbs.compile('{{round 1.437}}')()).toBe('1');
    expect(hbs.compile('{{round 1.437 0}}')()).toBe('1');
    expect(hbs.compile('{{round 1.437 1}}')()).toBe('1.4');
    expect(hbs.compile('{{round 1.437 2}}')()).toBe('1.44');
    expect(hbs.compile('{{round 1.437 3}}')()).toBe('1.437');
});

test('test Handlebars helper "floor"', async () => {

    expect(() => hbs.compile('{{floor}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{floor null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{floor 1.537}}')()).toBe('1');
    expect(hbs.compile('{{floor 1.537 0}}')()).toBe('1');
    expect(hbs.compile('{{floor 1.537 1}}')()).toBe('1.5');
    expect(hbs.compile('{{floor 1.537 2}}')()).toBe('1.53');
    expect(hbs.compile('{{floor 1.537 3}}')()).toBe('1.537');

    expect(hbs.compile('{{floor 1.437}}')()).toBe('1');
    expect(hbs.compile('{{floor 1.437 0}}')()).toBe('1');
    expect(hbs.compile('{{floor 1.437 1}}')()).toBe('1.4');
    expect(hbs.compile('{{floor 1.437 2}}')()).toBe('1.43');
    expect(hbs.compile('{{floor 1.437 3}}')()).toBe('1.437');
});

test('test Handlebars helper "ceil"', async () => {

    expect(() => hbs.compile('{{ceil}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{ceil null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{ceil 1.537}}')()).toBe('2');
    expect(hbs.compile('{{ceil 1.537 0}}')()).toBe('2');
    expect(hbs.compile('{{ceil 1.537 1}}')()).toBe('1.6');
    expect(hbs.compile('{{ceil 1.537 2}}')()).toBe('1.54');
    expect(hbs.compile('{{ceil 1.537 3}}')()).toBe('1.537');

    expect(hbs.compile('{{ceil 1.437}}')()).toBe('2');
    expect(hbs.compile('{{ceil 1.437 0}}')()).toBe('2');
    expect(hbs.compile('{{ceil 1.437 1}}')()).toBe('1.5');
    expect(hbs.compile('{{ceil 1.437 2}}')()).toBe('1.44');
    expect(hbs.compile('{{ceil 1.437 3}}')()).toBe('1.437');
});

test('test Handlebars helper "inc"', async () => {

    expect(() => hbs.compile('{{inc}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{inc null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{inc 31}}')()).toBe('32');
    expect(hbs.compile('{{inc 31 0}}')()).toBe('31');
    expect(hbs.compile('{{inc 31 1}}')()).toBe('32');
    expect(hbs.compile('{{inc 31 2}}')()).toBe('33');
});

test('test Handlebars helper "dec"', async () => {

    expect(() => hbs.compile('{{dec}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{dec null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{dec 31}}')()).toBe('30');
    expect(hbs.compile('{{dec 31 0}}')()).toBe('31');
    expect(hbs.compile('{{dec 31 1}}')()).toBe('30');
    expect(hbs.compile('{{dec 31 2}}')()).toBe('29');
});

test('test Handlebars helper "abs"', async () => {

    expect(() => hbs.compile('{{abs}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{abs null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{abs 0}}')()).toBe('0');
    expect(hbs.compile('{{abs 42}}')()).toBe('42');
    expect(hbs.compile('{{abs -42}}')()).toBe('42');
});

test('test Handlebars helper "neg"', async () => {

    expect(() => hbs.compile('{{neg}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{neg null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{neg 0}}')()).toBe('0');
    expect(hbs.compile('{{neg 42}}')()).toBe('-42');
    expect(hbs.compile('{{neg -42}}')()).toBe('42');
});
