const program = require("commander");
const pkg = require("../package.json");

program.version(pkg.version, '-v, --version');

// TODO: Put all the commands here

program.parse(process.argv);
