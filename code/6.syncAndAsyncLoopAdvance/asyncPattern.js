const { readFile } = require("fs");
const { readFile: readFilePromises } = require("fs/promises"); // also require("fs").promises can be used
const path = require("path");

const pathToText = path.join(__dirname, "../1.osModule/sysinfo.txt");

const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(new Error("No data: " + err));
      } else {
        resolve(data);
      }
    });
  });
};

getText(pathToText)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const start = async () => {
  // this is better then above
  try {
    const data = await getText(pathToText);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const startAwait = async () => {
  try {
    const data = await readFilePromises(pathToText, "utf8"); // see the diff
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
start();
