<template>
  <div id="app">
    <Header />
    
    <main class="main-content">
      <router-view /> 
    </main>
    
    </div>
</template>

<script setup>
// Importa el componente Header para usarlo en App.vue
import Header from './components/Header.vue'; 

// Ya NO necesitas importar ProductList aquí directamente,
// porque Vue Router se encargará de mostrarlo en <router-view>
// según la ruta activa.
// import ProductList from './components/ProductList.vue'; 
</script>

<style>
/* Estilos globales para la aplicación */
/* Estos estilos afectan a todo el cuerpo de tu página y al contenedor principal de la app */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4; /* Fondo general de la página */
  color: #333; /* Color de texto general */
}

#app {
  display: flex;
  flex-direction: column; /* Organiza el Header y el main-content verticalmente */
  min-height: 100vh; /* Asegura que la aplicación ocupe al menos toda la altura de la ventana */
}

.main-content {
  flex-grow: 1; /* Permite que el contenido principal ocupe todo el espacio vertical restante */
  padding: 20px; /* Espaciado interno alrededor del contenido */
  max-width: 1200px; /* Limita el ancho del contenido para que no se vea demasiado estirado en pantallas grandes */
  margin: 20px auto; /* Centra el contenido principal horizontalmente */
}

/* El h1 de "¡Bienvenido a tu Tienda de Relojes!" que tenías antes */
/* fue eliminado de App.vue porque la idea es que el contenido de cada página */
/* (como la lista de productos) tenga sus propios títulos. */
/* Si quieres un título para la página de inicio, este iría dentro del componente ProductList o un componente Home dedicado. */
/* h1 {
  text-align: center;
  color: #333;
  margin-top: 50px;
  margin-bottom: 30px;
} */
</style>