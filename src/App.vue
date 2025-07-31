<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <NotificationToast />
    <CartModal /> 
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import NotificationToast from './components/NotificationToast.vue';
import CartModal from './components/CartModal.vue'; // <-- Importa el nuevo componente de la modal
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
  /* Asegura que no haya scroll en el body cuando la modal esté abierta */
  overflow: overlay; /* Permite una barra de scroll más moderna en algunos navegadores */
}

/* Opcional: Para evitar que el contenido de fondo se mueva cuando aparece la modal */
body.modal-open {
  overflow: hidden;
}

/* Estilos para enlaces del router para evitar subrayado predeterminado */
a {
  text-decoration: none;
  color: inherit;
}
</style>