const Logger = require("./logger.js");
const logger = new Logger();

// Register a listener
logger.addListener("messageLogged", function (arg) {
    console.log("message logged", arg);
});

// Log a message
logger.log("message");
