const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("welcome to dev.......");
  }

  if (req.url !== "/") {
    res.end(
      `
    <p>cant uind the page you looking f'ooooooooorrrrrrrrr</p>
  `,
    );
  }
});

server.listen(5000);
