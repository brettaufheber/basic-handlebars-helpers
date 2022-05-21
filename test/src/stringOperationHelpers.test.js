const {helpers, utils} = require('../../index');
const hbs = require("handlebars");

helpers.register();
utils.asciidoc.setupAsciidoctor(require('asciidoctor')(), {})

test('test Handlebars helper "asciidoc"', async () => {

    const options = {
        content: 'https://asciidoctor.org[AsciiDoc] is a _lightweight_ markup language'
    };

    expect(() => hbs.compile('{{asciidoc}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{asciidoc null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{asciidoc content inline=false}}}')(options))
        .toBe('<div class="paragraph">\n' +
            '<p><a href="https://asciidoctor.org">AsciiDoc</a> is a <em>lightweight</em> markup language</p>\n' +
            '</div>');

    expect(hbs.compile('{{{asciidoc content inline=true}}}')(options))
        .toBe('<a href="https://asciidoctor.org">AsciiDoc</a> is a <em>lightweight</em> markup language');
});

test('test Handlebars helper "format"', async () => {

    expect(() => hbs.compile('{{format}}')()).toThrow(TypeError);

    expect(hbs.compile('{{format "a test string;"}}')()).toBe('a test string;');
    expect(hbs.compile('{{format "a %s %s;" "test" "string"}}')()).toBe('a test string;');
    expect(hbs.compile('{{format "number: %e;" 42.738}}')()).toBe('number: 4.2738e+1;');
    expect(hbs.compile('{{format "number: %f;" 42.738}}')()).toBe('number: 42.738;');
    expect(hbs.compile('{{format "number: %i;" 42}}')()).toBe('number: 42;');
    expect(hbs.compile('{{format "number: %x;" 42}}')()).toBe('number: 2a;');
});

test('test Handlebars helper "lowercase"', async () => {

    expect(() => hbs.compile('{{lowercase}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{lowercase null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{lowercase "THIS IS A TEST STRING."}}')()).toBe('this is a test string.');
    expect(hbs.compile('{{lowercase "This Is A Test String."}}')()).toBe('this is a test string.');
    expect(hbs.compile('{{lowercase "this is a test string."}}')()).toBe('this is a test string.');
});

test('test Handlebars helper "uppercase"', async () => {

    expect(() => hbs.compile('{{uppercase}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{uppercase null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{uppercase "THIS IS A TEST STRING."}}')()).toBe('THIS IS A TEST STRING.');
    expect(hbs.compile('{{uppercase "This Is A Test String."}}')()).toBe('THIS IS A TEST STRING.');
    expect(hbs.compile('{{uppercase "this is a test string."}}')()).toBe('THIS IS A TEST STRING.');
});

test('test Handlebars helper "capitalize"', async () => {

    expect(() => hbs.compile('{{capitalize}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{capitalize null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{capitalize "THIS IS A TEST STRING." global=false}}')()).toBe('THIS IS A TEST STRING.');
    expect(hbs.compile('{{capitalize "This Is A Test String." global=false}}')()).toBe('This Is A Test String.');
    expect(hbs.compile('{{capitalize "this is a test string." global=false}}')()).toBe('This is a test string.');

    expect(hbs.compile('{{capitalize "THIS IS A TEST STRING." global=true}}')()).toBe('THIS IS A TEST STRING.');
    expect(hbs.compile('{{capitalize "This Is A Test String." global=true}}')()).toBe('This Is A Test String.');
    expect(hbs.compile('{{capitalize "this is a test string." global=true}}')()).toBe('This Is A Test String.');
});

test('test Handlebars helper "replace"', async () => {

    expect(() => hbs.compile('{{replace}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{replace null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{replace null null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{replace null null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{replace "Green apples and red apples are juicy." "apples" "oranges" global=false}}')())
        .toBe('Green oranges and red apples are juicy.');
    expect(hbs.compile('{{replace "Green apples and red apples are juicy." "apples" "oranges" global=true}}')())
        .toBe('Green oranges and red oranges are juicy.');

    expect(hbs.compile('{{replace "Apples are round.\nApples are juicy." ' +
        '"^Apples" "Oranges" global=true multiline=false}}')())
        .toBe('Oranges are round.\nApples are juicy.');
    expect(hbs.compile('{{replace "Apples are round.\nApples are juicy." ' +
        '"^Apples" "Oranges" global=true multiline=true}}')())
        .toBe('Oranges are round.\nOranges are juicy.');
});

test('test Handlebars helper "match"', async () => {

    expect(() => hbs.compile('{{match}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{match null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{match null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{to-json (match "Green apples and red apples." "oranges" global=false)}}}')()).toBe('[]');
    expect(hbs.compile('{{{to-json (match "Green apples and red apples." "oranges" global=true)}}}')()).toBe('[]');

    expect(hbs.compile('{{{to-json (match "Green apples and orange oranges." ' +
        '"^\\w+\\s+(\\w+)\\s+and\\s+\\w+\\s+(\\w+)\\.$" global=false)}}}')())
        .toBe('["Green apples and orange oranges.","apples","oranges"]');
    expect(hbs.compile('{{{to-json (match "Green apples and orange oranges. Red apples and green oranges." ' +
        '"\\w+\\s+(\\w+)\\s+and\\s+\\w+\\s+(\\w+)\\." global=true)}}}')())
        .toBe('[["Green apples and orange oranges.","apples","oranges"],' +
            '["Red apples and green oranges.","apples","oranges"]]');

    expect(hbs.compile('{{{to-json (match "Green apples and red apples are juicy." "a\\w*" global=false)}}}')())
        .toBe('["apples"]');
    expect(hbs.compile('{{{to-json (match "Green apples and red apples are juicy." "a\\w*" global=true)}}}')())
        .toBe('[["apples"],["and"],["apples"],["are"]]');

    expect(hbs.compile('{{{to-json (match "Apples are round.\nOranges are juicy." ' +
        '"^\\w+" global=true multiline=false)}}}')())
        .toBe('[["Apples"]]');
    expect(hbs.compile('{{{to-json (match "Apples are round.\nOranges are juicy." ' +
        '"^\\w+" global=true multiline=true)}}}')())
        .toBe('[["Apples"],["Oranges"]]');
});

test('test Handlebars helper "matches"', async () => {

    expect(() => hbs.compile('{{matches}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{matches null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{matches null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{matches "Green apples and red apples." "oranges"}}')()).toBe('false');
    expect(hbs.compile('{{matches "Green apples and red apples." "oranges"}}')()).toBe('false');

    expect(hbs.compile('{{matches "Green apples and orange oranges." ' +
        '"^\\w+\\s+(\\w+)\\s+and\\s+\\w+\\s+(\\w+)\\.$"}}')())
        .toBe('true');

    expect(hbs.compile('{{matches "Apples are round.\nOranges are juicy." "^Oranges" multiline=false}}')())
        .toBe('false');
    expect(hbs.compile('{{matches "Apples are round.\nOranges are juicy." "^Oranges" multiline=true}}')())
        .toBe('true');

    expect(hbs.compile('{{matches "Apples are round.\nOranges are juicy." "^Apples.+juicy\\.$" multiline=false}}')())
        .toBe('true');
    expect(hbs.compile('{{matches "Apples are round.\nOranges are juicy." "^Apples.+juicy\\.$" multiline=true}}')())
        .toBe('false');
});

test('test Handlebars helper "blank"', async () => {

    expect(() => hbs.compile('{{blank}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{blank null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{blank ""}}')()).toBe('true');
    expect(hbs.compile('{{blank "\t\n\r  "}}')()).toBe('true');
    expect(hbs.compile('{{blank "  A  "}}')()).toBe('false');
    expect(hbs.compile('{{blank "A"}}')()).toBe('false');
});

test('test Handlebars helper "starts-with"', async () => {

    expect(() => hbs.compile('{{starts-with}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{starts-with null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{starts-with null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{starts-with "" ""}}')()).toBe('true');
    expect(hbs.compile('{{starts-with "abcd" ""}}')()).toBe('true');
    expect(hbs.compile('{{starts-with "abcd" "ab"}}')()).toBe('true');
    expect(hbs.compile('{{starts-with "abcd" "abcd"}}')()).toBe('true');
    expect(hbs.compile('{{starts-with "abcd" "cd"}}')()).toBe('false');
});

test('test Handlebars helper "ends-with"', async () => {

    expect(() => hbs.compile('{{ends-with}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{ends-with null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{ends-with null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{ends-with "" ""}}')()).toBe('true');
    expect(hbs.compile('{{ends-with "abcd" ""}}')()).toBe('true');
    expect(hbs.compile('{{ends-with "abcd" "ab"}}')()).toBe('false');
    expect(hbs.compile('{{ends-with "abcd" "abcd"}}')()).toBe('true');
    expect(hbs.compile('{{ends-with "abcd" "cd"}}')()).toBe('true');
});

test('test Handlebars helper "trim"', async () => {

    expect(() => hbs.compile('{{trim}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{trim null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{trim ""}}}')()).toBe('');
    expect(hbs.compile('{{{trim "\t\n\r  "}}}')()).toBe('');
    expect(hbs.compile('{{{trim "  A  "}}}')()).toBe('A');
});

test('test Handlebars helper "trim-left"', async () => {

    expect(() => hbs.compile('{{trim-left}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{trim-left null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{trim-left ""}}}')()).toBe('');
    expect(hbs.compile('{{{trim-left "\t\n\r  "}}}')()).toBe('');
    expect(hbs.compile('{{{trim-left "  A  "}}}')()).toBe('A  ');
});

test('test Handlebars helper "trim-right"', async () => {

    expect(() => hbs.compile('{{trim-right}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{trim-right null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{trim-right ""}}}')()).toBe('');
    expect(hbs.compile('{{{trim-right "\t\n\r  "}}}')()).toBe('');
    expect(hbs.compile('{{{trim-right "  A  "}}}')()).toBe('  A');
});

test('test Handlebars helper "split"', async () => {

    expect(() => hbs.compile('{{split}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{split null}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{split null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{{to-json (split "" "")}}}')()).toBe('[]');
    expect(hbs.compile('{{{to-json (split "" ",")}}}')()).toBe('[""]');
    expect(hbs.compile('{{{to-json (split "a𝌆b" "")}}}')()).toBe('["a","𝌆","b"]');
    expect(hbs.compile('{{{to-json (split "a,b,c" ",")}}}')()).toBe('["a","b","c"]');
});

test('test Handlebars helper "join"', async () => {

    expect(() => hbs.compile('{{join}}')()).toThrow(TypeError);
    expect(() => hbs.compile('{{join null null null}}')()).toThrow(TypeError);

    expect(hbs.compile('{{join (array "") ""}}')()).toBe('');
    expect(hbs.compile('{{join (array "a" "𝌆" "b") ""}}')()).toBe('a𝌆b');
    expect(hbs.compile('{{join (array "a" "b" "c") ","}}')()).toBe('a,b,c');
    expect(hbs.compile('{{join (array "a" "b" "c")}}')()).toBe('abc');
});
