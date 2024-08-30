var maxAvailableQuantity = 0;
window.onload = function() {
    fetchCartItems();
};

function fetchCartItems(){
    // Show a message if the view reloaded and there's a message. then remove it.
    if(localStorage.getItem("showToast")){
        showToast(localStorage.getItem("showToast"));
        localStorage.removeItem("showToast");
    }
    const userId = localStorage.getItem('id');
    axios.get(domain+"/fetchCartItems?id=" + userId)
        .then(function(response) {
            const cartItems = response.data;
            /* 
                columns: (user_id, variation_id, total_variation_quantity, product_id, variation_name, variation_price, variation_stock, name, image);
            */
            const cart = getElementById('cart');
             // clearing children of the div before filling it
             cart.replaceChildren();
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
                infoDiv.innerHTML = `
                <h3 title="View product"><a href="./product.html?product=${item.product_id}">${item.product_name}</a></h3>
                <div class="variation-quantity-price">
                    <p>Variation: ${item.variation_name}</p>
                    <p>${item.variation_stock} pieces available</p>
                    <p>Price: RM${item.variation_price}</p>
                    <div class="cartProductCountDiv">
                        <button id="${cartLeftProductCountButtonId}" class="cartLeftProductCountButton" title="Decrease quantity">-</button>
                        <input type="number" value="${item.total_variation_quantity}" id="${cartProductCountInputId}" class="cartProductCount">
                        <button id="${cartRightProductCountButtonId}" class="cartRightProductCountButton" title="Increase quantity">+</button>
                    </div>
                </div>`;
                cartItemDiv.appendChild(infoDiv);

                // Total (Per item) Price + Checkboxes
                const totalItemPrice = parseFloat(item.variation_price) * parseInt(item.total_variation_quantity);
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
                     changeProductCount(1, cartProductCountInputId, item.variation_stock);
                     const cartProductCountValue = cartProductCount.value;
                     preUpdateCartItemCount(item.variation_id, item.variation_stock, cartProductCountValue)
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
        })
        .catch(function(error){
            console.error('Error fetching cart items:', error);
        });
}
function placeOrder(){
    const finalTotalItemsCount = getElementById('finalTotalItemsCount');
    const finalOrderPrice = getElementById('finalOrderPrice');
    const cartCheckboxes = document.getElementsByClassName('cartCheckbox');
    var variation_prices = [];
    var variation_ids = [];
    for (let i = 0; i < cartCheckboxes.length; i++) {
        // check if the checkbox is checked before pushing the information to the array.
        if(cartCheckboxes[i].checked){
        variation_prices.push(parseFloat(cartCheckboxes[i].value));
        // id looks something like this: checkbox-44 where the 44 is the variation_id in the database.
        variation_ids.push(cartCheckboxes[i].id.split('-')[1]);
        console.log("Price: ",parseFloat(cartCheckboxes[i].value));
        console.log("ID: ", cartCheckboxes[i].id.split('-')[1]);
        }
        
    }
}
function checkAll(cartCheckboxes, state){
    for(let i=0; i<cartCheckboxes.length; i++){
        cartCheckboxes[i].checked = state;
        if(state){
            addToTotal(parseFloat(cartCheckboxes[i].value), state);
        }else{
            addToTotal(-parseFloat(cartCheckboxes[i].value), state);
        }
        
    }
}
var totalCartRM = 0;
var totalSelectedItemsCount = 0;

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
function preUpdateCartItemCount(variation_id, variation_stock, cartProductCountValue){
    //do not allow values less than 0 when the user changes this field's value manually, also do not allow values higher than the item.total_variation_quantity
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
function formatNumber(num) {
    // Ensure the number has two decimal points
    let formattedNumber = num.toFixed(2);
    /* 
        Add thousands separators
        \B matches a position that is not a word boundary
        (?=(\d{3})+(?!\d)) is a positive lookahead to find positions followed by groups of three digits.
        /g ensures that every 3 numbers, there's a separator.
    */
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedNumber;
}
