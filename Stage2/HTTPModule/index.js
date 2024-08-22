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
    const pathname = url.pathname;
    
    if (pathname === "/") {
        response.write('Hello World!');
        response.end();
    } else if (pathname.startsWith("/api/products")) {
        console.log(pathname.split("/")[3]);
        const id = parseInt(pathname.split("/")[3]);
        if(id){
            var returnedProduct;
            products.forEach(function(product){
                if(product.id == id){
                    returnedProduct = product;
                }
            });
            
            if(returnedProduct){
                console.log("product: ", returnedProduct);
                response.write(JSON.stringify(returnedProduct));
                response.end();
            }else{
                response.write("This product does not exist");
                response.end();
            }
            
        }
        else{
            response.write(JSON.stringify(products));
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
