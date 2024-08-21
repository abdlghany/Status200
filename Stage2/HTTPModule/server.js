const http = require("http");


const server = http.createServer((request, response) => {
    if (request.url === "/") {
        response.write("Hello World");
        response.end();
    }
    if(request.url === "/api/products"){
        const result = [
            {
                id: 1,
                name: "Product 1",
            },
            {
                id: 2,
                name: "Product 2",
            },
            {
                id: 3,
                name: "Product 3",
            },
        ];
    const message = JSON.stringify(result);
    response.write(message);
    response.end();
    }

});

server.listen(3000);

console.log("Listening on port 3000...");
