import EventEmitter from "events";

class Logger extends EventEmitter {
    logdialogue(actor, message) {
        // Colors using ANSI escape codes
        const colors = {
            red: "\x1b[31m",
            green: "\x1b[32m",
            blue: "\x1b[34m",
            reset: "\x1b[0m",
        };

        switch (actor) {
            case "dog":
                this.emit("dog", `${colors.green}${message}${colors.reset}`);
                break;
            case "cat":
                this.emit("cat", `${colors.blue}${message}${colors.reset}`);
                break;
            case "chicken":
                this.emit("chicken", `${colors.red}${message}${colors.reset}`);
                break;
        }
    }
}

export default Logger;
