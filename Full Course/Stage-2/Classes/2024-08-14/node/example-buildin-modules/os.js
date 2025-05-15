// Import built-in os module (see https://nodejs.org/docs/latest/api/ for more information)
const os = require("os");

// Show platform
console.log("Platform:", os.platform());

// Show architecture
console.log("Architecture:", os.arch());

// Show free memory
console.log("Free memory:", os.freemem());

// Show total memory
console.log("Total memory:", os.totalmem());
