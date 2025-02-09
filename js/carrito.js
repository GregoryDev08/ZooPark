let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartEmptyMessage = document.getElementById('cart-empty');

// Función para abrir/cerrar el carrito
function toggleCart() {
    cartModal.classList.toggle('open');
    updateCartDisplay();
}

// Función para agregar un producto al carrito
function addToCart(product) {
    let existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartEmptyMessage.style.display = 'block';
        document.getElementById('checkout-button').style.display = 'none'; // Ocultar botón de compra
    } else {
        cartEmptyMessage.style.display = 'none';
        document.getElementById('checkout-button').style.display = 'block'; // Mostrar botón de compra
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <p><strong>Precio: $${item.price.toFixed(2)}</strong></p>
                    <p>Cantidad: ${item.quantity}</p>
                    <button onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        const totalElement = document.createElement('p');
        totalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
        cartItemsContainer.appendChild(totalElement);
    }
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Función para finalizar la compra
function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
        return;
    }

    // Mostrar confirmación de compra
    const confirmPurchase = confirm('¿Estás seguro de que deseas finalizar la compra?');
    if (confirmPurchase) {
        // Limpiar el carrito
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();

        // Redirigir a una página de agradecimiento o resumen de compra
        alert('¡Gracias por tu compra! Serás redirigido a la página de inicio.');
        window.location.href = 'index.html'; // Cambia 'index.html' por la página que desees
    }
}

// Inicializar el carrito al cargar la página
updateCartDisplay();
