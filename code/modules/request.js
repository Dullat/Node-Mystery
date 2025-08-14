const name = "bob";

function encrypt(data) {
  return "encrypted data...";
}

function send(url, data) {
  const encData = encrypt(data);
  console.log(`sending to  : ${url}`);
}

module.exports = { send, name };

console.log(module);
