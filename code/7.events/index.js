const http = require("http");
const { log } = require("console");
const EventEmitter = require("events");

const tracker = new EventEmitter();

tracker.on("response", (msg) => {
  log(msg, "mate : data recived");
});

setTimeout(() => {
  tracker.emit("response", "hola");
}, 3000);

const server = http.createServer();

server.on("request", (req, res) => {
  // coz it has Event class that has a request event, visit official docs
  log("someone visited..");
  res.end("wlcome bruhhhh");
});

server.listen(5000);
