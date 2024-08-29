window.onload = function() {
    const userId = localStorage.getItem('id');
    axios.get(domain+"/fetchCartItems?id=" + userId)
        .then(response => {
            const cartItems = response.data;
            /* 
                columns: (user_id, variation_id, total_variation_quantity, product_id, variation_name, variation_price, variation_stock, name, image);
            */
            const cart = document.getElementById('cart');

            cartItems.forEach(item => {
                // cart item container
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');

                // Product Image
                const img = document.createElement('img');
                img.src = item.image;
                cartItemDiv.appendChild(img);

                // Product and Variation Info
                const infoDiv = document.createElement('div');
                infoDiv.classList.add('cart-item-info');
                infoDiv.innerHTML = `
                <h3><a href="./product.html?product=${item.product_id}">${item.product_name}</a></h3>
                <div class="variation-quantity-price">
                    <p>Variation: ${item.variation_name}</p>
                    <p>${item.variation_stock} pieces available</p>
                    <p>Price: RM${item.variation_price}</p>
                    <div class="cartProductCountDiv">
                        <button id="cartLeftProductCountButton">-</button>
                        <input type="number" value="${item.total_variation_quantity}" id="cartProductCount">
                        <button id="cartRightProductCountButton">+</button>
                    </div>
                </div>`;
                cartItemDiv.appendChild(infoDiv);

                // Quantity + Total Price
                const priceDiv = document.createElement('div');
                priceDiv.classList.add('cart-item-price');
                priceDiv.innerHTML = `<p>Total: RM${parseFloat(item.variation_price) * parseFloat(item.total_variation_quantity)}</p>`;
                cartItemDiv.appendChild(priceDiv);

                // Append cart item to cart
                cart.appendChild(cartItemDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching cart items:', error);
        });
};
