<template>
  <div class="shopping-cart">
    <h2>Tu Carrito de Compras</h2>

    <p v-if="cartItems.length === 0" class="empty-cart-message">
      Tu carrito está vacío. ¡Explora nuestros relojes y añade algunos!
      <router-link to="/" class="continue-shopping-link">Ir a la tienda</router-link>
    </p>

    <div v-else class="cart-content">
      <div class="cart-items-list">
        <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
          <img :src="item.product.image" :alt="item.product.name" class="cart-item-image" />
          <div class="cart-item-details">
            <h4 class="cart-item-name">{{ item.product.name }}</h4>
            <p class="cart-item-price">${{ item.product.price.toFixed(2) }}</p>
            <div class="cart-item-quantity-control">
              <button @click="updateCartItemQuantity(item.product.id, item.quantity - 1)" class="quantity-button">-</button>
              <input
                type="number"
                v-model.number="item.quantity"
                @change="updateCartItemQuantity(item.product.id, item.quantity)"
                min="1"
                class="quantity-input"
              />
              <button @click="updateCartItemQuantity(item.product.id, item.quantity + 1)" class="quantity-button">+</button>
            </div>
          </div>
          <button @click="removeFromCart(item.product.id)" class="remove-item-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M16.5 4.478a.75.75 0 00-1.214-.882l-3.483 4.79-3.483-4.79a.75.75 0 00-1.214.882L10.379 9l-3.483 4.79a.75.75 0 001.214.882l3.483-4.79 3.483 4.79a.75.75 0 001.214-.882L13.621 9l3.483-4.79z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <h3>Resumen del Carrito</h3>
        <div class="summary-line">
          <span>Total ítems:</span>
          <span>{{ cartTotalItems }}</span>
        </div>
        <div class="summary-line total-price">
          <span>Total a pagar:</span>
          <span>${{ cartTotalPrice }}</span>
        </div>
        <button class="checkout-button" @click="proceedToCheckout">Proceder al Pago</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; 
// Importamos directamente las funcionalidades y el estado del carrito
import { cartState, removeFromCart, updateCartItemQuantity, cartTotalItems, cartTotalPrice } from '../services/cartService.js';

const router = useRouter(); 

// Asignamos el estado del carrito a una variable local para usar en el template
const cartItems = cartState;

// Función para manejar el clic en "Proceder al Pago"
const proceedToCheckout = () => {
  if (cartItems.value.length === 0) {
    alert('Tu carrito está vacío. ¡Añade algunos productos antes de proceder al pago!');
    return;
  }
  
  alert(`Simulando pago de $${cartTotalPrice.value}. ¡Gracias por tu compra!`);
  
  // Opcional: Vaciar el carrito después de una "compra" exitosa (para simulación)
  // cartItems.value = []; 
  // localStorage.removeItem('myStoreCart'); // Asegúrate de vaciar el localStorage también si vacías cartItems.value

  // Opcional: Redirigir a una página de confirmación o a la página de inicio
  // router.push('/order-confirmation'); 
};
</script>

<style scoped>
/* Tus estilos existentes para ShoppingCart van aquí */
.shopping-cart {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2em;
  font-weight: 700;
}

.empty-cart-message {
  text-align: center;
  font-size: 1.2em;
  color: #777;
  padding: 50px 0;
}

.continue-shopping-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
  margin-top: 10px;
  display: inline-block;
  transition: color 0.3s ease;
}

.continue-shopping-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

.cart-content {
  display: flex;
  gap: 30px;
}

.cart-items-list {
  flex: 2; 
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.cart-item-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-name {
  font-size: 1.1em;
  color: #333;
  margin-bottom: 5px;
  font-weight: 600;
}

.cart-item-price {
  font-size: 1em;
  color: #007bff;
  font-weight: 500;
  margin-bottom: 10px;
}

.cart-item-quantity-control {
  display: flex;
  align-items: center;
  gap: 5px;
}

.quantity-button {
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.quantity-button:hover {
  background-color: #dee2e6;
}

.quantity-input {
  width: 50px;
  text-align: center;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 5px 0;
  font-size: 1em;
  color: #333;
  -moz-appearance: textfield; 
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


.remove-item-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #dc3545; 
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.remove-item-button:hover {
  background-color: #f8d7da;
}

.remove-item-button svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.cart-summary {
  flex: 1; 
  background-color: #f1f7f9; 
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: fit-content; 
}

.cart-summary h3 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1em;
  color: #555;
}

.summary-line.total-price {
  font-size: 1.3em;
  font-weight: 700;
  color: #007bff;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #e0e0e0;
}

.checkout-button {
  width: 100%;
  background-color: #28a745; 
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  margin-top: 25px;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.checkout-button:hover {
  background-color: #218838;
  transform: translateY(-1px);
}

/* Media Queries para el carrito */
@media (max-width: 768px) {
  .shopping-cart { margin: 20px; padding: 20px; }
  .cart-content { flex-direction: column; }
  .cart-item { flex-wrap: wrap; justify-content: center; text-align: center; padding: 12px; }
  .cart-item-image { width: 70px; height: 70px; margin-bottom: 10px; }
  .cart-item-details { width: 100%; text-align: center; }
  .cart-item-quantity-control { justify-content: center; margin-top: 10px; }
  .remove-item-button { margin-top: 10px; width: 100%; }
  .cart-summary { padding: 20px; }
}

@media (max-width: 480px) {
  h2 { font-size: 1.6em; margin-bottom: 20px; }
  .shopping-cart { padding: 15px; }
  .cart-item-name { font-size: 1em; }
  .cart-item-price { font-size: 0.9em; }
  .quantity-button { width: 25px; height: 25px; font-size: 1em; }
  .quantity-input { width: 40px; padding: 3px 0; }
  .remove-item-button { padding: 5px; }
  .remove-item-button svg { width: 18px; height: 18px; }
  .checkout-button { padding: 12px; font-size: 1em; }
}
</style>