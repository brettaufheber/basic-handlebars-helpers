const {helpers} = require('../../index');
const hbs = require("handlebars");

helpers.register();

test('test Handlebars helper "union"', async () => {

    const options = {
        arr: {
            foo: ["a", "b", "c", "d"],
            bar: ["c", "d", "e", "f"],
            baz: ["e", "f", "g", "h"]
        },
        obj: {
            foo: {a: 1, b: 2, c: 3, d: 4},
            bar: {c: 5, d: 6, e: 7, f: 8},
            baz: {e: 9, f: 10, g: 11, h: 12}
        }
    };

    expect(() => hbs.compile('{{union}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{to-json (union arr.foo arr.bar arr.baz)}}}')(options))
        .toBe('["a","b","c","d","e","f","g","h"]');

    expect(hbs.compile('{{{to-json (union obj.foo obj.bar obj.baz)}}}')(options))
        .toBe('{"a":1,"b":2,"c":5,"d":6,"e":9,"f":10,"g":11,"h":12}');
});

test('test Handlebars helper "intersection"', async () => {

    const options = {
        arr: {
            foo: ["a", "b", "c", "d"],
            bar: ["c", "d", "e", "f"],
            baz: ["e", "f", "c", "d"],
            bla: ["e", "f", "g", "h"]
        },
        obj: {
            foo: {a: 1, b: 2, c: 3, d: 4},
            bar: {c: 5, d: 6, e: 7, f: 8},
            baz: {e: 9, f: 10, c: 11, d: 12},
            bla: {e: 13, f: 14, g: 15, h: 16}
        }
    };

    expect(() => hbs.compile('{{intersection}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{to-json (intersection arr.foo arr.bar arr.baz)}}}')(options)).toBe('["c","d"]');
    expect(hbs.compile('{{{to-json (intersection arr.foo arr.bar arr.bla)}}}')(options)).toBe('[]');

    expect(hbs.compile('{{{to-json (intersection obj.foo obj.bar obj.baz)}}}')(options)).toBe('{"c":11,"d":12}');
    expect(hbs.compile('{{{to-json (intersection obj.foo obj.bar obj.bla)}}}')(options)).toBe('{}');
});

test('test Handlebars helper "sym-difference"', async () => {

    const options = {
        arr: {
            foo: ["a", "b", "c", "d"],
            bar: ["c", "d", "e", "f"],
            baz: ["e", "f", "g", "h"],
            bla: ["e", "f", "a", "b"]
        },
        obj: {
            foo: {a: 1, b: 2, c: 3, d: 4},
            bar: {c: 5, d: 6, e: 7, f: 8},
            baz: {e: 9, f: 10, g: 11, h: 12},
            bla: {e: 13, f: 14, a: 15, b: 16}
        }
    };

    expect(() => hbs.compile('{{sym-difference}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{to-json (sym-difference arr.foo arr.bar arr.baz)}}}')(options)).toBe('["a","b","g","h"]');
    expect(hbs.compile('{{{to-json (sym-difference arr.foo arr.bar arr.bla)}}}')(options)).toBe('[]');

    expect(hbs.compile('{{{to-json (sym-difference obj.foo obj.bar obj.baz)}}}')(options))
        .toBe('{"a":1,"b":2,"g":11,"h":12}');
    expect(hbs.compile('{{{to-json (sym-difference obj.foo obj.bar obj.bla)}}}')(options)).toBe('{}');
});

test('test Handlebars helper "difference"', async () => {

    const options = {
        arr: {
            foo: ["a", "b", "c", "d"],
            bar: ["c", "d", "e", "f"],
            baz: ["e", "f", "g", "h"]
        },
        obj: {
            foo: {a: 1, b: 2, c: 3, d: 4},
            bar: {c: 5, d: 6, e: 7, f: 8},
            baz: {e: 9, f: 10, g: 11, h: 12}
        }
    };

    expect(() => hbs.compile('{{difference}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{difference null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{to-json (difference arr.foo arr.bar)}}}')(options)).toBe('["a","b"]');
    expect(hbs.compile('{{{to-json (difference arr.foo arr.baz)}}}')(options)).toBe('["a","b","c","d"]');
    expect(hbs.compile('{{{to-json (difference arr.foo arr.foo)}}}')(options)).toBe('[]');

    expect(hbs.compile('{{{to-json (difference obj.foo obj.bar)}}}')(options)).toBe('{"a":1,"b":2}');
    expect(hbs.compile('{{{to-json (difference obj.foo obj.baz)}}}')(options)).toBe('{"a":1,"b":2,"c":3,"d":4}');
    expect(hbs.compile('{{{to-json (difference obj.foo obj.foo)}}}')(options)).toBe('{}');
});
