// This works fine as is, if it doesnt't work again then something else is the problem not this code
//example URL to use in browser: http://localhost:3000/api/products?id=1
import http from "http";
import { URL } from "url";

const port = 3000;
const URLS = {
    homepageURL:"/",
    productsURL: "/products"
};

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
    {
        id: 4,
        name:"Product 4",
    },
];

const server = http.createServer(function (request, response)  {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = url.pathname;
    
    if (pathname === URLS["homepageURL"]) {
        response.write('Hello World!');
        response.end();
    }
    else if (pathname.startsWith(URLS["productsURL"])) {
        const id = parseInt(pathname.split("/")[2]);

        if(id){
            var returnedProduct;
            products.forEach(function(product){
                if(product.id == id){
                    returnedProduct = product;
                }
            });
            
            if(returnedProduct){
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
    }
    else {
        response.statusCode = 404;
        response.write("Not Found", function(){
            response.write("Click back to go back.");
            response.end();
        });
       
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
