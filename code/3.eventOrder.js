const fs = require('fs');

console.log("🏁 Start of script");

// ===== Microtasks =====
process.nextTick(() => console.log("🚀 nextTick (microtask)"));
Promise.resolve().then(() => console.log("💎 Promise (microtask)"));

// ===== Macrotasks from main script =====
setTimeout(() => console.log("⏳ setTimeout 0ms (timer)"), 0);
setImmediate(() => console.log("⚡ setImmediate (check phase)"));

// ===== I/O Simulation =====
fs.readFile(__filename, () => {
  console.log("📂 fs.readFile callback (poll phase)");

  // Inside I/O callback: check phase comes next
  setTimeout(() => console.log("⏳ setTimeout inside I/O"), 0);
  setImmediate(() => console.log("⚡ setImmediate inside I/O"));

  process.nextTick(() => console.log("🚀 nextTick inside I/O"));
  Promise.resolve().then(() => console.log("💎 Promise inside I/O"));
});

console.log("🏁 End of script");
