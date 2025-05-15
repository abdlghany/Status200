# Events Module

-   This is a core module of Node.

-   It has a class called EventEmitter which is one of the core building blocks of Node

-   A lot of classes in other modules / packages are based on this EventEmitter

### Load the Events module

```js
const EventEmitter = require("events");
```

**Remarks:**

-   `require('events')` returns a `class`, which is a container for a bunch of related methods and properties.

-   Naming convention:
    -   The first letter of each word is upppercase, this is called `PascalCase`
    -   Indicates that Event Emitter is a class and not a function / method or single value

### Create an Event Emitter instance

To be able to use the Event Emitter we first need to create an instance of the class.

```js
const EventEmitter = require("events");
const emitter = new EventEmitter();
```

**Remarks:**

-   emitter is an `object`.
-   Remember this metaphor:<br><br>

    -   A class is like "human"
    -   An object is like an actual "person"

    <br><img src="./class-vs-object.png" width="250" />

-   A class defines the properties and behaviours of a concept of a human. An object is an actual instance of that class. So:

    -   `EventEmitter` is a _class_. it defines what an EventEmitter can do.

    -   `emitter` is an actual _object_. That's the one we are going to use in our application.

**Emitter object**

The emitter object has a bunch of methods. All these methods are mentioned in the Events module [documentation](https://nodejs.org/docs/latest/api/events.html). You can see these in vscode thanks to IntelliSense.

<img src="./intellisense.png" width="400" />

**In most cases we use 2 of these methods:**

-   emit

    ```js
    emitter.emit();
    ```

-   addListener
    ```js
    emitter.addListener();
    ```

**`emit` is used to raise an event.**

-   The word _emit_ means 'making a noise' or produce something
-   In this case we're making a noise in our application, signalling something has happened.
-   We can pass an argument which is the name of the event:<br><br>

    ```js
    emitter.emit("messageLogged");
    ```

-   Later on we're going to extend our logger module. Everytime we log a message we're going to raise an event called `messageLogged`
-   Update our code:

    ```js
    // index.js
    const EventEmitter = require("events");
    const emitter = new EventEmitter();

    // Raise an event
    emitter.emit("messageLogged");
    ```

-   Run the script we have so far and notice that nothing has happened:
    -   We raised an event, but no where in our application we have a registered listener interested in that event (loggedMessage)

**`addListener` or `on` (an alias) listens to a raised event**

-   A listener is a function that will be called when an event is raised.
-   Register a listener that will be called when the `loggedMessage` event is raised
-   Update our code:<br><br>

    ```js
    // index.js
    const EventEmitter = require("events");
    const emitter = new EventEmitter();

    // Register a listener
    emitter.addListener("messageLogged", function () {
        console.log("Listener called");
    });

    // Raise an event
    emitter.emit("messageLogged");
    ```

    -   addListener takes 2 arguments:
        -   the name of the event
        -   a callback function (the actual listener)

-   Run the script we have so far
    -   You'll see the message "Listener called"
    -   When we raised the event "messageLogged", the callback function (listener) was called

**Notice**
The order in the code is important. If we register the listener after the event is raised, nothing would happen. Because when we call the emit methode, this emitter is not listening yet.

# Event Arguments

When you raise an event you often want to send some data about that event that just happened.

For example: in our logger module, when we log a message. Perhaps our database connection failed. In that case we want to log the database error and maybe some id.

### Add event arguments to the event

```js
emitter.emit("messageLogged", 1, "db error message");
```

You can keep adding event parameters, but this is a bit confusing as you can see.
When you send multiple values to an event, it's better to use an object:

```js
emitter.emit("messageLogged", { id: 1, message: "db error message" });
```

**Update our code:**

```js
// index.js
const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register a listener
emitter.addListener("messageLogged", function () {
    console.log("message logged");
});

// Raise an event
emitter.emit("messageLogged", { id: 1, message: "db error message" });
```

### Receive the event parameters

When registering a listener, the callback function (the actual listener) can receive event arguments.

```js
emitter.addListener("messageLogged", function (arg) {
    console.log("message logged");
});
```

I called it `arg`, but you can call it whatever you want. By covention we often use `arg` (arguments) or `e` (refers to event) or `eventArg`.

**Update our code:**

```js
// index.js
const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register a listener
emitter.addListener("messageLogged", function (arg) {
    console.log("message logged", arg);
});

// Raise an event
emitter.emit("messageLogged", { id: 1, message: "db error message" });
```

### Exercise

-   Exercise: In our logger module, just before calling our database, raise an event called "logging". While raising this event also send some data, the message that is going to be logged.<Br><br>

    ```js
    // index.js
    const EventEmitter = require("events");
    const emitter = new EventEmitter();

    // Register a listener
    emitter.addListener("messageLogged", function (arg) {
        console.log("message logged", arg);
    });

    // Raise an event
    emitter.emit("messageLogged", { id: 1, message: "db error message" });

    // Raise: logging (data: message)
    ```

-   Solution:<br><br>

    ```js
    // index.js
    const EventEmitter = require("events");
    const emitter = new EventEmitter();

    // Register a listener for logging
    emitter.addListener("logging", function (arg) {
        console.log("message logged", arg);
    });

    // Register a listener for messageLogged
    emitter.addListener("messageLogged", function (arg) {
        console.log("message logged", arg);
    });

    // Raise: logging (data: message)
    emitter.emit("logging", { data: "logging message" });

    // Raise: messageLogged
    emitter.emit("messageLogged", { id: 1, message: "db error message" });
    ```

# Extending EventEmitter

Our [index.js](index.js)

```js
// index.js
const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register a listener
emitter.addListener("messageLogged", function (arg) {
    console.log("message logged", arg);
});

// Raise an event
emitter.emit("messageLogged", { id: 1, message: "db error message" });
```

In real world applications it is rare to work with the `emitter` object directly.

You want to create a class that has all the capabilities of the EventEmitter, and you would use that class in your code.

### What does this mean and why?

Open [logger-orginal.js](logger-orginal.js)

```js
// logger-orginal.js
var url = "https://someloggerservice.io";

function log(message) {
    // Send HTTP request
    console.log(message);
}

module.exports.log = log;
```

-   this module exports a simple function called log
-   the log function logs the message in the console.
-   remove demo code:
    -   `var url = "https://someloggerservice.io";`
    -   `// Send HTTP request`
-   copy remaining code to logger.js

```js
// logger.js
function log(message) {
    console.log(message);
}

module.exports.log = log;
```

After we log the message in the console, we want to raise an event and do something.

**Task**

-   Load the `EventEmitter` class in logger.js
-   Create an instance of the class called `emitter`, an object
-   Move the `messageLogged` event raiser from from [index.js](index.js) to logger.js

_Why move the raise event to logger.js?_
Because that code shouldn't be in the index.js, it's the logger module that emits or signals an event. Saying that the message is logged.

**Result**

```js
// index.js
const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register a listener
emitter.addListener("messageLogged", function (arg) {
    console.log("message logged", arg);
});
```

```js
// logger.js
const EventEmitter = require("events");
const emitter = new EventEmitter();

function log(message) {
    // Log message in terminal
    console.log(message);

    // Raise an event
    emitter.emit("messageLogged", { id: 1, message: "db error message" });
}

/*
    What we've learned so far
    - const logger = require("./logger");
    - logger.log('message');
*/
// module.exports.log = log;

/* 
    If only one method is exported
    - const logger = require("./logger");
    - logger('message');
*/
module.exports = log;
```

**Next**

Load the logger module in the index.js and call the log() method.

```js
// index.js
const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register a listener
emitter.addListener("messageLogged", function (arg) {
    console.log("message logged", arg);
});

const logger = require("./logger.js");
logger("message");
```

**Test**

-   Run this application in the terminal `node index.js`
-   You will only see _message_, why?

    -   Because the EventEmitter object in index.js is a different object than the EventEmitter object in logger.js

    -   _Remember?_ A class is like a bleuprint (human) and an object (Karel, Ferry, Sebastian) is an actual instance of that class.

-   In this case we have 2 different objects, which are completely different (one is Karel, the other is Ferry)
    -   One emitter object in logger.js that raises an event
    -   The other emitter object in index.js handles an event

### Real world

In a real world application it's rare to work with the Event Emitter directly.

Instead you want to create a class that has all the capabilities of the Event Emitter, but has additional capabilities. _In our case logging a message_.

### Create a class

**Step 1** create the class

```js
// logger.js
const EventEmitter = require("events");
const emitter = new EventEmitter();

var url = "https://someloggerservice.io";

class Logger {
    log(message) {
        // Send HTTP request
        console.log(message);

        // Raise an event
        emitter.emit("messageLogged", { id: 1, message: "db error message" });
    }
}

module.exports = Logger;
```

-   A function inside a class is called a `method`
-   Note the PascalCase notation of the class name
-   Instead of exporting the log function, we export Logger class.

**Step 2** add the EventEmitter properties to the class

```js
// logger.js
const EventEmitter = require("events");
const emitter = new EventEmitter();

var url = "https://someloggerservice.io";

class Logger extends EventEmitter {
    log(message) {
        // Send HTTP request
        console.log(message);

        // Raise an event
        emitter.emit("messageLogged", { id: 1, message: "db error message" });
    }
}

module.exports = Logger;
```

-   _IMPORTANT:_ With this smalll change, the Logger class now has inherited all the properties (functionality) of the EventEmitter class.

**Step 3** use emit directly using `this`

```js
// logger.js
const EventEmitter = require("events");
// const emitter = new EventEmitter();

var url = "https://someloggerservice.io";

class Logger extends EventEmitter {
    log(message) {
        // Send HTTP request
        console.log(message);

        // Raise an event
        this.emit("messageLogged", { id: 1, message: "db error message" });
    }
}

module.exports = Logger;
```

-   We no longer need this `const emitter = new EventEmitter();`. It can be removed, since we're not using it anywhere in our code.
-   `this` references to the class itself (out of the scope of this course so far)

**Step 4** index module

```js
// index.js
const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register a listener
emitter.addListener("messageLogged", function (arg) {
    console.log("message logged", arg);
});

const Logger = require("./logger.js");
const logger = new Logger();
logger.log("message");
```

-   Change the import: we're importing a class called Logger now.
-   Create an instance of the class Logger

**Step 5**

Get rid of the emitter object in the index module and use the Logger instance instead

```js
// index.js
const Logger = require("./logger.js");
const logger = new Logger();

// Register a listener
logger.addListener("messageLogged", function (arg) {
    console.log("message logged", arg);
});

// Log a message
logger.log("message");
```

-   _Reminder:_ the Logger class inherited all functionality from the EventEmitter class. This means it now also has the property "addListener"
-   Since we're not using _EventEmitter_ in our code anywhere, we can remove it from our code.
-   Since we're not using emitter in our code anywhere, we can remove it from our code.

#### Test

Run `node index.js`

-   The log message is shown in the console
-   The listeners caught the raised event messageLogged and also wrote something in the console

```bash
node index.js
message
message logged { id: 1, message: 'db error message' }
```

## Recap

If you want to raise events in your application to signal something has happened, you need to create a custom class that extends EventEmitter.

The custom class will now inherit all the functionality of the EventEmitter class. But you can now also add your own additional functionality to this custom class, like the ability to log a message.

In that custom class you use `this.emit` whenever you want to raise an event.

-   `this` references to the class itself (out of the scope of this course so far)

Finally, in index.js you would use an instance of this custom class (Logger in our case) instead of the EventEmitter class.
