console.log(Object.keys(global));
console.log(Object.keys(globalThis));

console.log({
  process: global.process.argv,
  console: global.console,
  Buffer: global.Buffer,
  __dirname: __dirname,
  __filename: __filename,
});
