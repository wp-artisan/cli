const program = require("commander");
const pkg = require("../package.json");

const artisan = require("./scripts");

program.version(pkg.version, "-v, --version");

program
  .command("init [dir]")
  .option("-f, --force", "Overwrites existing files, if have.")
  .option("-y, --yes", "Skip user inputs")
  .description("wp init [dir] -f -y")
  .action((dir, options) => artisan.init({ dir, options, config: { ...pkg } }));

// TODO: Put all other commands here.

program.parse(process.argv);
