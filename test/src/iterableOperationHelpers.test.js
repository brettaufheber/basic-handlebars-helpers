const {helpers} = require('../../index');
const hbs = require("handlebars");

helpers.register();

test('test Handlebars helper "length"', async () => {

    const options = {
        baz: 'text',
        foo: {
            bar: ['string', 73, 42],
            bla: 'blubb'
        }
    };

    expect(() => hbs.compile('{{length}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{length null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (length baz)}}')(options)).toBe('number');
    expect(hbs.compile('{{length baz}}')(options)).toBe(hbs.compile('{{baz.length}}')(options));

    expect(hbs.compile('{{type-of (length foo.bar)}}')(options)).toBe('number');
    expect(hbs.compile('{{length foo.bar}}')(options)).toBe(hbs.compile('{{foo.bar.length}}')(options));

    expect(hbs.compile('{{type-of (length foo)}}')(options)).toBe('number');
    expect(hbs.compile('{{length foo }}')(options)).toBe('2');
});

test('test Handlebars helper "empty"', async () => {

    const options = {
        a: {
            foo: '',
            bar: [],
            baz: {}
        },
        b: {
            foo: 'bla',
            bar: ['bla', 73, 42],
            baz: {key: 'bla'}
        }
    };

    expect(() => hbs.compile('{{empty}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{empty null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (empty a.foo)}}')(options)).toBe('boolean');
    expect(hbs.compile('{{empty a.foo}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (empty a.bar)}}')(options)).toBe('boolean');
    expect(hbs.compile('{{empty a.bar}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (empty a.baz)}}')(options)).toBe('boolean');
    expect(hbs.compile('{{empty a.baz}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (empty b.foo)}}')(options)).toBe('boolean');
    expect(hbs.compile('{{empty b.foo}}')(options)).toBe('false');

    expect(hbs.compile('{{type-of (empty b.bar)}}')(options)).toBe('boolean');
    expect(hbs.compile('{{empty b.bar}}')(options)).toBe('false');

    expect(hbs.compile('{{type-of (empty b.baz)}}')(options)).toBe('boolean');
    expect(hbs.compile('{{empty b.baz}}')(options)).toBe('false');
});

test('test Handlebars helper "in"', async () => {

    const options = {
        a: {
            foo: '',
            bar: [],
            baz: {}
        },
        b: {
            foo: 'has-bla-blubb',
            bar: ['bla', 'blubb', 73, 42],
            baz: {bla: 1, blubb: 2}
        }
    };

    expect(() => hbs.compile('{{in}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{in null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (in a.foo "bla")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{in a.foo "bla"}}')(options)).toBe('false');

    expect(hbs.compile('{{type-of (in a.bar "bla")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{in a.bar "bla"}}')(options)).toBe('false');

    expect(hbs.compile('{{type-of (in a.baz "bla")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{in a.baz "bla"}}')(options)).toBe('false');

    expect(hbs.compile('{{type-of (in b.foo "bla")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{in b.foo "bla"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (in b.foo "bla" "blubb")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{in b.foo "bla" "blubb"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (in b.foo "bla" "test")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{in b.foo "bla" "test"}}')(options)).toBe('false');

    expect(hbs.compile('{{type-of (in b.bar "bla")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{in b.bar "bla"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (in b.bar "bla" "blubb")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{in b.bar "bla" "blubb"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (in b.bar "bla" "test")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{in b.bar "bla" "test"}}')(options)).toBe('false');

    expect(hbs.compile('{{type-of (in b.baz "bla")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{in b.baz "bla"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (in b.baz "bla" "blubb")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{in b.baz "bla" "blubb"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (in b.baz "bla" "test")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{in b.baz "bla" "test"}}')(options)).toBe('false');
});

test('test Handlebars helper "any-in"', async () => {

    const options = {
        a: {
            foo: '',
            bar: [],
            baz: {}
        },
        b: {
            foo: 'contains-bla-',
            bar: ['bla', 73, 42],
            baz: {bla: 1, blubb: 2}
        }
    };

    expect(() => hbs.compile('{{any-in}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{any-in null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (any-in a.foo "bla")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in a.foo "bla"}}')(options)).toBe('false');

    expect(hbs.compile('{{type-of (any-in a.bar "bla")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in a.bar "bla"}}')(options)).toBe('false');

    expect(hbs.compile('{{type-of (any-in a.baz "bla")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in a.baz "bla"}}')(options)).toBe('false');

    expect(hbs.compile('{{type-of (any-in b.foo "bla")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in b.foo "bla"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (any-in b.foo "bla" "blubb")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in b.foo "bla" "blubb"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (any-in b.foo "bla" "test")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in b.foo "bla" "test"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (any-in b.foo "test")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in b.foo "test"}}')(options)).toBe('false');

    expect(hbs.compile('{{type-of (any-in b.bar "bla")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in b.bar "bla"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (any-in b.bar "bla" "blubb")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in b.bar "bla" "blubb"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (any-in b.bar "bla" "test")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in b.bar "bla" "test"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (any-in b.bar "test")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in b.bar "test"}}')(options)).toBe('false');

    expect(hbs.compile('{{type-of (any-in b.baz "bla")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in b.baz "bla"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (any-in b.baz "bla" "blubb")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in b.baz "bla" "blubb"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (any-in b.baz "bla" "test")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in b.baz "bla" "test"}}')(options)).toBe('true');
    expect(hbs.compile('{{type-of (any-in b.baz "test")}}')(options)).toBe('boolean');
    expect(hbs.compile('{{any-in b.baz "test"}}')(options)).toBe('false');
});

test('test Handlebars helper "chunk"', async () => {

    const options = {
        foo: '1234567890',
        bar: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        baz: {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 0}
    };

    expect(() => hbs.compile('{{chunk}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{chunk null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{chunk null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{to-json (chunk foo 2)}}}')(options)).toBe('["12","34","56","78","90"]');
    expect(hbs.compile('{{{to-json (chunk bar 2)}}}')(options)).toBe('[[1,2],[3,4],[5,6],[7,8],[9,0]]');
    expect(hbs.compile('{{{to-json (chunk baz 2)}}}')(options))
        .toBe('[{"a":1,"b":2},{"c":3,"d":4},{"e":5,"f":6},{"g":7,"h":8},{"i":9,"j":0}]');
});

test('test Handlebars helper "slice"', async () => {

    const options = {
        foo: '12345',
        bar: [1, 2, 3, 4, 5],
        baz: {a: 1, b: 2, c: 3, d: 4, e: 5}
    };

    expect(() => hbs.compile('{{slice}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{slice null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{slice null null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{to-json (slice foo -1)}}}')(options)).toBe('"5"');
    expect(hbs.compile('{{{to-json (slice foo 0)}}}')(options)).toBe('"12345"');
    expect(hbs.compile('{{{to-json (slice foo 1)}}}')(options)).toBe('"2345"');
    expect(hbs.compile('{{{to-json (slice foo 0 -1)}}}')(options)).toBe('"1234"');
    expect(hbs.compile('{{{to-json (slice foo 0 0)}}}')(options)).toBe('""');
    expect(hbs.compile('{{{to-json (slice foo 0 1)}}}')(options)).toBe('"1"');

    expect(hbs.compile('{{{to-json (slice bar -1)}}}')(options)).toBe('[5]');
    expect(hbs.compile('{{{to-json (slice bar 0)}}}')(options)).toBe('[1,2,3,4,5]');
    expect(hbs.compile('{{{to-json (slice bar 1)}}}')(options)).toBe('[2,3,4,5]');
    expect(hbs.compile('{{{to-json (slice bar 0 -1)}}}')(options)).toBe('[1,2,3,4]');
    expect(hbs.compile('{{{to-json (slice bar 0 0)}}}')(options)).toBe('[]');
    expect(hbs.compile('{{{to-json (slice bar 0 1)}}}')(options)).toBe('[1]');

    expect(hbs.compile('{{{to-json (slice baz -1)}}}')(options)).toBe('{"e":5}');
    expect(hbs.compile('{{{to-json (slice baz 0)}}}')(options)).toBe('{"a":1,"b":2,"c":3,"d":4,"e":5}');
    expect(hbs.compile('{{{to-json (slice baz 1)}}}')(options)).toBe('{"b":2,"c":3,"d":4,"e":5}');
    expect(hbs.compile('{{{to-json (slice baz 0 -1)}}}')(options)).toBe('{"a":1,"b":2,"c":3,"d":4}');
    expect(hbs.compile('{{{to-json (slice baz 0 0)}}}')(options)).toBe('{}');
    expect(hbs.compile('{{{to-json (slice baz 0 1)}}}')(options)).toBe('{"a":1}');
});

test('test Handlebars helper "reverse"', async () => {

    const options = {
        foo: '12345',
        bar: [1, 2, 3, 4, 5],
        baz: {a: 1, b: 2, c: 3, d: 4, e: 5}
    };

    expect(() => hbs.compile('{{reverse}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{reverse null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{to-json (reverse foo)}}}')(options)).toBe('"54321"');
    expect(hbs.compile('{{{to-json (reverse bar)}}}')(options)).toBe('[5,4,3,2,1]');
    expect(hbs.compile('{{{to-json (reverse baz)}}}')(options)).toBe('{"e":5,"d":4,"c":3,"b":2,"a":1}');
});

test('test Handlebars helper "shuffle"', async () => {

    const options = {
        foo: '1234567890',
        bar: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        baz: {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 0}
    };

    expect(() => hbs.compile('{{shuffle}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{shuffle null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (shuffle foo)}}')(options)).toBe('string');
    expect(hbs.compile('{{length (shuffle foo)}}')(options)).toBe(String(options.foo.length));
    expect(hbs.compile('{{not-equals (shuffle foo) foo deep=true}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (shuffle bar)}}')(options)).toBe('array');
    expect(hbs.compile('{{length (shuffle bar)}}')(options)).toBe(String(options.bar.length));
    expect(hbs.compile('{{not-equals (shuffle bar) bar deep=true}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (shuffle baz)}}')(options)).toBe('object');
    expect(hbs.compile('{{length (shuffle baz)}}')(options)).toBe(String(Object.keys(options.baz).length));
    expect(hbs.compile('{{not-equals (shuffle baz) baz deep=true}}')(options)).toBe('true');
});

test('test Handlebars helper "sort"', async () => {

    const options = {
        foo: '0123456789',
        bar: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        baz: {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9},
        bla1: "ABCDEFGHIJabcdefghij",
        bla2: "AaBbCcDdEeFfGgHhIiJj",
        blubb: [
            {
                num: 2,
                str: "C"
            },
            {
                num: 1,
                str: "E"
            },
            {
                num: 1,
                str: "D"
            },
            {
                num: 1,
                str: "A"
            },
            {
                num: 2,
                str: "B"
            },
        ]
    };

    expect(() => hbs.compile('{{sort}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (sort (shuffle foo))}}')(options)).toBe('string');
    expect(hbs.compile('{{equals (sort (shuffle foo)) foo deep=true}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (sort (shuffle bar))}}')(options)).toBe('array');
    expect(hbs.compile('{{equals (sort (shuffle bar)) bar deep=true}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (sort (shuffle baz))}}')(options)).toBe('object');
    expect(hbs.compile('{{equals (sort (shuffle baz)) baz deep=true}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (sort (shuffle baz) "key")}}')(options)).toBe('object');
    expect(hbs.compile('{{equals (sort (shuffle baz) "key") baz deep=true}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (sort (shuffle baz) "value")}}')(options)).toBe('object');
    expect(hbs.compile('{{equals (sort (shuffle baz) "value") baz deep=true}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (sort (shuffle bla1) ignorecase=false)}}')(options)).toBe('string');
    expect(hbs.compile('{{equals (sort (shuffle bla1) ignorecase=false) bla1 deep=true}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (sort (shuffle bla1) ignorecase=true)}}')(options)).toBe('string');
    expect(hbs.compile('{{equals (lowercase (sort (shuffle bla1) ignorecase=true)) ' +
        '(lowercase bla2) deep=true}}')(options)).toBe('true');

    // check descending sort
    expect(hbs.compile('{{type-of (sort (shuffle bar) descending=true)}}')(options)).toBe('array');
    expect(hbs.compile('{{equals (sort (shuffle bar) descending=true) ' +
        '(reverse bar) deep=true}}')(options)).toBe('true');

    // check stable sort
    expect(hbs.compile('{{{to-json (sort blubb "num")}}}')(options))
        .toBe('[{"num":1,"str":"E"},{"num":1,"str":"D"},{"num":1,"str":"A"},{"num":2,"str":"C"},{"num":2,"str":"B"}]');

    // check stable sort with multiple executions
    expect(hbs.compile('{{{to-json (sort (sort blubb "str") "num")}}}')(options))
        .toBe('[{"num":1,"str":"A"},{"num":1,"str":"D"},{"num":1,"str":"E"},{"num":2,"str":"B"},{"num":2,"str":"C"}]');
});

test('test Handlebars helper "first"', async () => {

    const options = {
        foo: '1234',
        bar: [1, 2, 3, 4],
        baz: {a: 1, b: 2, c: 3, d: 4}
    };

    expect(() => hbs.compile('{{first}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{first null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (first foo)}}')(options)).toBe('string');
    expect(hbs.compile('{{equals (first foo) "1"}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (first bar)}}')(options)).toBe('number');
    expect(hbs.compile('{{equals (first bar) 1}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (first baz)}}')(options)).toBe('number');
    expect(hbs.compile('{{equals (first baz) 1}}')(options)).toBe('true');
});

test('test Handlebars helper "last"', async () => {

    const options = {
        foo: '1234',
        bar: [1, 2, 3, 4],
        baz: {a: 1, b: 2, c: 3, d: 4}
    };

    expect(() => hbs.compile('{{last}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{last null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (last foo)}}')(options)).toBe('string');
    expect(hbs.compile('{{equals (last foo) "4"}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (last bar)}}')(options)).toBe('number');
    expect(hbs.compile('{{equals (last bar) 4}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (last baz)}}')(options)).toBe('number');
    expect(hbs.compile('{{equals (last baz) 4}}')(options)).toBe('true');
});

test('test Handlebars helper "at"', async () => {

    const options = {
        foo: '1234',
        bar: [1, 2, 3, 4],
        baz: {a: 1, b: 2, c: 3, d: 4}
    };

    expect(() => hbs.compile('{{at}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{at null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{at null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{type-of (at foo 2)}}')(options)).toBe('string');
    expect(hbs.compile('{{equals (at foo 2) "3"}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (at bar 2)}}')(options)).toBe('number');
    expect(hbs.compile('{{equals (at bar 2) 3}}')(options)).toBe('true');

    expect(hbs.compile('{{type-of (at baz 2)}}')(options)).toBe('number');
    expect(hbs.compile('{{equals (at baz 2) 3}}')(options)).toBe('true');
});

test('test Handlebars helper "concat"', async () => {

    const options = {
        foo1: '1234',
        foo2: '56',
        foo3: '78',
        bar1: [1, 2, 3, 4],
        bar2: [5, 6],
        bar3: [7, 8],
    };

    expect(() => hbs.compile('{{concat}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{concat null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{concat foo1 foo2 foo3}}')(options)).toBe('12345678');
    expect(hbs.compile('{{to-json (concat bar1 bar2 bar3)}}')(options)).toBe('[1,2,3,4,5,6,7,8]');

    expect(() => hbs.compile('{{concat foo1 bar1}}')(options)).toThrow(TypeError);
});

test('test Handlebars helper "flatten"', async () => {

    const options = {
        foo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        bar: [[1, 2], [3, 4], [5, [6, [7, 8]]]]
    };

    expect(() => hbs.compile('{{flatten}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{flatten null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{equals (flatten (chunk foo 2)) foo deep=true}}')(options)).toBe('true');
    expect(hbs.compile('{{{to-json (flatten bar)}}}')(options)).toBe('[1,2,3,4,5,[6,[7,8]]]');
    expect(hbs.compile('{{{to-json (flatten bar 1)}}}')(options)).toBe('[1,2,3,4,5,[6,[7,8]]]');
    expect(hbs.compile('{{{to-json (flatten bar 2)}}}')(options)).toBe('[1,2,3,4,5,6,[7,8]]');
    expect(hbs.compile('{{{to-json (flatten bar 0)}}}')(options)).toBe('[1,2,3,4,5,6,7,8]');
});

test('test Handlebars helper "keys"', async () => {

    const options = {
        foo: {a: 1, b: 2, c: 3, d: 4}
    };

    expect(() => hbs.compile('{{keys}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{keys null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{to-json (keys foo)}}}')(options)).toBe('["a","b","c","d"]');
});

test('test Handlebars helper "values"', async () => {

    const options = {
        foo: {a: 1, b: 2, c: 3, d: 4}
    };

    expect(() => hbs.compile('{{values}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{values null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{to-json (values foo)}}}')(options)).toBe('[1,2,3,4]');
});
