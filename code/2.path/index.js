const os = require("os");
const path = require("path");

console.log("Directory name:", path.dirname(__filename));
console.log("File name:", path.basename(__filename));
console.log("Extension:", path.extname(__filename));
console.log("Parsed:", path.parse(__filename));

const filePath = path.join("/content", "folder", "txt.js");

console.log(filePath);
