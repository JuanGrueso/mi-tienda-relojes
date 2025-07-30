<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @view-detail="showProductDetail"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductCard from './ProductCard.vue';
import { products } from '../data/products.js';

const showProductDetail = (productId) => {
  // Implementa la navegación con Vue Router aquí
  // Por ejemplo: router.push(`/product/${productId}`);
  console.log('Ver detalle del producto:', productId);
};
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  max-width: 1200px; /* Limita el ancho de la cuadrícula */
  margin: 0 auto; /* ¡Esto centra la cuadrícula entera! */
}

/* --- Media Queries para ProductList --- */
@media (max-width: 1024px) {
  .product-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: 15px;
  }
}

@media (max-width: 768px) {
  .product-list {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .product-list {
    padding: 5px;
  }
}
</style>