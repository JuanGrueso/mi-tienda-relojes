// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue'; 
// import ShoppingCart from '../components/ShoppingCart.vue'; // <-- Comenta o elimina esta importación
import AboutPage from '../components/AboutPage.vue'; 
import ContactPage from '../components/ContactPage.vue'; 
import ProductDetail from '../components/ProductDetail.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductList, 
  },
  {
    path: '/products/:id', 
    name: 'ProductDetail',
    component: ProductDetail,
    props: true, 
  },
  // {
  //   path: '/cart', // <-- Comenta o elimina esta ruta
  //   name: 'Cart',
  //   component: ShoppingCart, 
  // },
  {
    path: '/about', 
    name: 'About',
    component: AboutPage, 
  },
  {
    path: '/contact', 
    name: 'Contact',
    component: ContactPage, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;