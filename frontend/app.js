// 🚀 Using API_URL from config.js
console.log("API URL =", API_URL);

// LOAD ALL PRODUCTS
async function loadProducts() {
    const res = await fetch(`${API_URL}/api/products`);   // FIXED
    const products = await res.json();
    const container = document.getElementById("products");

    container.innerHTML = "";

    products.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <img onclick="location.href='product.html?id=${p._id}'" src="${p.image}">
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <button class="btn" onclick="addToCart('${p._id}')">Add to Cart</button>
            </div>
        `;
    });
}

// ADD TO CART
async function addToCart(id){
    const token = localStorage.getItem("token");

    if(!token){
        alert("Please login first!");
        return;
    }

    const res = await fetch(`${API_URL}/api/cart/add`, {   // FIXED
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token
        },
        body: JSON.stringify({ productId:id })
    });

    if(res.ok){
        alert("Added to cart!");
    } else {
        alert("Error adding to cart");
    }
}

loadProducts();

// SEARCH BAR FUNCTION
document.getElementById("search").addEventListener("keyup", function () {
    let text = this.value.toLowerCase();
    
    document.querySelectorAll(".product-card").forEach(card => {
        let name = card.querySelector("h3").innerText.toLowerCase();

        if (name.includes(text)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
