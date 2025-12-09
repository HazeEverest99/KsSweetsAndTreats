// Load existing cart or start a new one
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add an item to the cart
function addToCart(name, price) {
    // Check if already in cart
    let item = cart.find(i => i.name === name);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    showMessage(`Added ${qty} x ${name} to cart!`);
}

// Load cart (for order.html)
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-items");
    let total = 0;

    container.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <strong>${item.name}</strong><br>
                $${item.price} × 
                <button onclick="changeQuantity(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${index}, 1)">+</button>
                = $${item.price * item.quantity}
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("cart-total").innerText = "$" + total.toFixed(2);
}

// Change quantity
function changeQuantity(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Remove item entirely
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Clear cart
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}

function addToCartWithQty(name, price, inputId) {
    let qty = parseInt(document.getElementById(inputId).value);
    if (isNaN(qty) || qty <= 0) qty = 1;

    let item = cart.find(i => i.name === name);
    if (item) item.quantity += qty;
    else cart.push({name, price, quantity: qty});

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Added ${qty} x ${name} to cart!`);
}

function showMessage(msg) {
    const messageDiv = document.getElementById("cart-message");
    messageDiv.innerText = msg;
    setTimeout(() => { messageDiv.innerText = ""; }, 2000);
}


