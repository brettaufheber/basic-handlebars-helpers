const settings = {};

const setupAsciidoctor = function (asciidoctor, attributes) {

    settings.asciidoctor = asciidoctor;
    settings.attributes = attributes || {};
};

function loadFile(file, baseDir) {

    return settings.asciidoctor.loadFile(file, {
        safe: 'server',
        doctype: 'article',
        base_dir: baseDir,
        attributes: settings.attributes
    });
}

function convert(content, inline) {

    return settings.asciidoctor.convert(content, {
        safe: 'secure',
        doctype: inline ? 'inline' : 'article',
        attributes: settings.attributes
    });
}

module.exports = {
    setupAsciidoctor,
    loadFile,
    convert,
};
