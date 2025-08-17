const http = require("http");
const { log } = require("console");
const fs = require("fs");

const stream = fs.createReadStream(`${__dirname}/./bigfile.txt`, {
  highWaterMark: 20000, // size of buffer
  encoding: "utf8", // if no encoding is used it will give buffer and bits
});

stream.on("data", (chunk) => {
  log(chunk);
});

http
  .createServer((req, res) => {
    const stream = fs.createReadStream(`${__dirname}/./bigfile.txt`, {
      highWaterMark: 5000, // size of buffer
      encoding: "utf8", // if no encoding is used it will give buffer and bits
    });

    stream.on("error", (err) => {
      res.end("error occured while reading file");
    });

    stream.on("open", () => {
      // stream.pipe(res); this wont let you log or control , it handles res.end automatically
    });

    stream.on("data", (chunk) => {
      res.write(
        `======== chunk started ========\n${chunk}\n=========== end of chunk ==========\n`,
      );
    });

    stream.on("end", () => {
      res.end();
    });
  })
  .listen(5000);
