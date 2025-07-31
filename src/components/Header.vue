<template>
  <header class="main-header">
    <nav class="main-nav">
      <router-link to="/" class="nav-logo">Mi Tienda de Relojes</router-link>
      <ul class="nav-links">
        <li><router-link to="/">Productos</router-link></li>
        <li><router-link to="/about">Sobre Nosotros</router-link></li>
        <li><router-link to="/contact">Contacto</router-link></li>
        <li>
          <button @click="openCartModal" class="cart-link-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cart-icon">
              <path fill-rule="evenodd" d="M7.5 6V5.25a2.25 2.25 0 012.25-2.25h4.5A2.25 2.25 0 0116.5 5.25V6H17.25a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18.75V8.25A2.25 2.25 0 016.75 6H7.5zM6 8.25V18.75a.75.75 0 00.75.75h10.5a.75.75 0 00.75-.75V8.25H6zm8.25-2.25V5.25a.75.75 0 00-.75-.75h-4.5a.75.75 0 00-.75.75V6h6z" clip-rule="evenodd" />
            </svg>
            Carrito ({{ cartTotalItems }})
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { cartTotalItems } from '../services/cartService.js';
import { openCartModal } from '../services/cartModalService.js'; // <-- Importa la función para abrir la modal
</script>

<style scoped>
/* Tus estilos existentes para el header van aquí */
.main-header {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 15px 0;
}

.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.nav-logo {
  font-weight: bold;
  font-size: 1.8em;
  color: #333;
  text-decoration: none;
  letter-spacing: -0.5px;
  transition: color 0.3s ease;
}

.nav-logo:hover {
  color: #007bff;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 30px;
}

.nav-links li a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  font-size: 1.1em;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links li a:hover {
  color: #007bff;
}

.nav-links li a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #007bff;
  transition: width 0.3s ease-out;
}

.nav-links li a:hover::after,
.nav-links li a.router-link-active::after {
  width: 100%;
}

.nav-links li a.router-link-active {
  color: #007bff;
}

/* Nuevo estilo para el botón del carrito */
.cart-link-button {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none; /* Elimina el fondo de botón por defecto */
  border: none; /* Elimina el borde de botón por defecto */
  color: #007bff; /* Color del texto y el ícono */
  font-weight: 600;
  font-size: 1.1em; /* Misma fuente que los enlaces de navegación */
  cursor: pointer;
  padding: 0; /* Elimina padding por defecto */
  transition: color 0.3s ease;
}

.cart-link-button:hover {
  color: #0056b3;
}

.cart-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

/* Media Queries para la navegación */
@media (max-width: 768px) {
  .main-nav {
    flex-direction: column;
    gap: 15px;
    padding: 0 15px;
  }

  .nav-links {
    flex-wrap: wrap; 
    justify-content: center;
    gap: 20px;
  }

  .nav-logo {
    font-size: 1.5em;
  }
}

@media (max-width: 480px) {
  .main-nav {
    padding: 0 10px;
  }
  .nav-logo {
    font-size: 1.3em;
  }
  .nav-links {
    gap: 15px;
    font-size: 0.9em;
  }
}
</style>