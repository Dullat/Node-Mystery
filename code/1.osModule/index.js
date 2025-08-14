const os = require("os");
const fs = require("fs");
const path = require("path");

// gettin os info
const systemInfo = `
========================
  SYSTEM INFORMATION
========================
Username      : ${os.userInfo().username}
OS Type       : ${os.type()}
Platform      : ${os.platform()}
Release       : ${os.release()}
Uptime        : ${Math.floor(os.uptime() / 60)} minutes
Total Memory  : ${(os.totalmem() / 1024 ** 3).toFixed(2)} GB
Free Memory   : ${(os.freemem() / 1024 ** 3).toFixed(2)} GB
CPU Cores     : ${os.cpus().length}
Temp Dir      : ${os.tmpdir()}
========================
`;

console.log(systemInfo);

// writing into a file
const filePath = path.join(__dirname, "sysinfo.txt");

fs.writeFile(filePath, systemInfo, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(filePath);
  }
});
