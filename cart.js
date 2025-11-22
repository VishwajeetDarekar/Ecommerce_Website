async function loadCart() {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first!");

    const res = await fetch(`${API_URL}/cart`, {
        headers: { "Authorization": "Bearer " + token }
    });

    const cart = await res.json();
    const cartBox = document.getElementById("cart-container");

    let totalPrice = 0;
    cartBox.innerHTML = "";

    cart.forEach(item => {
        const price = item.product.price * item.qty;
        totalPrice += price;

        cartBox.innerHTML += `
            <div class="cart-item">
                <img src="${item.product.image}">
                <div>
                    <h3>${item.product.name}</h3>
                    <p>₹${item.product.price} x ${item.qty}</p>

                    <button onclick="removeItem('${item.product._id}')">Remove</button>
                </div>
            </div>
        `;
    });

    document.getElementById("total-price").innerText = totalPrice;
    document.getElementById("items-count").innerText = cart.length;
}

async function removeItem(id){
    const token = localStorage.getItem("token");

    await fetch(`${BACKEND_URL}/api/cart/remove`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ productId: id })
    });

    loadCart();
}

document.getElementById("checkout-btn").addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BACKEND_URL}/orders/place`, {
        method: "POST",
        headers: { "Authorization": "Bearer " + token }
    });

    if (res.ok) {
        alert("Order placed successfully!");
        window.location.href = "orders.html";
    } else {
        alert("Order failed.");
    }
});

loadCart();
