// This works fine as is, if it doesnt't work again then something else is the problem not this code
//example URL to use in browser: http://localhost:3000/api/products?id=1
import http from "http";
import { URL } from "url";
const port = 3000;

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

const server = http.createServer(function (request, response)  {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const queryParams = url.searchParams;
    // console.log(Object.fromEntries(queryParams));
    
    if (url.pathname === "/") {
        
    } else if (url.pathname === "/api/products") {
        const id = queryParams.get("id");
        if(id){
            const product = products.find((element) => element.id = id);
            response.write(product.name);
            response.end();
        }
        response.end();
    } else {
        response.statusCode = 404;
        response.write("Not Found");
        response.end();
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
