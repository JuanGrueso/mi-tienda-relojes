<template>
  <Transition name="fade">
    <div v-if="isOpen" class="cart-modal-overlay" @click.self="closeModal">
      <Transition name="slide-up">
        <div v-if="isOpen" class="cart-modal-content">
          <button @click="closeModal" class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="shopping-cart-modal-inner">
            <h2>Tu Carrito de Compras</h2>

            <p v-if="cartItems.length === 0" class="empty-cart-message">
              Tu carrito está vacío. ¡Explora nuestros relojes!
            </p>

            <div v-else class="cart-content-modal">
              <div class="cart-items-list-modal">
                <div v-for="item in cartItems" :key="item.product.id" class="cart-item-modal">
                  <img :src="item.product.image" :alt="item.product.name" class="cart-item-image-modal" />
                  <div class="cart-item-details-modal">
                    <h4 class="cart-item-name-modal">{{ item.product.name }}</h4>
                    <p class="cart-item-price-modal">${{ item.product.price.toFixed(2) }}</p>
                    <div class="cart-item-quantity-control-modal">
                      <button @click="updateCartItemQuantity(item.product.id, item.quantity - 1)" class="quantity-button-modal">-</button>
                      <input
                        type="number"
                        v-model.number="item.quantity"
                        @change="updateCartItemQuantity(item.product.id, item.quantity)"
                        min="1"
                        class="quantity-input-modal"
                      />
                      <button @click="updateCartItemQuantity(item.product.id, item.quantity + 1)" class="quantity-button-modal">+</button>
                    </div>
                  </div>
                  <button @click="removeFromCart(item.product.id)" class="remove-item-button-modal">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.5 4.478a.75.75 0 00-1.214-.882l-3.483 4.79-3.483-4.79a.75.75 0 00-1.214.882L10.379 9l-3.483 4.79a.75.75 0 001.214.882l3.483-4.79 3.483 4.79a.75.75 0 001.214-.882L13.621 9l3.483-4.79z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="cart-summary-modal">
                <h3>Resumen del Carrito</h3>
                <div class="summary-line-modal">
                  <span>Total ítems:</span>
                  <span>{{ cartTotalItems }}</span>
                </div>
                <div class="summary-line-modal total-price-modal">
                  <span>Total a pagar:</span>
                  <span>${{ cartTotalPrice }}</span>
                </div>
                <button class="checkout-button-modal" @click="proceedToCheckout">Proceder al Pago</button>
                <router-link to="/" class="continue-shopping-link-modal" @click="closeModal">Continuar Comprando</router-link>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
// Importa el estado y las funciones del carrito
import { cartState, removeFromCart, updateCartItemQuantity, cartTotalItems, cartTotalPrice } from '../services/cartService.js';
// Importa el servicio de la modal del carrito
import { cartModalState, closeCartModal } from '../services/cartModalService.js';
// Importa el servicio de notificaciones
import { showNotification } from '../services/notificationService.js';

const router = useRouter();

// Accede al estado del carrito y de la modal
const cartItems = cartState;
const isOpen = computed(() => cartModalState.value);

const closeModal = () => {
  closeCartModal();
};

const proceedToCheckout = () => {
  if (cartItems.value.length === 0) {
    showNotification('Tu carrito está vacío. ¡Añade algunos productos antes de proceder al pago!', 4000);
    return;
  }
  
  showNotification(`Simulando pago de $${cartTotalPrice.value}. ¡Gracias por tu compra!`, 5000);
  
  // Opcional: Vaciar el carrito después de una "compra" exitosa (para simulación)
  cartItems.value = []; 
  localStorage.removeItem('myStoreCart');

  closeModal(); // Cierra la modal después de la "compra"
  router.push('/'); // Redirige a la página de inicio o a una de confirmación
};
</script>

<style scoped>
/* Estilos para el overlay de la modal */
.cart-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Fondo semi-transparente oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Asegura que esté por encima de todo */
  backdrop-filter: blur(5px); /* Efecto de desenfoque */
}

/* Estilos para el contenido de la modal */
.cart-modal-content {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  padding: 30px;
  width: 90%; /* Ancho responsivo */
  max-width: 800px; /* Ancho máximo */
  max-height: 90vh; /* Altura máxima para permitir scroll si el contenido es mucho */
  overflow-y: auto; /* Permite scroll si el contenido excede la altura */
  position: relative;
  animation-duration: 0.3s;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.8em;
  color: #888;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-button:hover {
  color: #333;
  background-color: #f0f0f0;
  transform: rotate(90deg);
}

.close-button svg {
  width: 28px;
  height: 28px;
  stroke: currentColor;
}


.shopping-cart-modal-inner h2 {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
  font-size: 2em;
  font-weight: 700;
}

.empty-cart-message {
  text-align: center;
  font-size: 1.2em;
  color: #777;
  padding: 40px 0;
}

/* Contenido del carrito dentro de la modal */
.cart-content-modal {
  display: flex;
  gap: 25px;
  flex-wrap: wrap; /* Para que se apilen en móviles */
}

.cart-items-list-modal {
  flex: 2; /* Ocupa más espacio */
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item-modal {
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #fcfcfc;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.03);
}

.cart-item-image-modal {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.cart-item-details-modal {
  flex-grow: 1;
}

.cart-item-name-modal {
  font-size: 1.05em;
  color: #333;
  margin-bottom: 5px;
  font-weight: 600;
}

.cart-item-price-modal {
  font-size: 0.95em;
  color: #007bff;
  font-weight: 500;
  margin-bottom: 8px;
}

.cart-item-quantity-control-modal {
  display: flex;
  align-items: center;
  gap: 5px;
}

.quantity-button-modal {
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 5px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.quantity-button-modal:hover {
  background-color: #dee2e6;
}

.quantity-input-modal {
  width: 45px;
  text-align: center;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 3px 0;
  font-size: 0.95em;
  -moz-appearance: textfield; 
}

.quantity-input-modal::-webkit-outer-spin-button,
.quantity-input-modal::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.remove-item-button-modal {
  background: none;
  border: none;
  cursor: pointer;
  color: #dc3545; 
  padding: 6px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.remove-item-button-modal:hover {
  background-color: #f8d7da;
}

.remove-item-button-modal svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.cart-summary-modal {
  flex: 1; /* Ocupa menos espacio */
  background-color: #f1f7f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
  height: fit-content;
}

.cart-summary-modal h3 {
  font-size: 1.4em;
  color: #333;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.summary-line-modal {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.95em;
  color: #555;
}

.summary-line-modal.total-price-modal {
  font-size: 1.2em;
  font-weight: 700;
  color: #007bff;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #e0e0e0;
}

.checkout-button-modal {
  width: 100%;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.checkout-button-modal:hover {
  background-color: #218838;
  transform: translateY(-1px);
}

.continue-shopping-link-modal {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.continue-shopping-link-modal:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* Animaciones de la modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease-out;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

/* Media Queries para la modal */
@media (max-width: 768px) {
  .cart-modal-content {
    width: 95%;
    padding: 20px;
  }
  .close-button {
    font-size: 1.5em;
    top: 10px;
    right: 10px;
  }
  .close-button svg {
    width: 24px;
    height: 24px;
  }
  .shopping-cart-modal-inner h2 {
    font-size: 1.8em;
    margin-bottom: 15px;
  }
  .cart-content-modal {
    flex-direction: column;
    gap: 15px;
  }
  .cart-item-modal {
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
  }
  .cart-item-image-modal {
    width: 60px;
    height: 60px;
    margin-bottom: 5px;
  }
  .cart-item-details-modal {
    width: 100%;
  }
  .cart-item-name-modal {
    font-size: 1em;
  }
  .cart-item-price-modal {
    font-size: 0.9em;
  }
  .cart-item-quantity-control-modal {
    justify-content: center;
  }
  .remove-item-button-modal {
    margin-top: 10px;
  }
  .cart-summary-modal {
    padding: 15px;
  }
  .checkout-button-modal {
    padding: 10px;
    font-size: 0.95em;
  }
}
</style>