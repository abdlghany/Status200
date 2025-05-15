// Import built-in  filesystem module (see https://nodejs.org/docs/latest/api/ for more information)
const fs = require("fs");

// Read directory files
fs.readdir(__dirname, (err, files) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("Files:", files);
    }
});

// Read file
fs.readFile("./example.txt", "utf8", (err, data) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("File contents:", data);
    }
});

// Info:
//
// __dirname is injected by Node.js and contains the directory path of the current module
// __filename is injected by Node.js and contains the file path of the current module
