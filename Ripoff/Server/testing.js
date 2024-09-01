function getProductsNamesAndVariations(variation_ids, callback){
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

