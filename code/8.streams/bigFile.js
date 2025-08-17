const { writeFileSync } = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "bigfile.txt");

for (let i = 0; i < 10000; i++) {
  writeFileSync(filePath, `hello world ${i}\n`, { flag: "a" });
}
