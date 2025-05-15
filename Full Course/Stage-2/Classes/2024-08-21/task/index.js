import Logger from "./Logger.js";
const logger = new Logger();

logger.addListener("cat", function (arg) {
    console.log("The cat says.....", arg);
});
logger.addListener("dog", function (arg) {
    console.log("The dog shouted....", arg);
});
logger.addListener("chicken", function (arg) {
    console.log("The chicken responded....", arg);
});

logger.logdialogue("dog", "Hello I'm a the doggy!");
logger.logdialogue("cat", "Hello I'm a the kitty!");
logger.logdialogue("chicken", "Hello I'm the chicken!");

logger.logdialogue("dog", "Heya cat and chicken! How's life?");
logger.logdialogue("cat", "All good bro!");
logger.logdialogue("chicken", "Laid a few eggs this morning");
