// This program simulates:

//     Reading config from a file (Poll phase)

//     Periodically checking server health (Timers phase)

//     Immediate cleanup tasks (Check phase)

//     Using microtasks for high-priority logging


const fs = require('fs');

// Load server configuration (Poll phase)
fs.readFile('config.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Config file missing, using defaults...");
    } else {
        console.log("Config loaded:", data);
    }

    process.nextTick(() => console.log("✅ Config read complete (nextTick)"));
    Promise.resolve().then(() => console.log("📌 Config read complete (Promise)"));
});

// Health check every 5 seconds (Timers phase)
setInterval(() => {
    console.log("\n🩺 Checking server health...");

    // Imagine we're making an async API call here
    setTimeout(() => console.log("✅ Server is healthy"), 500);

    process.nextTick(() => console.log("🚨 Critical alert check (nextTick)"));
    Promise.resolve().then(() => console.log("📌 Background log flush (Promise)"));

}, 5000);

// Cleanup tasks that must run after I/O (Check phase)
setImmediate(() => {
    console.log("\n🧹 Cleanup: removing old logs");
    process.nextTick(() => console.log("🗑 Cleanup subtask (nextTick)"));
    Promise.resolve().then(() => console.log("📌 Cleanup subtask (Promise)"));
});

console.log("Server monitor starting...");

// result 
// How This Works in Practice

//     Poll phase: Loads config.json at startup.

//     Timers phase: Every 5 seconds, checks the server health.

//     Check phase: Runs immediate cleanup tasks right after poll phase finishes.

//     Microtasks: Used for urgent logging or small jobs that shouldn’t wait for the next big phase.
