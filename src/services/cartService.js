// src/services/cartService.js
import { ref, computed } from 'vue';

// Inicializa el carrito desde localStorage o como un array vacío
// Usamos JSON.parse para convertir la cadena guardada de vuelta a un array de objetos
// y JSON.stringify para convertir el array de objetos a una cadena para guardar.
const cartItems = ref(JSON.parse(localStorage.getItem('myStoreCart')) || []);

// Función privada para guardar el carrito en localStorage
const saveCart = () => {
  localStorage.setItem('myStoreCart', JSON.stringify(cartItems.value));
};

// Función para añadir un producto al carrito
export const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.value.push({ product, quantity: 1 });
  }
  saveCart(); // Guarda el carrito cada vez que se modifica
  console.log('Producto añadido al carrito:', product.name, 'Cantidad:', existingItem ? existingItem.quantity : 1);
};

// Función para eliminar un producto del carrito
export const removeFromCart = (productId) => {
  cartItems.value = cartItems.value.filter(item => item.product.id !== productId);
  saveCart();
  console.log('Producto eliminado del carrito, ID:', productId);
};

// Función para actualizar la cantidad de un producto
export const updateCartItemQuantity = (productId, newQuantity) => {
  const item = cartItems.value.find(item => item.product.id === productId);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId); // Si la cantidad es 0 o menos, lo eliminamos
    } else {
      item.quantity = newQuantity;
      saveCart();
      console.log('Cantidad actualizada para ID:', productId, 'Nueva cantidad:', newQuantity);
    }
  }
};

// Propiedad computada para obtener el número total de ítems en el carrito
export const cartTotalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

// Propiedad computada para obtener el precio total del carrito
export const cartTotalPrice = computed(() => {
  const total = cartItems.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  return total.toFixed(2); // Formatea a dos decimales
});

// Exporta el estado del carrito directamente para que los componentes puedan observarlo
export const cartState = cartItems;