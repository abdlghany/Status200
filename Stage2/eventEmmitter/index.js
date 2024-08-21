const Logger = require("./logger.js");
const logger = new Logger();

logger.addListener("messageLogged", function(argument){
    console.log("Message recieved.");
});
logger.addListener("errorMessageLogged", function(argument){
    console.log("An Error Message recieved."); 
});

logger.error("Database Error");
