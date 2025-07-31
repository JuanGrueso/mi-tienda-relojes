<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <NotificationToast />
    <CartModal /> 
    <FilterModal /> 
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import NotificationToast from './components/NotificationToast.vue';
import CartModal from './components/CartModal.vue';
import FilterModal from './components/FilterModal.vue'; // <-- Importa el nuevo componente de la modal de filtro
</script>

<style>
/* Estilos globales (si los tienes) */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1; /* Esto hace que el contenido principal ocupe el espacio restante */
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;
  width: 100%;
  box-sizing: border-box; /* Incluye padding en el ancho */
}

/* Estilos básicos para el body */
body {
  margin: 0;
  background-color: #f8f9fa;
  overflow-x: hidden; /* Evita scroll horizontal por si la modal lo causa */
}

/* Clase para controlar el scroll del body cuando una modal está abierta */
body.modal-open {
  overflow: hidden; /* Oculta la barra de desplazamiento y bloquea el scroll */
}

/* Estilos para enlaces del router para evitar subrayado predeterminado */
a {
  text-decoration: none;
  color: inherit;
}
</style>