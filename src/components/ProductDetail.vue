<template>
  <div v-if="product" class="product-detail-page">
    <div class="product-detail-container">
      <img :src="product.image" :alt="product.name" class="detail-image" />
      <div class="product-info-detail">
        <h2 class="detail-name">{{ product.name }}</h2>
        <p class="detail-price">${{ product.price.toFixed(2) }}</p>
        <p class="detail-description">{{ product.description }}</p>
        
        <div class="detail-actions">
          <button @click="handleAddToCart(product)" class="add-to-cart-detail-button">
            Añadir al Carrito
          </button>
          <button @click="buyNow(product)" class="buy-now-detail-button">
            Comprar Ahora
          </button>
        </div>

        <router-link to="/" class="back-to-products">
          &larr; Volver a la Lista de Productos
        </router-link>
      </div>
    </div>
  </div>
  <div v-else class="loading-error-message">
    <p>Cargando detalles del producto o producto no encontrado...</p>
    <router-link to="/" class="back-to-products">
      Volver a la Lista de Productos
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // Ya no necesitamos 'inject' aquí
import { useRoute, useRouter } from 'vue-router';
import { products } from '../data/products.js'; // Importa tus productos
import { addToCart } from '../services/cartService.js'; // Importa addToCart del servicio

const route = useRoute(); 
const router = useRouter(); 

const product = ref(null);

onMounted(() => {
  const productId = parseInt(route.params.id); 
  product.value = products.find(p => p.id === productId); 

  if (!product.value) {
    console.error(`Producto con ID ${productId} no encontrado.`);
  }
});

// Cambiado para usar el addToCart del servicio
const handleAddToCart = (productToAdd) => {
  addToCart(productToAdd);
  alert(`"${productToAdd.name}" ha sido añadido al carrito.`);
};

const buyNow = (productToBuy) => {
  addToCart(productToBuy); // Lo añade al carrito
  alert(`Comprando "${productToBuy.name}" directamente. Redirigiendo al carrito...`);
  router.push('/cart'); // Redirige al carrito
};
</script>

<style scoped>
/* Tus estilos existentes para ProductDetail van aquí */
.product-detail-page {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-error-message {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2em;
  color: #777;
}

.product-detail-container {
  display: flex;
  gap: 40px;
  width: 100%;
  flex-wrap: wrap; 
  justify-content: center;
}

.detail-image {
  width: 100%;
  max-width: 400px; 
  height: auto;
  object-fit: contain; 
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  flex-shrink: 0; 
}

.product-info-detail {
  flex-grow: 1;
  min-width: 300px; 
}

.detail-name {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 15px;
  font-weight: 700;
  line-height: 1.2;
}

.detail-price {
  font-size: 1.8em;
  font-weight: 600;
  color: #007bff;
  margin-bottom: 20px;
}

.detail-description {
  font-size: 1.1em;
  line-height: 1.8;
  color: #555;
  margin-bottom: 30px;
}

.detail-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.add-to-cart-detail-button,
.buy-now-detail-button {
  padding: 15px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  flex: 1; 
}

.add-to-cart-detail-button {
  background-color: #007bff;
  color: white;
}

.add-to-cart-detail-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.buy-now-detail-button {
  background-color: #28a745; 
  color: white;
}

.buy-now-detail-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.back-to-products {
  display: inline-block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.back-to-products:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* Media Queries para ProductDetail */
@media (max-width: 768px) {
  .product-detail-page { margin: 20px; padding: 20px; }
  .product-detail-container { flex-direction: column; gap: 20px; }
  .detail-image { max-width: 100%; }
  .detail-name { font-size: 2em; text-align: center; }
  .detail-price { font-size: 1.5em; text-align: center; }
  .detail-description { font-size: 1em; }
  .detail-actions { flex-direction: column; gap: 10px; }
  .add-to-cart-detail-button, .buy-now-detail-button { padding: 12px 20px; font-size: 1em; }
  .back-to-products { text-align: center; width: 100%; }
}

@media (max-width: 480px) {
  .product-detail-page { padding: 15px; margin: 15px; }
  .detail-name { font-size: 1.8em; }
  .detail-price { font-size: 1.3em; }
  .detail-description { font-size: 0.9em; }
}
</style>