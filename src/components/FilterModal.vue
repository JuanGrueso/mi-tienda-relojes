<template>
  <Transition name="fade">
    <div v-if="filterState.isModalOpen.value" class="filter-modal-overlay" @click.self="closeModal">
      <Transition name="slide-right">
        <div v-if="filterState.isModalOpen.value" class="filter-modal-content">
          <button @click="closeModal" class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="filter-modal-inner">
            <h3>Filtrar Productos</h3>

            <div class="filter-group">
              <label for="searchQuery">Buscar:</label>
              <input 
                type="text" 
                id="searchQuery" 
                v-model="searchQueryModel" 
                placeholder="Nombre o descripción"
                class="filter-input"
              >
            </div>

            <div class="filter-group">
              <label for="categoryFilter">Categoría:</label>
              <select id="categoryFilter" v-model="categoryFilterModel" class="filter-select">
                <option value="">Todas</option>
                <option v-for="category in filterState.availableCategories.value" :key="category" :value="category">{{ category || 'Sin Categoría' }}</option>
              </select>
            </div>

            <div class="filter-group">
              <label for="brandFilter">Marca:</label>
              <select id="brandFilter" v-model="brandFilterModel" class="filter-select">
                <option value="">Todas</option>
                <option v-for="brand in filterState.availableBrands.value" :key="brand" :value="brand">{{ brand || 'Sin Marca' }}</option>
              </select>
            </div>

            <div class="filter-actions">
              <button @click="applyFilters" class="apply-filters-button">Aplicar Filtros</button>
              <button @click="clearAndClose" class="clear-filters-button">Limpiar Filtros</button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { filterState, closeFilterModal, setCategoryFilter, setBrandFilter, setSearchQuery, clearAllFilters } from '../services/filterService.js';

// Usamos propiedades computadas con getter/setter para bindeo bidireccional
// Esto permite que v-model funcione directamente con el estado del servicio
const categoryFilterModel = computed({
  get: () => filterState.selectedCategory.value,
  set: (value) => setCategoryFilter(value)
});

const brandFilterModel = computed({
  get: () => filterState.selectedBrand.value,
  set: (value) => setBrandFilter(value)
});

const searchQueryModel = computed({
  get: () => filterState.searchQuery.value,
  set: (value) => setSearchQuery(value)
});

const closeModal = () => {
  closeFilterModal();
};

const applyFilters = () => {
  // Los filtros ya se aplican automáticamente en ProductList.vue
  // cada vez que los modelos cambian.
  // Aquí solo cerramos la modal.
  closeModal();
};

const clearAndClose = () => {
  clearAllFilters(); // Limpia los filtros
  closeModal();      // Cierra la modal
};
</script>

<style scoped>
/* Overlay oscuro de fondo */
.filter-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end; /* Alinea el contenido a la derecha */
  align-items: flex-start; /* Alinea el contenido arriba */
  z-index: 1100; /* Asegura que esté por encima de la modal del carrito si está abierta */
  backdrop-filter: blur(3px);
}

/* Contenido de la modal (drawer lateral derecho) */
.filter-modal-content {
  background-color: #ffffff;
  width: 350px; /* Ancho del drawer */
  max-width: 90%; /* Máximo ancho en pantallas pequeñas */
  height: 100%; /* Ocupa toda la altura */
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.15); /* Sombra hacia la izquierda */
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 15px;
  left: 15px; /* Botón de cerrar a la izquierda para un drawer derecho */
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
  transform: rotate(-90deg); /* Animación de rotación inversa */
}

.close-button svg {
  width: 28px;
  height: 28px;
  stroke: currentColor;
}

.filter-modal-inner {
  flex-grow: 1;
}

.filter-modal-inner h3 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.filter-group {
  margin-bottom: 25px;
}

.filter-group label {
  display: block;
  font-weight: 600;
  color: #555;
  margin-bottom: 10px;
  font-size: 1.05em;
}

.filter-input,
.filter-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  box-sizing: border-box; /* Incluye padding en el ancho */
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  appearance: none; /* Oculta flecha por defecto en select */
  background-color: #f8f8f8;
}

.filter-input:focus,
.filter-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  outline: none;
  background-color: #ffffff;
}

.filter-select {
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23495057%22%20d%3D%22M287%2C197.3L159.1%2C69.4c-3.1-3.1-8.2-3.1-11.3,0L5.4,197.3c-3.1,3.1-3.1,8.2,0,11.3s8.2,3.1,11.3,0L145.7,85.2c3.1-3.1,8.2-3.1,11.3,0L275.7,208.6c3.1,3.1,8.2,3.1,11.3,0C290.1,205.5,290.1,200.4,287,197.3z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  padding-right: 30px; /* Espacio para la flecha SVG */
}


.filter-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}

.apply-filters-button,
.clear-filters-button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  width: 100%;
}

.apply-filters-button {
  background-color: #007bff;
  color: white;
}

.apply-filters-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.clear-filters-button {
  background-color: #6c757d;
  color: white;
}

.clear-filters-button:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}

/* Animaciones de entrada/salida */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.3s ease-out;
}
.slide-right-enter-from, .slide-right-leave-to {
  transform: translateX(100%); /* Viene desde la derecha */
}

/* Media Queries para responsividad */
@media (max-width: 480px) {
  .filter-modal-content {
    width: 100%; /* Ocupa todo el ancho en móviles */
    max-width: none;
    padding: 20px;
  }
  .close-button {
    top: 10px;
    left: 10px;
  }
  .filter-modal-inner h3 {
    font-size: 1.6em;
    margin-bottom: 20px;
  }
}
</style>