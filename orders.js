async function loadOrders() {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first!");

    const res = await fetch(`${API_URL}/api/orders`, {
        headers: { "Authorization": "Bearer " + token }
    });

    const orders = await res.json();
    const box = document.getElementById("orders-box");

    box.innerHTML = "";

    if (orders.length === 0) {
        box.innerHTML = "<h3>No orders found.</h3>";
        return;
    }

    orders.forEach(order => {
        box.innerHTML += `
            <div class="order">
                <h3>Order ID: ${order._id}</h3>
                <p><strong>Total Paid:</strong> ₹${order.total}</p>
                <p><strong>Items:</strong> ${order.items.length}</p>
                <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
                <hr>
            </div>
        `;
    });
}

loadOrders();
