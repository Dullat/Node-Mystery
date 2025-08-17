const { log } = require("console");
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("hahahah");
  }
  if (req.url === "/about") {
    for (let i = 0; i < 4; i++) {
      // while this is loading no other user be able to access the page , even home page
      for (let j = 0; j < 1000; j++) {
        for (let k = 0; k < 1000; k++) {
          log(i, j, k);
        }
      }
    }
    res.end("about page");
  }
  if (req.url !== "/") {
    log("no the page 404");
  }
});

server.listen(5000, () => {
  log("runing at 5000");
});

require("./asyncPattern.js");
require("./util_promisify.js");
