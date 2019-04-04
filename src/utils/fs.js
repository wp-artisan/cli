const shelljs = require("shelljs/shell");
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const _ = require("lodash");

const fsUtil = {
  isFileExists(fp) {
    try {
      fs.lstatSync(fp);
    } catch (err) {
      if (err.code === "ENOENT") return false;
      throw err;
    }

    return true;
  },

  getWorkingDir(dir = null) {
    let rootDir = `${shelljs.pwd()}`;
    if (!dir) return rootDir;

    return path.join(rootDir, dir);
  },

  getTemplatePath(fp) {
    return `${__dirname}/../../resources/templates/${fp}.tpl`;
  },

  writeFileSync(targetFp, tplFp, tplParams) {
    const fileContent = getFileContent(tplFp, tplParams);
    fsExtra.outputFileSync(targetFp, fileContent);
  },

  writeJSONSync(fp, fileContent) {
    fsExtra.outputFileSync(fp, JSON.stringify(fileContent, null, 2));
  },

  readFileSync(fp, charset = null) {
    const content = fs.readFileSync(fp, charset);
    return content;
  },

  copyFileSync(srcFp, targetFp) {
    shelljs.cp("-R", srcFp, targetFp);
  },

  mkdirSync(dir) {
    try {
      fs.statSync(dir);
    } catch (err) {
      fs.mkdirSync(dir);
    }
  },

  forceUnlink(fp) {
    if (typeof fp !== "object") return;
    shelljs.rm("-rf", fp);
  }
};

function getFileContent(tplFp, tplParams) {
  const tplContent = fsUtil.readFileSync(tplFp);

  if (!tplParams) {
    return tplContent;
  }
  return _.template(tplContent)(tplParams);
}

module.exports = fsUtil;
