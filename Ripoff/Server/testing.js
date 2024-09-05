/* function getProductsNamesAndVariations(variation_ids, callback){
    var products = [];
    var variations = [];
    var productsVariationsQuery = "SELECT p.product_name as name, pv.variation_name as variation FROM products_variations pv JOIN products p ON p.product_id = pv.product_id WHERE";
    var productsVariationsParameters = [];
    // loop through variaion ID's to create the query and populate the parameters array.
    variation_ids.forEach(function(value, index){
        productsVariationsQuery += " pv.variation_id = ? ";
        if(index != parseInt(variation_ids.length-1)){
            productsVariationsQuery += "OR";
        }
        productsVariationsParameters.push(value);
    });
    db.query(productsVariationsQuery, productsVariationsParameters, function(err, results){
        if(err){console.error("getting products names and variation names error: ", err);}
        if(results){
            results.forEach(function(result){
                products.push(result.name);
                variations.push(result.variation);
            });
        }
        callback({products, variations});
    });
    
}
import MysqlQueries from "./mysqlQueries.js";
const db = new MysqlQueries();
db.connect();

getProductsNamesAndVariations([1,2,3,4,5,6,7,8], function({products, variations}) {
    var Products = products;
    for(let i = 0; i < Products.length; i++) {
        // get the first 4 words of every product name (because some products might have really long names)
        const splitProduct = Products[i].split(" ");
        Products[i] = "";  // Initialize as an empty string to build the new product name

        splitProduct.forEach(function(prod, index) {
            // limit the name to 4 words
            if(index <= 3) {
                Products[i] += prod;
                if(index != 3){
                    Products[i] += " ";
                }
            }
        });

        // add 3 dots to indicate that this is not the end of the product name if the name was truncated
        if(splitProduct.length >= 4) {
            Products[i] += "...";
        }
    }
});

 */

/* import send from "./emailSender.js";

const emailStatus = send("abdalghanyy1996@gmail.com",
     "Ripoff password reset code",
      "Please enter your password reset code on the website to regain access to your account");

if(emailStatus){
    console.log("Email sent successfully.");
}
else{
    console.error("Email failed to send, reason unknown yet.");
} */
/*     var biggest = -50;
    var smallest = 999999999;
    for(let i =0; i<999;i++){
        const code = Math.floor(100000 + Math.random() * 900000);
        if(code > biggest){
            biggest = code;
        }
        if(code < smallest){
            smallest = code;
        }
    }
    console.log("Biggest generated number: "+ biggest);
    console.log("Smallest generated number: "+ smallest); */

/* db.query(pricesQuery, priceQueryParameters, function(err, results){
    console.log(results);
    
    //console.log(results[0], results[1]);
}); */