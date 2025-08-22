const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/login") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString(); // convert buffer to string
    });

    req.on("end", () => {
      try {
        const parsedBody = JSON.parse(body);
        console.log(parsedBody);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "data recived", data: parsedBody }));
      } catch (err) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "data recived" }));
      }
    });
  }
});

server.listen(3000);
