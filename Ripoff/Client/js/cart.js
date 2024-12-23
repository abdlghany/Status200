var maxAvailableQuantity = 0;
window.onload = function() {
        shoppingCart();
};
var totalCartRM = 0;
var totalSelectedItemsCount = 0;

function fetchCartItems(){
    // Show a message if the view reloaded and there's a message. then remove it.
    if(localStorage.getItem("showToast")){
        showToast(localStorage.getItem("showToast"));
        localStorage.removeItem("showToast");
    }
    const userId = localStorage.getItem('id');
    axios.get(domain+"/fetchCartItems?id=" + userId)
        .then(function(response) {
            const cart = getElementById('cart');
            // clearing children of the div before filling it
            cart.replaceChildren();
            // if the server returns empty cart, display an empty cart message.
            if(response.data.message == "empty cart"){
                cart.innerHTML = "<h1 class='center'>You haven't added items to your shopping cart yet</h1>";
            }
            else{
            const cartItems = response.data;
            /* 
                columns: (user_id, variation_id, total_variation_quantity, product_id, variation_name, variation_price, variation_stock, name, image);
            */
            
            cartItems.forEach(function(item){
                // cart item container
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
               
                // Product Image
                const img = document.createElement('img');
                img.src = item.image;
                const imgDiv = document.createElement('div');
                imgDiv.classList.add("cart-img-div");
                imgDiv.onclick = function(){
                    window.location.assign("./product.html?product="+item.product_id)
                }
                imgDiv.title = item.product_name;
                imgDiv.appendChild(img);
                cartItemDiv.appendChild(imgDiv);
                // creating different Ids for each set of quantity button field button
                const cartProductCountInputId = "cartProductCount-"+item.variation_id;
                const cartLeftProductCountButtonId = "cartLeftProductCountButton-"+item.variation_id;
                const cartRightProductCountButtonId = "cartRightProductCountButton-"+item.variation_id;
                // Product and Variation Info
                const infoDiv = document.createElement('div');
                infoDiv.classList.add('cart-item-info');
                /* 
                        TODO:
                        there's currently a bug in the website that allows the same user to click 
                        'add to cart' to a product, even if they already have the max quantity available of the specific variation 
                        in their cart, so this should fix it for now...
                */
                var totalQuantityInUserCart = item.total_variation_quantity;
                if(totalQuantityInUserCart > item.variation_stock){ 
                    totalQuantityInUserCart = item.variation_stock;                                                 
                }
                infoDiv.innerHTML = `
                <h3><a title="View product" href="./product.html?product=${item.product_id}">${item.product_name}</a></h3>
                <div class="variation-quantity-price">
                    <p>Variation: ${item.variation_name}</p>
                    <p>${item.variation_stock} pieces available</p>
                    <p>Price: RM${item.variation_price}</p>
                    <div class="cartProductCountDiv">
                        <button id="${cartLeftProductCountButtonId}" class="cartLeftProductCountButton" title="Decrease quantity">-</button>
                        <input type="number" value="${totalQuantityInUserCart}" id="${cartProductCountInputId}" class="cartProductCount">
                        <button id="${cartRightProductCountButtonId}" class="cartRightProductCountButton" title="Increase quantity">+</button>
                    </div>
                </div>`;
                cartItemDiv.appendChild(infoDiv);

                // Total (Per item) Price + Checkboxes
                const totalItemPrice = (parseFloat(item.variation_price) * parseInt(totalQuantityInUserCart)).toFixed(2); // only show 2 numbers after the decimal
                const priceDiv = document.createElement('div');
                priceDiv.classList.add('cart-item-price');
                priceDiv.innerHTML = `<label for="checkbox-${item.variation_id}">Total: RM${totalItemPrice}</label>
                <input class="cartCheckbox" type="checkbox" value="${totalItemPrice}" name="checkbox-${item.variation_id}" id="checkbox-${item.variation_id}">`;
                cartItemDiv.appendChild(priceDiv);
                // Append cart item to cart div
                cart.appendChild(cartItemDiv);
                const cartProductCount = getElementById(cartProductCountInputId);
                // assign an onchange event to all quantity input fields.
                cartProductCount.onchange = function(){
                    const cartProductCountValue = cartProductCount.value;
                    preUpdateCartItemCount(item.variation_id, item.variation_stock, cartProductCountValue);
                }
                 // assign an onclick event for the + and the - buttons around the quantity input field.
                 const cartLeftProductCountButton = getElementById(cartLeftProductCountButtonId);
                 const cartRightProductCountButton = getElementById(cartRightProductCountButtonId);
                 
                 cartLeftProductCountButton.onclick = function(){
                     changeProductCount(0, cartProductCountInputId, item.variation_stock);
                     const cartProductCountValue = cartProductCount.value;
                     preUpdateCartItemCount(item.variation_id, item.variation_stock, cartProductCountValue)
                 }
                 cartRightProductCountButton.onclick = function(){
                    if(cartProductCount.value != item.variation_stock){
                        changeProductCount(1, cartProductCountInputId, item.variation_stock);
                        const cartProductCountValue = cartProductCount.value;
                        preUpdateCartItemCount(item.variation_id, item.variation_stock, cartProductCountValue);
                    }else{
                        showToast("Max available quantity reached")
                    }
                 }
            });
            // create a cartItemDiv for the Place order information
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item', 'placeOrderDiv');
            cartItemDiv.innerHTML = `
                <p id="finalTotalItemsCount">Total (0 Items)</p>
                <p id="finalOrderPrice">RM0.00</p>
                <button onclick="javascript:placeOrder()" title="Place Order" id="placeOrderButton">Place Order</button>
                <div class="cart-item-price">
                <label for="checkbox-final">Select All</label>
                <input class="cartCheckboxFinal" type="checkbox" value="checkbox-final" name="checkbox-final" id="checkbox-final">
                </div>
            `;
            cart.appendChild(cartItemDiv);
            const cartCheckboxes = document.getElementsByClassName("cartCheckbox");
            //checkboxes and input fields have the same length
            for (let i = 0; i < cartCheckboxes.length; i++) {
                // assign an on-change event listener to all checkboxes in the cart
                cartCheckboxes[i].addEventListener('change', function(event){
                    if(event.target.checked){
                        addToTotal(parseFloat(cartCheckboxes[i].value), true);
                    }
                    else{
                        addToTotal(-parseFloat(cartCheckboxes[i].value), false);
                    }
                });
            }
            const checkboxFinal = getElementById("checkbox-final");
            checkboxFinal.addEventListener('change', function(event){
                if(event.target.checked){
                    checkAll(cartCheckboxes, true);
                }
                else{
                    checkAll(cartCheckboxes, false);
                }
            });
        }
        })
        .catch(function(error){
            showToast("Error fetching cart items");
            // console.error('Error fetching cart items:', error);
        });
}
function placeOrder(){
    //TABLE: orders(order_id, user_id, datetime, total_price, order_status, order_pdf, payment_method)
    //              (AUTO, int secondary key, auto, decimal, completed ,can be null, "FPX Online Banking" )
    //TABLE: order_details(order_detail_id, order_id, variation_id, quantity, price)
    const cartCheckboxes = document.getElementsByClassName('cartCheckbox');
    const userId = localStorage.getItem('id');
    var variation_ids = [];
    for (let i = 0; i < cartCheckboxes.length; i++) {
        // check if the checkbox is checked before pushing the information to the array.
        if(cartCheckboxes[i].checked){
        // ID (of the HTML element 'checkbox') looks something like this: checkbox-44 where the 44 is the variation_id in the database.
        variation_ids.push(cartCheckboxes[i].id.split('-')[1]);
        // get quantity from the input value.
        }
    }
    if(variation_ids.length != 0){
    // using map() to fill the parameters with variation_ids and quantities and userId.
    const parameters = variation_ids.map((id) => ({
        userId: userId,
        variation_id: id
    }));
    axios.get(domain+"/order", {
        params: {parameters}
      }).then(function(response) {
        if(response.data.message){
            showToast(response.data.message);
            orderHistory();
        }
    })
    .catch(function(error) {
        showToast("Error placing your order");
    });
    }else{
        showToast("Please select at least 1 item");
    }

}
// check all checkboxes in the shopping cart
function checkAll(cartCheckboxes, state){
    for(let i=0; i<cartCheckboxes.length; i++){
        if(cartCheckboxes[i].checked != state){ // Prevent select all from selecting/deselecting already selected/deselected item
            cartCheckboxes[i].checked = state;
            if(state){
                addToTotal(parseFloat(cartCheckboxes[i].value), state);
            }else{
                addToTotal(-parseFloat(cartCheckboxes[i].value), state);
            }
        }       
    }
}
// adds to the total selected (item count, price sum) Shopping cart 
function addToTotal(value, checked){
    const finalTotalItemsCount = getElementById('finalTotalItemsCount');
    const finalOrderPrice = getElementById('finalOrderPrice');
    totalCartRM += value;
    if(checked){
        totalSelectedItemsCount+=1;
    }else{
        totalSelectedItemsCount-=1;
    }
    finalOrderPrice.innerHTML = "RM"+formatNumber(parseFloat(totalCartRM));
    finalTotalItemsCount.innerHTML = "Total ("+totalSelectedItemsCount+" Items)"
}
// function to prepare the updating of a cart item count when the user clicks - or + 
function preUpdateCartItemCount(variation_id, variation_stock, cartProductCountValue){
    //do not allow values less than 0 when the user changes this field's value manually, also do not allow values higher than 'variation_stock'
    if(cartProductCountValue > variation_stock){
        cartProductCountValue = variation_stock;
    }
    else if(cartProductCountValue < 0){
        cartProductCountValue = 0;
    }
    else if(!cartProductCountValue){
        // do not allow an empty field, fill it with 0 if the user deletes the value.
        cartProductCountValue = 0;
    }
    updateCartItemCount(variation_id, cartProductCountValue);
}

function updateCartItemCount(variation_id, cartProductCountValue){
    const urlExtension = "/updateCartItemCount?variation_id="+variation_id+"&id="+localStorage.getItem('id')+"&quantity="+cartProductCountValue;
    axiosQuery(urlExtension, function(response){
        const message = response.data.message;
        if(message){
            localStorage.setItem("showToast", message);
            fetchCartItems();
        }
    });
}

// When the user clicks on the header "Shopping Cart" in cart.html
function shoppingCart(){
    const orderHistory = getElementById('history');
    const cart = getElementById('cart');
    const shoppingCartHeader = getElementById('shoppingCartHeader');
    const historyHeader = getElementById('historyHeader');
    cart.style.display = "flex";
    orderHistory.style.display = "none";
    shoppingCartHeader.classList.remove('notSelected');
    shoppingCartHeader.classList.add('selected');
    historyHeader.classList.add('notSelected');
    historyHeader.classList.remove('selected');
    fetchCartItems();
}
// When the user clicks on the header "Order History" in cart.html
function orderHistory(){
    const orderHistory = getElementById('history');
    const cart = getElementById('cart');
    const shoppingCartHeader = getElementById('shoppingCartHeader');
    const historyHeader = getElementById('historyHeader');
    cart.style.display = "none";
    orderHistory.style.display = "flex";
    shoppingCartHeader.classList.add('notSelected');
    shoppingCartHeader.classList.remove('selected');
    historyHeader.classList.remove('notSelected');
    historyHeader.classList.add('selected');
    fetchOrderHistory();
}

function fetchOrderHistory() {
    axiosQuery("/orderHistory?id=" + localStorage.getItem('id'), function (results) {
        // Columns: (order_id, product (name), product_id variation, price, quantity, date, total_order_price, status, receipt)
        const history = results.data;
        const ordersList = [];
        if(history.message == "empty history"){
            const orderHistory = getElementById('history');
            orderHistory.innerHTML = "<h1 class='center'>You haven't ordered anything yets</h1>"
        }
        else{
            history.forEach(function (item) {
                // Check if the order_id already exists in the ordersList
                let existingOrder = ordersList.find(order => order.order_id === item.order_id);

                if (!existingOrder) {
                    // If not found (means we haven't pushed order information yet), create a new order then push it to ordersList
                    existingOrder = {
                        order_id: item.order_id,
                        date: item.date,
                        total_order_price: item.total_order_price,
                        status: item.status,
                        receipt: item.receipt,
                        items: [] // Array to store variations
                    };
                    ordersList.push(existingOrder);
                }

                // Add the current (variation) to the corresponding order
                existingOrder.items.push({
                    product: item.product,
                    product_id: item.product_id,
                    variation: item.variation,
                    price: item.price,
                    quantity: item.quantity
                });
            });

            // Convert the orders object back to an array for easier handling 
            //(values(): Returns an array of values of the enumerable properties of an object)
            const tableBody = getElementById('historyTableBody');
            tableBody.innerHTML = ""; // Clearing any existing rows
            
            // Now we can display orderList, which is an array of grouped orders
            // Loop through the orders to create table rows
            ordersList.forEach(function (order) {
                // Loop through each item in the order
                order.items.forEach(function (item, index) {
                    const row = document.createElement('tr');
                    //add a bottom border to the row if it's the last row of the order
                    if(index == (order.items.length-1)){
                        row.classList.add('bottom-border');
                    }

                    // Add product, variation, price, and quantity for each item (from order_details)
                    const productCell = document.createElement('td');
                    productCell.innerHTML = "<a class='productLinkInHistory' href='./product.html?product="+item.product_id+"'>"+item.product+"</a>";
                    row.appendChild(productCell);

                    const variationCell = document.createElement('td');
                    variationCell.textContent = item.variation;
                    row.appendChild(variationCell);

                    const priceCell = document.createElement('td');
                    priceCell.textContent = "RM"+formatNumber(parseFloat(item.price));
                    row.appendChild(priceCell);

                    const quantityCell = document.createElement('td');
                    quantityCell.textContent = item.quantity;
                    row.appendChild(quantityCell);
                    // Only include order details on the first row for each order
                    if (index === 0) {
                        const dateCell = document.createElement('td');
                        dateCell.rowSpan = order.items.length; // Span across multiple rows if there are multiple items in this order (from Orders Table)
                        var date = order.date.split("T")[0];  // date format as follows 2024-08-31TmeZ...etc we don't need the time here.
                        date = date.split("-");
                        date = date[2]+"/"+date[1]+"/"+date[0];
                        dateCell.textContent = date;
                        row.appendChild(dateCell);

                        const totalPriceCell = document.createElement('td');
                        totalPriceCell.rowSpan = order.items.length;
                        totalPriceCell.textContent = "RM"+formatNumber(parseFloat(order.total_order_price));
                        row.appendChild(totalPriceCell);

                        const statusCell = document.createElement('td');
                        statusCell.rowSpan = order.items.length;
                        statusCell.textContent = order.status;
                        if(order.status == "completed"){
                            statusCell.style.color = "green";
                        }
                        row.appendChild(statusCell);

                        const receiptCell = document.createElement('td');
                        receiptCell.rowSpan = order.items.length;
                        receiptCell.innerHTML ="<a href='"+order.receipt+"'>Download</a>" ;
                        row.appendChild(receiptCell);
                    }
                    // Append the row to the table body
                    tableBody.appendChild(row);
                });
            });
        }
    });
}
