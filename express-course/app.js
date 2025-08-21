const http = require("http");
const fs = require("fs");

// get all files
const homePage = fs.readFileSync("./index.html");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write(homePage);
    res.end();
  } else if (req.url === "/about") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write("<h1>about page</h1>");
    res.end();
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(5000, () => {
  console.log("runing on 5000");
});
