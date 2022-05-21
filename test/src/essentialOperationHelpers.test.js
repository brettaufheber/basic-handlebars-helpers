const {helpers} = require('../../index');
const hbs = require("handlebars");

helpers.register();

test('test Handlebars helper "equals"', async () => {

    const options = {
        text1: 'foo',
        text2: 'foo',
        text3: 'bar',
        sub1: {
            a: 'foo',
            b: 'bar'
        },
        sub2: {
            a: 'foo',
            b: 'bar'
        },
        sub3: {
            a: 'foo',
            b: ['bar']
        }
    };

    expect(() => hbs.compile('{{#if (equals)}}TRUE{{else}}FALSE{{/if}}')(options)).toThrow(TypeError);
    expect(() => hbs.compile('{{#if (equals text1)}}TRUE{{else}}FALSE{{/if}}')(options)).toThrow(TypeError);

    expect(hbs.compile('{{#if (equals text1 text2)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('TRUE');
    expect(hbs.compile('{{#if (equals text1 text3)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('FALSE');
    expect(hbs.compile('{{#if (equals text1 "foo")}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('TRUE');
    expect(hbs.compile('{{#if (equals text1 "baz")}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('FALSE');
    expect(hbs.compile('{{#if (equals text1 text2 "foo")}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('TRUE');
    expect(hbs.compile('{{#if (equals text1 text2 text3)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('FALSE');
    expect(hbs.compile('{{#if (equals sub1 sub1 deep=true)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('TRUE');
    expect(hbs.compile('{{#if (equals sub1 sub2 deep=true)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('TRUE');
    expect(hbs.compile('{{#if (equals sub1 sub3 deep=true)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('FALSE');
    expect(hbs.compile('{{#if (equals sub1 sub1)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('TRUE');
    expect(hbs.compile('{{#if (equals sub1 sub2)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('FALSE');
    expect(hbs.compile('{{#if (equals sub1 sub3)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('FALSE');
});

test('test Handlebars helper "not-equals"', async () => {

    const options = {
        text1: 'foo',
        text2: 'foo',
        text3: 'bar',
        sub1: {
            a: 'foo',
            b: 'bar'
        },
        sub2: {
            a: 'foo',
            b: 'bar'
        },
        sub3: {
            a: 'foo',
            b: ['bar']
        }
    };

    expect(() => hbs.compile('{{#if (not-equals)}}TRUE{{else}}FALSE{{/if}}')(options)).toThrow(TypeError);
    expect(() => hbs.compile('{{#if (not-equals text1)}}TRUE{{else}}FALSE{{/if}}')(options)).toThrow(TypeError);

    expect(hbs.compile('{{#if (not-equals text1 text2)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('FALSE');
    expect(hbs.compile('{{#if (not-equals text1 text3)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('TRUE');
    expect(hbs.compile('{{#if (not-equals text1 "foo")}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('FALSE');
    expect(hbs.compile('{{#if (not-equals text1 "baz")}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('TRUE');
    expect(hbs.compile('{{#if (not-equals text1 text2 text3)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('FALSE');
    expect(hbs.compile('{{#if (not-equals text1 text3 "baz")}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('TRUE');
    expect(hbs.compile('{{#if (not-equals sub1 sub1 deep=true)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('FALSE');
    expect(hbs.compile('{{#if (not-equals sub1 sub2 deep=true)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('FALSE');
    expect(hbs.compile('{{#if (not-equals sub1 sub3 deep=true)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('TRUE');
    expect(hbs.compile('{{#if (not-equals sub1 sub1)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('FALSE');
    expect(hbs.compile('{{#if (not-equals sub1 sub2)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('TRUE');
    expect(hbs.compile('{{#if (not-equals sub1 sub3)}}TRUE{{else}}FALSE{{/if}}')(options)).toBe('TRUE');
});

test('test Handlebars helper "and"', async () => {

    expect(hbs.compile('{{#if (and)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
    expect(hbs.compile('{{#if (and true)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
    expect(hbs.compile('{{#if (and false)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
    expect(hbs.compile('{{#if (and true true)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
    expect(hbs.compile('{{#if (and true false)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
    expect(hbs.compile('{{#if (and false true)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
    expect(hbs.compile('{{#if (and false false)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
});

test('test Handlebars helper "or"', async () => {

    expect(hbs.compile('{{#if (or)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
    expect(hbs.compile('{{#if (or true)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
    expect(hbs.compile('{{#if (or false)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
    expect(hbs.compile('{{#if (or true true)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
    expect(hbs.compile('{{#if (or true false)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
    expect(hbs.compile('{{#if (or false true)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
    expect(hbs.compile('{{#if (or false false)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
});

test('test Handlebars helper "not"', async () => {

    expect(hbs.compile('{{#if (not)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
    expect(hbs.compile('{{#if (not true)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
    expect(hbs.compile('{{#if (not false)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
    expect(hbs.compile('{{#if (not true true)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
    expect(hbs.compile('{{#if (not true false)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
    expect(hbs.compile('{{#if (not false true)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
    expect(hbs.compile('{{#if (not false false)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
});

test('test Handlebars helper "xor"', async () => {

    expect(hbs.compile('{{#if (xor)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
    expect(hbs.compile('{{#if (xor true)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
    expect(hbs.compile('{{#if (xor false)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
    expect(hbs.compile('{{#if (xor true true)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
    expect(hbs.compile('{{#if (xor true false)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
    expect(hbs.compile('{{#if (xor false true)}}TRUE{{else}}FALSE{{/if}}')()).toBe('TRUE');
    expect(hbs.compile('{{#if (xor false false)}}TRUE{{else}}FALSE{{/if}}')()).toBe('FALSE');
});

test('test Handlebars helper "iif"', async () => {

    const options = {
        text1: 'foo',
        text2: 'foo',
        text3: 'bar',
        object1: {},
        array1: [],
        object2: {
            test: 'example'
        },
        array2: [42],
        number1: 0,
        number2: 1,
        number3: -1,
        value: null
    };

    expect(() => hbs.compile('{{iif}}')(options)).toThrow(TypeError);
    expect(() => hbs.compile('{{iif null}}')(options)).toThrow(TypeError);
    expect(() => hbs.compile('{{iif null null}}')(options)).toThrow(TypeError);
    expect(() => hbs.compile('{{iif null null null null}}')(options)).toThrow(TypeError);

    expect(hbs.compile('{{#iif null text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if null}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif non-exist text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if non-exist}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif array1 text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if array1}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif 0 text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if 0}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif number1 text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if number1}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif value text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if value}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif false text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if false}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif "" text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if ""}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif (not-equals text1 text2) text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if (not-equals text1 text2)}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif object1 text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if object1}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif object2 text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if object2}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif array2 text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if array2}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif 1 text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if 1}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif -1 text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if -1}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif number2 text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if number2}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif number3 text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if number3}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif true text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if true}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif "non-empty" text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if "non-empty"}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
    expect(hbs.compile('{{#iif (equals text1 text2) text1 text3}}{{.}}{{/iif}}')(options))
        .toBe(hbs.compile('{{#if (equals text1 text2)}}{{text1}}{{else}}{{text3}}{{/if}}')(options));
});

test('test Handlebars helper "type-of"', async () => {

    expect(() => hbs.compile('{{type-of}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{type-of null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of true}}')()).toBe('boolean');
    expect(hbs.compile('{{type-of false}}')()).toBe('boolean');
    expect(hbs.compile('{{type-of 0}}')()).toBe('number');
    expect(hbs.compile('{{type-of 1}}')()).toBe('number');
    expect(hbs.compile('{{type-of "text"}}')()).toBe('string');
    expect(hbs.compile('{{type-of \'text\'}}')()).toBe('string');
    expect(hbs.compile('{{type-of (array 1 2 3)}}')()).toBe('array');
    expect(hbs.compile('{{type-of (object a=1 b=2)}}')()).toBe('object');
});

test('test Handlebars helper "to-boolean"', async () => {

    expect(() => hbs.compile('{{to-boolean}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{to-boolean null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (to-boolean null)}}')()).toBe('boolean');
    expect(hbs.compile('{{type-of (to-boolean false)}}')()).toBe('boolean');
    expect(hbs.compile('{{type-of (to-boolean true)}}')()).toBe('boolean');
    expect(hbs.compile('{{type-of (to-boolean 0)}}')()).toBe('boolean');
    expect(hbs.compile('{{type-of (to-boolean 1)}}')()).toBe('boolean');
    expect(hbs.compile('{{type-of (to-boolean "")}}')()).toBe('boolean');
    expect(hbs.compile('{{type-of (to-boolean "text")}}')()).toBe('boolean');
    expect(hbs.compile('{{type-of (to-boolean (array))}}')()).toBe('boolean');
    expect(hbs.compile('{{type-of (to-boolean (array 1 2 3))}}')()).toBe('boolean');
    expect(hbs.compile('{{type-of (to-boolean (object))}}')()).toBe('boolean');
    expect(hbs.compile('{{type-of (to-boolean (object a=1 b=2))}}')()).toBe('boolean');

    expect(hbs.compile('{{to-boolean null}}')()).toBe('false');
    expect(hbs.compile('{{to-boolean false}}')()).toBe('false');
    expect(hbs.compile('{{to-boolean true}}')()).toBe('true');
    expect(hbs.compile('{{to-boolean 0}}')()).toBe('false');
    expect(hbs.compile('{{to-boolean 1}}')()).toBe('true');
    expect(hbs.compile('{{to-boolean ""}}')()).toBe('false');
    expect(hbs.compile('{{to-boolean "text"}}')()).toBe('true');
    expect(hbs.compile('{{to-boolean (array)}}')()).toBe('false');
    expect(hbs.compile('{{to-boolean (array 1 2 3)}}')()).toBe('true');
    expect(hbs.compile('{{to-boolean (object)}}')()).toBe('true');
    expect(hbs.compile('{{to-boolean (object a=1 b=2)}}')()).toBe('true');
});

test('test Handlebars helper "to-number"', async () => {

    expect(() => hbs.compile('{{to-number}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{to-number null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (to-number null)}}')()).toBe('number');
    expect(hbs.compile('{{type-of (to-number false)}}')()).toBe('number');
    expect(hbs.compile('{{type-of (to-number true)}}')()).toBe('number');
    expect(hbs.compile('{{type-of (to-number 0)}}')()).toBe('number');
    expect(hbs.compile('{{type-of (to-number 1)}}')()).toBe('number');
    expect(hbs.compile('{{type-of (to-number "")}}')()).toBe('number');
    expect(hbs.compile('{{type-of (to-number "text")}}')()).toBe('number');
    expect(hbs.compile('{{type-of (to-number (array))}}')()).toBe('number');
    expect(hbs.compile('{{type-of (to-number (array 1 2 3))}}')()).toBe('number');
    expect(hbs.compile('{{type-of (to-number (object))}}')()).toBe('number');
    expect(hbs.compile('{{type-of (to-number (object a=1 b=2))}}')()).toBe('number');

    expect(hbs.compile('{{to-number null}}')()).toBe('0');
    expect(hbs.compile('{{to-number false}}')()).toBe('0');
    expect(hbs.compile('{{to-number true}}')()).toBe('1');
    expect(hbs.compile('{{to-number 0}}')()).toBe('0');
    expect(hbs.compile('{{to-number 1}}')()).toBe('1');
    expect(hbs.compile('{{to-number ""}}')()).toBe('0');
    expect(hbs.compile('{{to-number "text"}}')()).toBe('NaN');
    expect(hbs.compile('{{to-number (array)}}')()).toBe('0');
    expect(hbs.compile('{{to-number (array 1 2 3)}}')()).toBe('NaN');
    expect(hbs.compile('{{to-number (object)}}')()).toBe('NaN');
    expect(hbs.compile('{{to-number (object a=1 b=2)}}')()).toBe('NaN');
});

test('test Handlebars helper "to-string"', async () => {

    expect(() => hbs.compile('{{to-string}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{to-string null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (to-string null)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-string false)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-string true)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-string 0)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-string 1)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-string "")}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-string "text")}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-string (array))}}')()).toBe('undefined');
    expect(hbs.compile('{{type-of (to-string (array 1 2 3))}}')()).toBe('undefined');
    expect(hbs.compile('{{type-of (to-string (object))}}')()).toBe('undefined');
    expect(hbs.compile('{{type-of (to-string (object a=1 b=2))}}')()).toBe('undefined');

    expect(hbs.compile('{{to-string null}}')()).toBe('null');
    expect(hbs.compile('{{to-string false}}')()).toBe('false');
    expect(hbs.compile('{{to-string true}}')()).toBe('true');
    expect(hbs.compile('{{to-string 0}}')()).toBe('0');
    expect(hbs.compile('{{to-string 1}}')()).toBe('1');
    expect(hbs.compile('{{to-string ""}}')()).toBe('');
    expect(hbs.compile('{{to-string "text"}}')()).toBe('text');
    expect(hbs.compile('{{to-string (array)}}')()).toBe('');
    expect(hbs.compile('{{to-string (array 1 2 3)}}')()).toBe('');
    expect(hbs.compile('{{to-string (object)}}')()).toBe('');
    expect(hbs.compile('{{to-string (object a=1 b=2)}}')()).toBe('');
});

test('test Handlebars helper "to-json"', async () => {

    const options = {
        text: 'foo',
        number: 42,
        array: [42, 73]
    };

    expect(() => hbs.compile('{{to-json}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{to-json null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (to-json null)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-json false)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-json true)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-json 0)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-json 1)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-json "")}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-json "text")}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-json (array))}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-json (array 1 2 3))}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-json (object))}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-json (object a=1 b=2))}}')()).toBe('string');

    expect(hbs.compile('{{{to-json null}}}')()).toBe('null');
    expect(hbs.compile('{{{to-json false}}}')()).toBe('false');
    expect(hbs.compile('{{{to-json true}}}')()).toBe('true');
    expect(hbs.compile('{{{to-json 0}}}')()).toBe('0');
    expect(hbs.compile('{{{to-json 1}}}')()).toBe('1');
    expect(hbs.compile('{{{to-json ""}}}')()).toBe('""');
    expect(hbs.compile('{{{to-json "text"}}}')()).toBe('"text"');
    expect(hbs.compile('{{{to-json (array)}}}')()).toBe('[]');
    expect(hbs.compile('{{{to-json (array 1 2 3)}}}')()).toBe('[1,2,3]');
    expect(hbs.compile('{{{to-json (object)}}}')()).toBe('{}');
    expect(hbs.compile('{{{to-json (object a=1 b=2)}}}')()).toBe('{"a":1,"b":2}');

    expect(hbs.compile('{{{to-json @root}}}')(options)).toBe('{"text":"foo","number":42,"array":[42,73]}');
});

test('test Handlebars helper "from-json"', async () => {

    const options = {
        text: 'foo',
        number: 42,
        array: [42, 73]
    };

    expect(() => hbs.compile('{{from-json}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{from-json null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{equals (from-json (to-json @root)) @root deep=true}}')(options)).toBe('true');
});

test('test Handlebars helper "to-yaml"', async () => {

    const options = {
        text: 'foo',
        number: 42,
        array: [42, 73]
    };

    expect(() => hbs.compile('{{to-yaml}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{to-yaml null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (to-yaml null)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-yaml false)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-yaml true)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-yaml 0)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-yaml 1)}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-yaml "")}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-yaml "text")}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-yaml (array))}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-yaml (array 1 2 3))}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-yaml (object))}}')()).toBe('string');
    expect(hbs.compile('{{type-of (to-yaml (object a=1 b=2))}}')()).toBe('string');

    expect(hbs.compile('{{{to-yaml null}}}')()).toBe('null\n');
    expect(hbs.compile('{{{to-yaml false}}}')()).toBe('false\n');
    expect(hbs.compile('{{{to-yaml true}}}')()).toBe('true\n');
    expect(hbs.compile('{{{to-yaml 0}}}')()).toBe('0\n');
    expect(hbs.compile('{{{to-yaml 1}}}')()).toBe('1\n');
    expect(hbs.compile('{{{to-yaml ""}}}')()).toBe('\'\'\n');
    expect(hbs.compile('{{{to-yaml "text"}}}')()).toBe('text\n');
    expect(hbs.compile('{{{to-yaml (array)}}}')()).toBe('[]\n');
    expect(hbs.compile('{{{to-yaml (array 1 2 3)}}}')()).toBe('- 1\n- 2\n- 3\n');
    expect(hbs.compile('{{{to-yaml (object)}}}')()).toBe('{}\n');
    expect(hbs.compile('{{{to-yaml (object a=1 b=2)}}}')()).toBe('a: 1\nb: 2\n');

    expect(hbs.compile('{{{to-yaml @root}}}')(options)).toBe('text: foo\nnumber: 42\narray:\n  - 42\n  - 73\n');
});

test('test Handlebars helper "from-yaml"', async () => {

    const options = {
        text: 'foo',
        number: 42,
        array: [42, 73]
    };

    expect(() => hbs.compile('{{from-yaml}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{from-yaml null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{equals (from-yaml (to-yaml @root)) @root deep=true}}')(options)).toBe('true');
});

test('test Handlebars helper "array"', async () => {

    expect(hbs.compile('{{type-of (array)}}')()).toBe('array');
    expect(hbs.compile('{{type-of (array 1 2 3 4 5)}}')()).toBe('array');

    expect(hbs.compile('{{#with (array) as | numbers |}}{{#each numbers}}{{.}}{{/each}}{{/with}}')()).toBe('');
    expect(hbs.compile('{{#with (array 1 2 3 4 5) as | x |}}{{#each x}}{{.}}{{/each}}{{/with}}')()).toBe('12345');
});

test('test Handlebars helper "object"', async () => {

    expect(() => hbs.compile('{{object null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (object)}}')()).toBe('object');
    expect(hbs.compile('{{type-of (object x=0 a=1 b=2)}}')()).toBe('object');

    expect(hbs.compile('{{#each (object)}}{{@key}}-{{.}};{{/each}}')()).toBe('');
    expect(hbs.compile('{{#each (object x=0 a=1 b=2)}}{{@key}}-{{.}};{{/each}}')()).toBe('x-0;a-1;b-2;');
});

test('test Handlebars helper "range"', async () => {

    expect(() => hbs.compile('{{range}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{range null null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{#each (range 4)}}{{.}};{{/each}}')()).toBe('1;2;3;4;');
    expect(hbs.compile('{{#each (range 0 4)}}{{.}};{{/each}}')()).toBe('0;1;2;3;4;');
    expect(hbs.compile('{{#each (range 2 7)}}{{.}};{{/each}}')()).toBe('2;3;4;5;6;7;');
    expect(hbs.compile('{{#each (range 7 2)}}{{.}};{{/each}}')()).toBe('');
    expect(hbs.compile('{{#each (range 2 14 3)}}{{.}};{{/each}}')()).toBe('2;5;8;11;14;');
});

test('test Handlebars helper "get-root"', async () => {

    const options = {
        baz: 'text',
        foo: {
            bar: ["string", {sub: 73}, 42]
        }
    };

    expect(hbs.compile('{{get-root "baz"}}')(options)).toBe('text');
    expect(hbs.compile('{{get-root "foo" "bar" 1 "sub"}}')(options)).toBe('73');
    expect(hbs.compile('{{get-root "xxx" "xxx" "xxx"}}')(options)).toBe('');
    expect(hbs.compile('{{type-of (get-root "xxx" "xxx" "xxx")}}')(options)).toBe('undefined');
});

test('test Handlebars helper "get"', async () => {

    const options = {
        baz: 'text',
        foo: {
            bar: ["string", {sub: 73}, 42],
            bla: "blubb"
        }
    };

    expect(() => hbs.compile('{{get}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (get foo)}}')(options)).toBe('object');
    expect(hbs.compile('{{get foo "bla"}}')(options)).toBe('blubb');
    expect(hbs.compile('{{get foo "bar" 1 "sub"}}')(options)).toBe('73');
    expect(hbs.compile('{{get foo "xxx" "xxx" "xxx"}}')(options)).toBe('');
    expect(hbs.compile('{{type-of (get foo "xxx" "xxx" "xxx")}}')(options)).toBe('undefined');

    expect(() => hbs.compile('{{get baz}}')(options)).toThrow(TypeError);
});

test('test Handlebars helper "jsonpath"', async () => {

    const options = {
        foo: {
            bar: {
                baz: ["string", {sub: 73}, 42],
            },
            bla: ["blubb", 73]
        },
        array: [1, 2, 3],
        a: [
            {
                b01: {
                    c: 1,
                    d: "A"
                },
                b02: {
                    c: 2,
                    d: "A"
                }
            },
            {
                b02: {
                    c: 3,
                    d: "A"
                }
            },
            {
                b03: {
                    c: 4,
                    d: "B"
                }
            }
        ]
    };

    expect(() => hbs.compile('{{jsonpath}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{jsonpath null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{jsonpath null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{jsonpath foo "$.bar.baz[1].sub"}}}')(options)).toBe('73');

    expect(hbs.compile('{{{jsonpath array "$[1]"}}}')(options)).toBe('2');

    expect(hbs.compile('{{type-of (jsonpath a "$[*].*.c")}}')(options)).toBe('array');
    expect(hbs.compile('{{{to-json (jsonpath a "$[*].*.c")}}}')(options)).toBe('[1,2,3,4]');
});
