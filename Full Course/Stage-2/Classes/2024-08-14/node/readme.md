# Theory

## Global scope

### Intro

-   `console` from _console.log()_ is what we call a global object, which is part of the global scope and is availble in the browser and in Node.
-   This means that we can access it anywhere, in any file or function.
-   There are other object and functions that are also globally available in Node. We can use these inside a browser or inside Node. For example:
    -   setTimeout()
    -   clearTimeout()
    -   setInterval()
    -   clearInterval()

### Browser

-   The `window` object, which represents our global scope
-   All functions and variables declared globally are accessible via the `window` object.
-   For example:
    -   We can call `window.console.log('message');` or simply `console.log('message');`
        -   The JavaScript engine will automatically prefix it with `window.`
    -   Similar. The functions mentioned above belong to the window object:
        -   window.setTimeout()
        -   window.setInterVal()
    -   When we declare a variable like `var message = 'Hello';` this variable is added to the global object.
        -   This variable is now also available as `window.message` and `console.log(window.message);` works
        -   This doesn't work for objects declared inside a function. These will be part of the scope within that function.

### Node

-   In Node we don't have this window object!
-   In Node we have another object called `global`
-   Just like with the windows object we can access the above mentioned objects and function like:
    -   global.setTimeout()
    -   global.clearTimeout()
    -   global.setInterval()
    -   global.clearInterval()
    -   global.console.log()
-   Normally we don't use the global. prefix, just like we normally don't use the window. prefix in the browser

### Important difference between the browser and Node

**In Node functions and variables declared in the code are not added to the global object**

-   That means that if I declare a variable like `var name = 'Karel';`, this new variable name is **NOT** accessible via `global.name`
-   Test it yourself:

    ```JS
    var message = 'Hello';
    console.log(global.message);

    // Output will be: undefined
    ```

-   This is because of Node' modular setup

## Mode Module System

### Intro

-   As mentioned if we declare a variable or a function in the browser, it is added to the global scope. Example:

    ```JS
    var sayHello = function() {

    }
    // this function is added to the global scope and we could use
    window.sayHello();
    ```

    -   There is a problem with this: it is possible that we have two different JS files that declare a variable or function with the exact same name, for example the above sayHello() function.
    -   Because this function is added to the global scope, the first sayHello() function in the global scope will be overwritten when we declare it for the second time in another file.

-   When we build applications we often use multiple files need to try prevent defining object in the global scope. We need _MODULARITY_.

### Modules

-   We want small building block or **modules** in which we can declare variables and functions in such a way that two variables or functions with the same name in different files don't overwrite eachother.
-   The variables and functions declared inside each module should be encapsulated inside that module.

At the core of Node we have this concept called _Module_

-   Every file in a Node application is considered a module
-   Variables and function defined inside a module (file) are scoped to that module (file). We say these objects are _private_.
-   These variables and function are not available outside that module
-   If you want to use a variable or a function defined in a module outside that module, you need to export it and make it _public_

Each node application has at least 1 file, or at least 1 module which we call the _main module_. Often called index.js.

**Recap:** in Node every file is a module and all variables and functions declared inside that file are scoped within that module. They're not available outside that module.

### Create a module

-   Create a main module called index.js
    ```JS
    console.log(module)
    ```
-   Create a file called logger.js with the following content:

    ```JS
    var url = "http://someloggingservice.io";

    function log(message) {
        // Some commumication with the URL
        console.log(message);
    }
    ```

    -   The variable `url` and the function `log()` are both scoped to this module. They're private and not visible outside this module

-   We want to use this log function inside our main module (index.js), but as mentioned earlier, this function is by default not available outside the logger.js module.
-   To be able to use it, we need to make the function log() public. This is how you do that in Node:

    ```JS
    var url = "http://someloggingservice.io";

    function log(message) {
        // Some commumication with teh URL
        console.log(message);
    }

    module.export.log = log;
    module.export.url = url;
    ```

    -   We've now made the url variable and the log() function are publically available when another module import this logger mdoule.

-   In this case we wouldn't want to export `url`, because it's implementation detail. Other modules don't need to know about it. We only want to export some of the module properties to the "outside" world.

    -   DVD Player metaphor
        <img src="dvd-public.png"  width="600" />
        <img src="dvd-private.png" width="600" />
    -   Adjusted

        ```JS
        var url = "http://someloggingservice.io";

        function log(message) {
            // Some commumication with the URL
            console.log(message);
        }

        module.export.log = log;

        // We keep url private
        ```

    -   Export one object

        ```JS
        var url = "http://someloggingservice.io";

        function log(message) {
            // Some commumication with the URL
            console.log(message);
        }

        module.exports = log;

        // We keep url private
        ```

### Load a module

-   const ... = require("file.js");

    ```JS
    const logger = require("./logger.js");

    logger.info('message');
    ```

-   Best practice to use const instead of var or let. That way you won't be able to accidently overwrite an imported module:

    ```JS
    var logger = require("./logger.js");

    logger = 1;

    logger.info('message');

    // Will produce an error, because logger is now just the number 1
    // and doesn't have this log() function anymore.
    ```

### Module wrapper function

-   Every module gets wrapped in a function by Node:

    ```JS
    const moduleWrapper = require('module').wrapper;

    console.log(moduleWrapper);
    ```

-   Outputs:
    ```JS
    [
        '(function (exports, require, module, __filename, __dirname) { ',
        '\n});'
    ]
    ```
-   This is basically the function that Node uses to wrap the code inside a file / module. This also kinda explains why everything inside a module (file) is scoped to that module and won't be available in other files. Unless explicitly exported by the module itself and the module is imported by another module.

### Node build in modules examples:

-   path

    ```JS
    const path = require('path');
    console.log(path.parse(__filename));
    ```

-   os
    ```JS
    const os = require('os');
    console.log(os.totalmem());
    console.log(os.freemem());
    ```
-   fs

    ```JS
    const fs = require('fs');

    fs.readdir("./", function (err, files) {
        if (err) {
            console.log(err);
        } else {
            console.log(files);
        }
    });
    ```

    -   Notice: most methods offered in this module have two variants: with Sync (synchronous) or without Sync (asynchronous, node default behavious). For example `readdirSync()` and `readdir()`
    -   Try to always use the asynchronous method when possible
