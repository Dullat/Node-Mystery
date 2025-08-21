const http = require("http");
const fs = require("fs");

// get all files
const homePage = fs.readFileSync("./navbar-app/index.html");
const styles = fs.readFileSync("./navbar-app/styles.css");

const server = http.createServer((req, res) => {
  console.log(req.url);
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
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(styles);
    res.end();
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(5000, () => {
  console.log("runing on 5000");
});
