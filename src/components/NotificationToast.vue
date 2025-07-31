<template>
  <Transition name="fade">
    <div v-if="notification.isVisible" class="notification-toast">
      {{ notification.message }}
    </div>
  </Transition>
</template>

<script setup>
import { notificationState } from '../services/notificationService.js';
import { computed } from 'vue';

// Usamos una propiedad computada para acceder más cómodamente al estado
const notification = computed(() => notificationState.value);
</script>

<style scoped>
.notification-toast {
  position: fixed;
  bottom: 30px; /* Ajusta la posición vertical */
  right: 30px; /* Ajusta la posición horizontal */
  background-color: #28a745; /* Color de éxito */
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 1.1em;
  font-weight: 500;
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
  display: flex;
  align-items: center;
  gap: 10px; /* Espacio si añades un ícono */
}

/* Animaciones de entrada/salida (Fade) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px); /* Viene desde abajo */
}

/* Media Queries para responsividad */
@media (max-width: 768px) {
  .notification-toast {
    bottom: 20px;
    right: 20px;
    left: 20px; /* En pantallas pequeñas, se estira a lo ancho */
    text-align: center;
    font-size: 1em;
  }
}

@media (max-width: 480px) {
  .notification-toast {
    bottom: 15px;
    right: 15px;
    left: 15px;
    padding: 12px 20px;
    font-size: 0.9em;
  }
}
</style>