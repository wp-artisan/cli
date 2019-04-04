const path = require("path");
const chalk = require("chalk");

const fs = require("../utils/fs");

module.exports = ({ dir, options, config }) => {
  const workingDir = fs.getWorkingDir(dir);

  console.log(`Initializing in ${chalk.green(workingDir)}`);
  if (dir) fs.mkdirSync(dir);

  // Create artisan.json
  const targetFile = "artisan.json";
  const targetFilePath = `${workingDir}/${targetFile}`;
  const tplPath = fs.getTemplatePath(targetFile);
  fs.writeFileSync(targetFilePath, tplPath, { cliVersion: config.version });
};
