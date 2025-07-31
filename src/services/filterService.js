// src/services/filterService.js
import { ref, computed } from 'vue';
import { products as allProducts } from '../data/products.js'; // Importa todos los productos

// Estado de la modal del filtro
const isFilterModalOpen = ref(false);

// Criterios de filtro
const selectedCategory = ref(''); // Categoría seleccionada (ej. 'Deportivo', 'Casual')
const selectedBrand = ref('');    // Marca seleccionada (ej. 'CityZen', 'AeroSport')
const searchQuery = ref('');      // Término de búsqueda por nombre/descripción

// Funciones para abrir y cerrar la modal
export const openFilterModal = () => {
  isFilterModalOpen.value = true;
  // Opcional: Asegurarse de que el scroll del body se bloquee
  document.body.classList.add('modal-open'); 
};

export const closeFilterModal = () => {
  isFilterModalOpen.value = false;
  // Opcional: Permitir el scroll de nuevo
  document.body.classList.remove('modal-open');
};

// Funciones para actualizar los criterios de filtro
export const setCategoryFilter = (category) => {
  selectedCategory.value = category;
};

export const setBrandFilter = (brand) => {
  selectedBrand.value = brand;
};

export const setSearchQuery = (query) => {
  searchQuery.value = query;
};

// Función para limpiar todos los filtros
export const clearAllFilters = () => {
  selectedCategory.value = '';
  selectedBrand.value = '';
  searchQuery.value = '';
};

// Función computada para obtener las opciones únicas de categorías y marcas
export const availableCategories = computed(() => {
  const categories = new Set();
  allProducts.forEach(product => {
    if (product.category) categories.add(product.category);
  });
  return ['', ...Array.from(categories).sort()]; // Añade una opción vacía y ordena
});

export const availableBrands = computed(() => {
  const brands = new Set();
  allProducts.forEach(product => {
    if (product.brand) brands.add(product.brand);
  });
  return ['', ...Array.from(brands).sort()]; // Añade una opción vacía y ordena
});


// Estado reactivo para que los componentes puedan observar
export const filterState = {
  isModalOpen: isFilterModalOpen,
  selectedCategory,
  selectedBrand,
  searchQuery,
  availableCategories,
  availableBrands,
};

// Propiedad computada para los productos filtrados
// Esta lógica se moverá a ProductList, pero la mantengo aquí como referencia
/*
export const filteredProducts = computed(() => {
  return allProducts.filter(product => {
    const matchesCategory = selectedCategory.value ? product.category === selectedCategory.value : true;
    const matchesBrand = selectedBrand.value ? product.brand === selectedBrand.value : true;
    const matchesSearch = searchQuery.value ? 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase()) : 
      true;
    
    return matchesCategory && matchesBrand && matchesSearch;
  });
});
*/