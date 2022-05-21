const {helpers} = require('../../index');
const hbs = require("handlebars");

helpers.register();

test('test Handlebars helper "basename"', async () => {

    expect(() => hbs.compile('{{basename}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{basename null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{basename "/foo/bar/baz/asdf/index.html.hbs"}}')()).toBe('index.html.hbs');
    expect(hbs.compile('{{basename "/foo/bar/baz/asdf/index.html.hbs" ".hbs"}}')()).toBe('index.html');
    expect(hbs.compile('{{basename "/foo/bar/baz/asdf/index.html.hbs" ".html.hbs"}}')()).toBe('index');
});

test('test Handlebars helper "dirname"', async () => {

    expect(() => hbs.compile('{{dirname}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{dirname null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{dirname "/foo/bar/baz/asdf"}}')()).toBe('/foo/bar/baz');
    expect(hbs.compile('{{dirname "/foo/bar/baz/asdf/"}}')()).toBe('/foo/bar/baz');
});

test('test Handlebars helper "extname"', async () => {

    expect(() => hbs.compile('{{extname}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{extname null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{extname "/foo/bar/baz/asdf/index.html.hbs"}}')()).toBe('.hbs');
    expect(hbs.compile('{{extname "index.html.hbs"}}')()).toBe('.hbs');
    expect(hbs.compile('{{extname "index.html"}}')()).toBe('.html');
});

test('test Handlebars helper "is-absolute-path"', async () => {

    expect(() => hbs.compile('{{is-absolute-path}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{is-absolute-path null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{is-absolute-path "/foo/bar"}}')()).toBe('true');
    expect(hbs.compile('{{is-absolute-path "/baz/.."}}')()).toBe('true');
    expect(hbs.compile('{{is-absolute-path "bla/"}}')()).toBe('false');
    expect(hbs.compile('{{is-absolute-path "."}}')()).toBe('false');
});

test('test Handlebars helper "normalize-path"', async () => {

    expect(() => hbs.compile('{{normalize-path}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{normalize-path null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{normalize-path ""}}')()).toBe('.');
    expect(hbs.compile('{{normalize-path "/foo/bar//baz/./asdf/bla/.."}}')()).toBe('/foo/bar/baz/asdf');
});

test('test Handlebars helper "relative-path"', async () => {

    expect(() => hbs.compile('{{relative-path}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{relative-path null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{relative-path null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{relative-path "/data/bla/test/aaa" "/data/bla/test/aaa"}}')())
        .toBe('.');
    expect(hbs.compile('{{relative-path "/data/bla/test/aaa" "/data/bla/impl/bbb"}}')())
        .toBe('../../impl/bbb');
    expect(hbs.compile('{{relative-path "/data/bla/test/aaa" ""}}')())
        .toBe('../../../..');
    expect(hbs.compile('{{relative-path "" "/data/bla/impl/bbb"}}')())
        .toBe('data/bla/impl/bbb');
});

test('test Handlebars helper "resolve-path"', async () => {

    expect(() => hbs.compile('{{resolve-path}}')()).toThrow(TypeError);


    expect(hbs.compile('{{resolve-path ""}}')()).toBe('.');
    expect(hbs.compile('{{resolve-path "."}}')()).toBe('.');
    expect(hbs.compile('{{resolve-path ".."}}')()).toBe('..');
    expect(hbs.compile('{{resolve-path "/foo/bar"}}')()).toBe('/foo/bar');
    expect(hbs.compile('{{resolve-path "/foo/bar" "./baz"}}')()).toBe('/foo/bar/baz');
    expect(hbs.compile('{{resolve-path "/foo/bar" "/tmp/file/"}}')()).toBe('/tmp/file');
    expect(hbs.compile('{{resolve-path "www" "static_files" "../.."}}')()).toBe('.');
    expect(hbs.compile('{{resolve-path "www" "static_files" "../../.."}}')()).toBe('..');
    expect(hbs.compile('{{resolve-path "www" "static_files" "../../../.."}}')()).toBe('../..');
    expect(hbs.compile('{{resolve-path "www" "static_files/png/"}}')()).toBe('www/static_files/png');
    expect(hbs.compile('{{resolve-path "www" "static_files/png/" "../gif/image.gif"}}')())
        .toBe('www/static_files/gif/image.gif');
});

test('test Handlebars helper "join-path"', async () => {

    expect(() => hbs.compile('{{join-path}}')()).toThrow(TypeError);

    expect(hbs.compile('{{join-path ""}}')()).toBe('.');
    expect(hbs.compile('{{join-path "."}}')()).toBe('.');
    expect(hbs.compile('{{join-path ".."}}')()).toBe('..');
    expect(hbs.compile('{{join-path "/foo/bar" "./baz"}}')()).toBe('/foo/bar/baz');
    expect(hbs.compile('{{join-path "/foo/bar" "/tmp/file/"}}')()).toBe('/foo/bar/tmp/file/');
    expect(hbs.compile('{{join-path "www" "static_files/png/"}}')()).toBe('www/static_files/png/');
    expect(hbs.compile('{{join-path "www" "static_files/png/" "../gif/image.gif"}}')())
        .toBe('www/static_files/gif/image.gif');
});
