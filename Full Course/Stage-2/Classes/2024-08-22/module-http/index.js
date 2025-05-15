//
// Code from class
//

import http from "http";
import { URL } from "url";

const products = [
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

const server = http.createServer(function (request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = url.pathname;

    if (request.url === "/") {
        response.write("Hello World");
        response.end();
    }

    if (pathname.startsWith("/api/products")) {
        const id = parseInt(pathname.split("/")[3]);
        if (isNaN(id)) {
            response.write(JSON.stringify(products));
            response.end();
        } else {
            let product = null;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id == id) {
                    product = products[i];
                }
            }
            response.write(JSON.stringify(product));
            response.end();
        }
    }
});

server.listen(3000);

console.log("Listening on port 3000 ...");
