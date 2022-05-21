const {helpers} = require('../../index');
const hbs = require("handlebars");

helpers.register();

test('test Handlebars helper "parse-url"', async () => {

    const options = {
        url: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string&a=b#hash'
    };

    expect(() => hbs.compile('{{parse-url}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{parse-url null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{get (parse-url url) "href"}}}')(options))
        .toBe('https://user:pass@sub.example.com:8080/p/a/t/h?query=string&a=b#hash');

    expect(hbs.compile('{{{get (parse-url url) "origin"}}}')(options)).toBe('https://sub.example.com:8080');
    expect(hbs.compile('{{{get (parse-url url) "protocol"}}}')(options)).toBe('https:');
    expect(hbs.compile('{{{get (parse-url url) "scheme"}}}')(options)).toBe('https');
    expect(hbs.compile('{{{get (parse-url url) "authority"}}}')(options)).toBe('user:pass@sub.example.com:8080');
    expect(hbs.compile('{{{get (parse-url url) "username"}}}')(options)).toBe('user');
    expect(hbs.compile('{{{get (parse-url url) "password"}}}')(options)).toBe('pass');
    expect(hbs.compile('{{{get (parse-url url) "host"}}}')(options)).toBe('sub.example.com:8080');
    expect(hbs.compile('{{{get (parse-url url) "hostname"}}}')(options)).toBe('sub.example.com');
    expect(hbs.compile('{{{get (parse-url url) "port"}}}')(options)).toBe('8080');
    expect(hbs.compile('{{{get (parse-url url) "pathname"}}}')(options)).toBe('/p/a/t/h');
    expect(hbs.compile('{{{get (parse-url url) "search"}}}')(options)).toBe('?query=string&a=b');
    expect(hbs.compile('{{{get (parse-url url) "query"}}}')(options)).toBe('query=string&a=b');
    expect(hbs.compile('{{{get (parse-url url) "hash"}}}')(options)).toBe('#hash');
    expect(hbs.compile('{{{get (parse-url url) "fragment"}}}')(options)).toBe('hash');

    expect(hbs.compile('{{type-of (get (parse-url url) "params")}}')(options)).toBe('array');
    expect(hbs.compile('{{{to-json (get (parse-url url) "params")}}}')(options))
        .toBe('[{"key":"query","value":"string"},{"key":"a","value":"b"}]');
});

test('test Handlebars helper "with-auth"', async () => {

    const options = {
        url1: 'https://user:pass@sub.example.com',
        url2: 'https://sub.example.com'
    };

    expect(() => hbs.compile('{{with-auth}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{with-auth null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{with-auth null null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{with-auth url1 "foo"}}}')(options)).toBe('https://foo@sub.example.com/');
    expect(hbs.compile('{{{with-auth url2 "foo"}}}')(options)).toBe('https://foo@sub.example.com/');

    expect(hbs.compile('{{{with-auth url1 "foo" null}}}')(options)).toBe('https://foo@sub.example.com/');
    expect(hbs.compile('{{{with-auth url2 "foo" null}}}')(options)).toBe('https://foo@sub.example.com/');

    expect(hbs.compile('{{{with-auth url1 null "bar"}}}')(options)).toBe('https://sub.example.com/');
    expect(hbs.compile('{{{with-auth url2 null "bar"}}}')(options)).toBe('https://sub.example.com/');

    expect(hbs.compile('{{{with-auth url1 "foo" "bar"}}}')(options)).toBe('https://foo:bar@sub.example.com/');
    expect(hbs.compile('{{{with-auth url2 "foo" "bar"}}}')(options)).toBe('https://foo:bar@sub.example.com/');

    expect(hbs.compile('{{{with-auth url1 null}}}')(options)).toBe('https://sub.example.com/');
    expect(hbs.compile('{{{with-auth url2 null}}}')(options)).toBe('https://sub.example.com/');
});

test('test Handlebars helper "with-hostname"', async () => {

    const options = {
        url1: 'https://sub.example.com',
        url2: 'https://sub.example.com:8080'
    };

    expect(() => hbs.compile('{{with-hostname}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{with-hostname null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{with-hostname null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{with-hostname url1 ""}}}')(options)).toBe('https://sub.example.com/');
    expect(hbs.compile('{{{with-hostname url1 "foo"}}}')(options)).toBe('https://foo/');
    expect(hbs.compile('{{{with-hostname url2 "foo"}}}')(options)).toBe('https://foo:8080/');
});

test('test Handlebars helper "with-port"', async () => {

    const options = {
        url1: 'https://sub.example.com',
        url2: 'https://sub.example.com:8080'
    };

    expect(() => hbs.compile('{{with-port}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{with-port null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{with-port null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{with-port url1 "9000"}}}')(options)).toBe('https://sub.example.com:9000/');
    expect(hbs.compile('{{{with-port url2 "9000"}}}')(options)).toBe('https://sub.example.com:9000/');

    expect(hbs.compile('{{{with-port url1 null}}}')(options)).toBe('https://sub.example.com/');
    expect(hbs.compile('{{{with-port url2 null}}}')(options)).toBe('https://sub.example.com/');

    expect(hbs.compile('{{{with-port url1 0}}}')(options)).toBe('https://sub.example.com:0/');
    expect(hbs.compile('{{{with-port url2 0}}}')(options)).toBe('https://sub.example.com:0/');

    expect(hbs.compile('{{{with-port url1 1}}}')(options)).toBe('https://sub.example.com:1/');
    expect(hbs.compile('{{{with-port url2 1}}}')(options)).toBe('https://sub.example.com:1/');
});

test('test Handlebars helper "with-pathname"', async () => {

    const options = {
        url1: 'https://sub.example.com',
        url2: 'https://sub.example.com/a/b'
    };

    expect(() => hbs.compile('{{with-pathname}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{with-pathname null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{with-pathname null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{with-pathname url1 ""}}}')(options)).toBe('https://sub.example.com/');
    expect(hbs.compile('{{{with-pathname url2 ""}}}')(options)).toBe('https://sub.example.com/');

    expect(hbs.compile('{{{with-pathname url1 "/foo/bar"}}}')(options)).toBe('https://sub.example.com/foo/bar');
    expect(hbs.compile('{{{with-pathname url2 "/foo/bar"}}}')(options)).toBe('https://sub.example.com/foo/bar');

    expect(hbs.compile('{{{with-pathname url1 "foo/bar"}}}')(options)).toBe('https://sub.example.com/foo/bar');
    expect(hbs.compile('{{{with-pathname url2 "foo/bar"}}}')(options)).toBe('https://sub.example.com/foo/bar');

    expect(hbs.compile('{{{with-pathname url1 "foo/bar/"}}}')(options)).toBe('https://sub.example.com/foo/bar/');
    expect(hbs.compile('{{{with-pathname url2 "foo/bar/"}}}')(options)).toBe('https://sub.example.com/foo/bar/');
});

test('test Handlebars helper "with-query"', async () => {

    const options = {
        url1: 'https://sub.example.com',
        url2: 'https://sub.example.com?query=string&a=b',
        query_array: [{key: 'foo', value: 'bar'}, {key: 'baz', value: 'bla'}]
    };

    expect(() => hbs.compile('{{with-query}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{with-query null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{with-query null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{with-query url1 ""}}}')(options)).toBe('https://sub.example.com/?');
    expect(hbs.compile('{{{with-query url2 ""}}}')(options)).toBe('https://sub.example.com/?');

    expect(hbs.compile('{{{with-query url1 null}}}')(options)).toBe('https://sub.example.com/');
    expect(hbs.compile('{{{with-query url2 null}}}')(options)).toBe('https://sub.example.com/');

    expect(hbs.compile('{{{with-query url1 "foo=bar&baz=bla"}}}')(options))
        .toBe('https://sub.example.com/?foo=bar&baz=bla');
    expect(hbs.compile('{{{with-query url2 "foo=bar&baz=bla"}}}')(options))
        .toBe('https://sub.example.com/?foo=bar&baz=bla');

    expect(hbs.compile('{{{with-query url1 query_array}}}')(options))
        .toBe('https://sub.example.com/?foo=bar&baz=bla');
    expect(hbs.compile('{{{with-query url2 query_array}}}')(options))
        .toBe('https://sub.example.com/?foo=bar&baz=bla');

    expect(hbs.compile('{{{with-query url1 (object foo="bar" baz="bla")}}}')(options))
        .toBe('https://sub.example.com/?foo=bar&baz=bla');
    expect(hbs.compile('{{{with-query url2 (object foo="bar" baz="bla")}}}')(options))
        .toBe('https://sub.example.com/?foo=bar&baz=bla');

    expect(hbs.compile('{{{with-query url1 "foo=bar&baz=bla" append=true}}}')(options))
        .toBe('https://sub.example.com/?foo=bar&baz=bla');
    expect(hbs.compile('{{{with-query url2 "foo=bar&baz=bla" append=true}}}')(options))
        .toBe('https://sub.example.com/?query=string&a=b&foo=bar&baz=bla');

    expect(hbs.compile('{{{with-query url1 query_array append=true}}}')(options))
        .toBe('https://sub.example.com/?foo=bar&baz=bla');
    expect(hbs.compile('{{{with-query url2 query_array append=true}}}')(options))
        .toBe('https://sub.example.com/?query=string&a=b&foo=bar&baz=bla');

    expect(hbs.compile('{{{with-query url1 (object foo="bar" baz="bla") append=true}}}')(options))
        .toBe('https://sub.example.com/?foo=bar&baz=bla');
    expect(hbs.compile('{{{with-query url2 (object foo="bar" baz="bla") append=true}}}')(options))
        .toBe('https://sub.example.com/?query=string&a=b&foo=bar&baz=bla');
});

test('test Handlebars helper "with-fragment"', async () => {

    const options = {
        url1: 'https://sub.example.com',
        url2: 'https://sub.example.com#hash'
    };

    expect(() => hbs.compile('{{with-fragment}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{with-fragment null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{with-fragment null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{with-fragment url1 ""}}}')(options)).toBe('https://sub.example.com/#');
    expect(hbs.compile('{{{with-fragment url2 ""}}}')(options)).toBe('https://sub.example.com/#');

    expect(hbs.compile('{{{with-fragment url1 null}}}')(options)).toBe('https://sub.example.com/');
    expect(hbs.compile('{{{with-fragment url2 null}}}')(options)).toBe('https://sub.example.com/');

    expect(hbs.compile('{{{with-fragment url1 "foo"}}}')(options)).toBe('https://sub.example.com/#foo');
    expect(hbs.compile('{{{with-fragment url2 "foo"}}}')(options)).toBe('https://sub.example.com/#foo');
});
