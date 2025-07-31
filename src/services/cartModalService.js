// src/services/cartModalService.js
import { ref } from 'vue';

const isCartModalOpen = ref(false);

export const openCartModal = () => {
  isCartModalOpen.value = true;
};

export const closeCartModal = () => {
  isCartModalOpen.value = false;
};

export const cartModalState = isCartModalOpen;