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
                <h3>${item.product_name}</h3>
                <div class="variation-quantity-price">
                    <p>Variation: ${item.variation_name}</p>
                     <button id="cartLeftProductCountButton"">-</button>
                    <input type="number" value="${item.total_variation_quantity}" id="cartProductCount">
                     <button id="cartRightProductCountButton">+</button>
                    <p>Price: RM${item.variation_price}</p>
                </div>`;
                cartItemDiv.appendChild(infoDiv);

                // Quantity and Stock
                const span = document.createElement('span');
                span.innerHTML = item.variation_stock + " pieces available";
                cartItemDiv.appendChild(span);

                // Price
                const priceDiv = document.createElement('div');
                priceDiv.classList.add('cart-item-price');
                priceDiv.textContent = `RM${item.variation_price}`;
                cartItemDiv.appendChild(priceDiv);

                // Append cart item to cart
                cart.appendChild(cartItemDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching cart items:', error);
        });
};
