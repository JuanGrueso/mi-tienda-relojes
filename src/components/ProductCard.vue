<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-price">${{ product.price }}</p>
    
    <div class="product-actions"> <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="btn-view-detail">
        Ver Detalles
      </router-link>

      <button @click="buyProduct(product)" class="btn-buy-now">
        Comprar
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  product: Object,
});

// Nueva función para manejar la compra del producto
const buyProduct = (productToBuy) => {
  // Aquí puedes agregar la lógica para añadir al carrito, redirigir a un checkout, etc.
  // Por ahora, solo mostraremos una alerta
  alert(`¡Producto "${productToBuy.name}" (ID: ${productToBuy.id}) añadido al "carrito"! (Lógica de compra pendiente)`);
  console.log('Comprar producto:', productToBuy.name);
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
  max-width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 4px;
  margin-bottom: 10px;
}

.product-name {
  font-size: 1.2em;
  margin-bottom: 5px;
  color: #333;
  flex-grow: 1;
}

.product-price {
  font-size: 1.1em;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 15px;
}

/* Nuevo contenedor para los botones para que estén en la misma línea */
.product-actions {
  display: flex; /* Convierte este contenedor en un flex container */
  justify-content: center; /* Centra los botones horizontalmente */
  gap: 10px; /* Espacio entre los botones */
  margin-top: 10px; /* Espacio superior si es necesario */
  flex-wrap: wrap; /* Permite que los botones se envuelvan en pantallas pequeñas */
}

/* Estilos existentes para el botón "Ver Detalles" (ahora como router-link) */
.btn-view-detail {
  background-color: #007bff;
  color: white;
  padding: 10px 15px; /* Ajustado el padding para que quepan ambos botones */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  display: inline-block; /* Crucial para que router-link se vea como botón y Flexbox lo maneje */
  text-decoration: none; /* Quita el subrayado predeterminado de los enlaces */
  flex-grow: 1; /* Permite que el botón crezca para ocupar espacio disponible */
  max-width: 150px; /* Limita el ancho máximo para evitar que se estiren demasiado */
}
.btn-view-detail:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

/* Nuevo estilo para el botón "Comprar" */
.btn-buy-now {
  background-color: #28a745; /* Un verde que indica acción de compra */
  color: white;
  padding: 10px 15px; /* Mismo padding para que coincida */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  flex-grow: 1;
  max-width: 150px;
}
.btn-buy-now:hover {
  background-color: #218838; /* Tono de verde más oscuro al pasar el ratón */
  transform: translateY(-2px);
}

/* Media query para asegurar que los botones se apilan en pantallas muy pequeñas */
@media (max-width: 480px) {
  .product-actions {
    flex-direction: column; /* Apila los botones verticalmente */
    gap: 8px; /* Espacio vertical entre los botones */
  }
  .btn-view-detail,
  .btn-buy-now {
    width: 100%; /* Hacen que cada botón ocupe todo el ancho disponible */
    max-width: none; /* Elimina la limitación de ancho */
  }
}
</style>