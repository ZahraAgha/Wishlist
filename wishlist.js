document.addEventListener("DOMContentLoaded", function () {
    const addToWishlistButtons = document.querySelectorAll(".add-to-wishlist");
    const wishlistItems = document.getElementById("wishlist-items");

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
