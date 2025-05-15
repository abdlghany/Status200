// Import built-in path module (see https://nodejs.org/docs/latest/api/ for more information)
const path = require("path");

// Show file name of this module
console.log(path.basename(__filename));

// Show directory path where this module is located
console.log(path.dirname(__filename));

// Show file information
console.log(path.parse(__filename));

// Info:
//
// __filename is injected by Node.js and contains the file path of the current module
