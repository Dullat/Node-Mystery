
// Node.js Event Loop Phases (per tick)

// 1️⃣ TIMERS PHASE
// ----------------
// Runs callbacks scheduled by setTimeout() and setInterval()
// Executes only if the timer has expired.
// Note: Timers are NOT guaranteed to run exactly on time —
//       they run when the loop reaches this phase and the delay has passed.
setTimeout(() => console.log("Timers phase"), 0);


// 2️⃣ PENDING CALLBACKS PHASE
// ---------------------------
// Executes I/O callbacks that were deferred to the next loop iteration.
// Examples: certain TCP errors, DNS lookups (non-getaddrinfo), etc.
// This phase is rare for direct app code.
setImmediate(() => { /* Not pending callbacks, this is for check phase */ });


// 3️⃣ IDLE, PREPARE PHASE
// -----------------------
// Internal use only — you won't interact with this phase in normal code.
// Node/libuv uses this to prepare for the poll phase.


// 4️⃣ POLL PHASE
// -------------
// The "heart" of the loop. Here:
//   - Node waits for new I/O events (file reads, network requests).
//   - Executes I/O callbacks (e.g., fs.readFile, HTTP requests).
//   - If there are no timers ready, poll can wait for I/O until something happens.
//   - If setImmediate() is queued, poll will end early to move to the check phase.
const fs = require('fs');
fs.readFile(__filename, () => console.log("Poll phase: I/O callback"));


// 5️⃣ CHECK PHASE
// ---------------
// Executes all callbacks scheduled by setImmediate().
// setImmediate() always runs AFTER the poll phase in a given tick.
setImmediate(() => console.log("Check phase: setImmediate callback"));


// 6️⃣ CLOSE CALLBACKS PHASE
// -------------------------
// Runs callbacks for closing resources.
// Example: socket.on('close'), server.on('close').
// Triggered when a handle/resource is closed.
const net = require('net');
const server = net.createServer();
server.on('close', () => console.log("Close callbacks phase"));
server.close();


// ⚡ SPECIAL CASES (Run between phases)
// -------------------------------------
// process.nextTick()  --> Runs immediately after the current operation,
//                         before moving to the next phase. (Highest priority.)
// Promises / queueMicrotask() --> Runs after process.nextTick(), before next macrotask.
process.nextTick(() => console.log("process.nextTick (highest priority)"));
Promise.resolve().then(() => console.log("Promise microtask"));

