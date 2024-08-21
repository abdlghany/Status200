const EventEmitter = require("events");

class Logger extends EventEmitter{

    log(message) {
        console.log(message);
        this.emit("messageLogged", message);
    }

    error(message){
        console.error(message);
        this.emit("errorMessageLogged", message);
    }
}
 
module.exports = Logger;
