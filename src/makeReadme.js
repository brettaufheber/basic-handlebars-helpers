const {helpers} = require('../index');
const fs = require('fs');
const hbs = require('handlebars');

helpers.register();

async function main() {

    const options = {
        package: require('../package.json'),
        definitions: helpers.getBasicHelperDefinitions(),
        license: await fs.promises.readFile('./LICENSE.txt')
            .then((input) => input.toString())
    };

    await fs.promises.readFile('./template-readme.md.hbs')
        .then((input) => hbs.compile(input.toString()))
        .then((template) => template(options))
        .then((output) => fs.promises.writeFile('./README.md', output));
}

if (require.main === module) {

    main()
        .catch((error) => {

            console.error(`An error occurred during execution`);
            console.error(error);

            process.exitCode = 1;
        });
}

module.exports = {
    main,
};
