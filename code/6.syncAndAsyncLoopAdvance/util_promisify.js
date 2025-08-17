const { readFile } = require("fs");
const util = require("util");
const path = require("path");

const readFilePromises = util.promisify(readFile); // see the magik
const pathToText = path.join(__dirname, "../1.osModule/sysinfo.txt");

const startAwait = async () => {
  try {
    const data = await readFilePromises(pathToText, "utf8");
    console.log("========= start of Util.promisify.js =============");
    console.log(`
      =========== Promises =============
      ${data}
      =========== End ==================
    `);
  } catch (err) {
    console.log(err);
  }
};

startAwait();
