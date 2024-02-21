document.addEventListener("DOMContentLoaded", function () {
    // ... (Your existing code)

    const addToWishlistButtons = document.querySelectorAll(".add-to-wishlist");
    const wishlistItems = document.getElementById("wishlist-items");
    const clearWishlistButton = document.getElementById("clear-wishlist");

    addToWishlistButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const product = {
                id: card.dataset.id,
                image: card.querySelector("img").src,
                title: card.querySelector("h3").innerText,
                price: parseFloat(card.querySelector("p").innerText.replace('$', '')),
            };

            addToWishlist(product);
            displayWishlist();
        });
    });

    clearWishlistButton.addEventListener("click", () => {
        clearWishlist();
        displayWishlist();
    });

    function addToWishlist(product) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    function displayWishlist() {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlistItems.innerHTML = '';

        wishlist.forEach((product) => {
            const wishlistProduct = document.createElement("div");
            wishlistProduct.innerHTML = `<div class="wishlistProduct" data-id="${product.id}">
                <img class="wishlistImage" src="${product.image}" alt="${product.title}">
                ${product.title} - Price: ${product.price.toFixed(2)}
                <i class="fa-solid fa-trash delete-wishlist-product"></i>
            </div>`;
            wishlistItems.appendChild(wishlistProduct);
        });

        const deleteWishlistProductButtons = document.querySelectorAll(".delete-wishlist-product");
        deleteWishlistProductButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const wishlistProduct = e.target.closest(".wishlistProduct");
                const productId = wishlistProduct.dataset.id;
                removeProductFromWishlist(productId);
            });
        });
    }

    function removeProductFromWishlist(productId) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist = wishlist.filter((product) => product.id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        displayWishlist();
    }

    displayWishlist();
});












document.addEventListener("DOMContentLoaded", function () {
    // Assuming you have "Add to Cart" buttons with class "add-to-cart"
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItems = document.getElementById("cart-items");
    const clearCartButton = document.getElementById("clear-cart");

    const addToWishlistButtons = document.querySelectorAll(".add-to-wishlist");
    const wishlistItems = document.getElementById("wishlist-items");
    const clearWishlistButton = document.getElementById("clear-wishlist");

    // Cart Functionality
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const product = {
                id: card.dataset.id,
                image: card.querySelector("img").src,
                title: card.querySelector("h3").innerText,
                price: parseFloat(card.querySelector("p").innerText.replace('$', '')),
            };

            addToCart(product);
            displayCart();
        });
    });

    clearCartButton.addEventListener("click", () => {
        clearCart();
        displayCart();
    });

    // Wishlist Functionality
    addToWishlistButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const product = {
                id: card.dataset.id,
                image: card.querySelector("img").src,
                title: card.querySelector("h3").innerText,
                price: parseFloat(card.querySelector("p").innerText.replace('$', '')),
            };

            addToWishlist(product);
            displayWishlist();
        });
    });

    clearWishlistButton.addEventListener("click", () => {
        clearWishlist();
        displayWishlist();
    });

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function displayCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems.innerHTML = '';

        cart.forEach((product) => {
            const cartProduct = document.createElement("div");
            cartProduct.innerHTML = `<div class="cartProduct" data-id="${product.id}">
                <img class="cartImage" src="${product.image}" alt="${product.title}">
                ${product.title} - Price: ${product.price.toFixed(2)}
                <i class="fa-solid fa-trash delete-cart-product"></i>
            </div>`;
            cartItems.appendChild(cartProduct);
        });

        attachDeleteEventsToCart();
    }

    function clearCart() {
        localStorage.removeItem("cart");
    }

    function addToWishlist(product) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        if (!wishlist.some(item => item.id === product.id)) {
            wishlist.push(product);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }
    }

    function displayWishlist() {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlistItems.innerHTML = '';

        wishlist.forEach((product) => {
            const wishlistProduct = document.createElement("div");
            wishlistProduct.innerHTML = `<div class="wishlistProduct" data-id="${product.id}">
                <img class="wishlistImage" src="${product.image}" alt="${product.title}">
                ${product.title} - Price: ${product.price.toFixed(2)}
                <i class="fa-solid fa-trash delete-wishlist-product"></i>
            </div>`;
            wishlistItems.appendChild(wishlistProduct);
        });

        attachDeleteEventsToWishlist();
    }

    function clearWishlist() {
        localStorage.removeItem("wishlist");
    }

    function attachDeleteEventsToCart() {
        const deleteCartProductButtons = document.querySelectorAll(".delete-cart-product");
        deleteCartProductButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const cartProduct = e.target.closest(".cartProduct");
                removeProductFromCart(cartProduct.dataset.id);
            });
        });
    }

    function removeProductFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter((product) => product.id !== productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    function attachDeleteEventsToWishlist() {
        const deleteWishlistProductButtons = document.querySelectorAll(".delete-wishlist-product");
        deleteWishlistProductButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const wishlistProduct = e.target.closest(".wishlistProduct");
                removeProductFromWishlist(wishlistProduct.dataset.id);
            });
        });
    }

    function removeProductFromWishlist(productId) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist = wishlist.filter((product) => product.id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        displayWishlist();
    }

    // Initial display of cart and wishlist items
    displayCart();
    displayWishlist();
});


