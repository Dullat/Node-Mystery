const { send, name } = require("./request.js");
const response = require("./response.js");

function makeRequest(url, data) {
  send(url, data);
  return response.read();
}

const data = makeRequest("https:google.com", "hello");
console.log(data);
console.log(require.cache);

console.log(name, " ", response.read);

require("./file.js"); // runs whole file here
