<template>
  <div class="product-list-page">
    <div class="header-with-filter">
      <h2>Nuestros Relojes</h2>
      <button @click="openFilterModal" class="filter-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18H7.5m3-6h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 10-3 0M3.75 12H7.5" />
        </svg>
        Filtro
      </button>
    </div>

    <p v-if="loading" class="loading-message">Cargando relojes...</p>
    <p v-if="error" class="error-message">Error al cargar los relojes: {{ error.message }}</p>
    
    <div v-if="filteredProducts.length > 0" class="product-grid">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id" 
        :product="product"
      />
    </div>
    <p v-else-if="!loading" class="empty-list-message">
      No se encontraron relojes con los filtros aplicados.
      <button @click="clearAllFilters" class="reset-filters-button">Borrar filtros</button>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductCard from './ProductCard.vue';
import { products as allProducts } from '../data/products.js'; // Importa tus productos locales
import { openFilterModal, filterState, clearAllFilters } from '../services/filterService.js'; // Importa el servicio de filtro

const products = ref([]);
const loading = ref(true); 
const error = ref(null); 

onMounted(() => {
  // Simula una carga asíncrona para que el loading se vea
  setTimeout(() => {
    products.value = allProducts; // Carga todos los productos
    loading.value = false;
    console.log('Productos cargados desde archivo local:', products.value);
  }, 500); 
});

// Propiedad computada para aplicar los filtros
const filteredProducts = computed(() => {
  let currentProducts = products.value;

  // Filtrar por búsqueda de texto
  if (filterState.searchQuery.value) {
    const query = filterState.searchQuery.value.toLowerCase();
    currentProducts = currentProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }

  // Filtrar por categoría
  if (filterState.selectedCategory.value) {
    currentProducts = currentProducts.filter(product => 
      product.category === filterState.selectedCategory.value
    );
  }

  // Filtrar por marca
  if (filterState.selectedBrand.value) {
    currentProducts = currentProducts.filter(product => 
      product.brand === filterState.selectedBrand.value
    );
  }

  return currentProducts;
});
</script>

<style scoped>
/* Tus estilos existentes para ProductList */
.product-list-page {
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.header-with-filter {
  display: flex;
  justify-content: space-between; /* Alinea el título y el botón */
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 15px;
}

h2 {
  color: #333;
  font-size: 2.5em;
  font-weight: 700;
  margin: 0; /* Eliminar margen del h2 para control con el contenedor */
}

.filter-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.filter-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.filter-button svg {
  width: 22px;
  height: 22px;
  stroke: currentColor;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Responsive grid */
  gap: 30px;
  justify-content: center;
}

.loading-message, .error-message, .empty-list-message {
  text-align: center;
  font-size: 1.2em;
  color: #777;
  padding: 50px 0;
}

.error-message {
  color: #dc3545;
}

.reset-filters-button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.reset-filters-button:hover {
  background-color: #c82333;
}

/* Media Queries para ProductList */
@media (max-width: 768px) {
  .product-list-page {
    margin: 20px;
    padding: 20px;
  }
  .header-with-filter {
    flex-direction: column; /* Apila el título y el botón en móviles */
    align-items: center;
    gap: 15px;
  }
  h2 {
    font-size: 2em;
    margin-bottom: 0;
  }
  .filter-button {
    width: 100%; /* El botón ocupa todo el ancho */
    justify-content: center;
    padding: 12px 20px;
  }
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .product-list-page {
    padding: 15px;
    margin: 15px;
  }
  h2 {
    font-size: 1.8em;
  }
  .product-grid {
    grid-template-columns: minmax(200px, 1fr); /* Single column on very small screens */
    gap: 15px;
  }
}
</style>