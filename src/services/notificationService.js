// src/services/notificationService.js
import { ref } from 'vue';

const notification = ref({
  message: '',
  isVisible: false,
  timeoutId: null, // Para guardar el ID del temporizador y poder limpiarlo
});

/**
 * Muestra una notificación temporal.
 * @param {string} message - El mensaje a mostrar.
 * @param {number} duration - Duración en milisegundos (por defecto 3000ms = 3 segundos).
 */
export const showNotification = (message, duration = 3000) => {
  // Limpiar cualquier temporizador existente para evitar solapamientos
  if (notification.value.timeoutId) {
    clearTimeout(notification.value.timeoutId);
  }

  notification.value.message = message;
  notification.value.isVisible = true;

  // Establecer un nuevo temporizador para ocultar la notificación
  notification.value.timeoutId = setTimeout(() => {
    notification.value.isVisible = false;
    notification.value.message = ''; // Limpiar el mensaje después de ocultar
    notification.value.timeoutId = null; // Limpiar el ID
  }, duration);
};

// Exportamos el estado reactivo para que los componentes puedan observarlo
export const notificationState = notification;