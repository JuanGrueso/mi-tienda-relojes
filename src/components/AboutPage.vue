<template>
  <div class="about-page">
    <h2>Sobre Mi Tienda de Relojes</h2>
    <p>
      Bienvenido a **Mi Tienda de Relojes**, tu destino principal para encontrar relojes de calidad, diseño y precisión. 
      Desde el clásico reloj de pulsera hasta el innovador smartwatch, nuestra pasión es ofrecer una selección 
      cuidadosamente curada para cada estilo y necesidad.
    </p>
    <p>
      Creemos que un reloj es más que un simple instrumento para medir el tiempo; es una declaración de estilo, una 
      pieza de artesanía y, a menudo, un legado. Por eso, nos dedicamos a traer a nuestros clientes piezas que no solo 
      son hermosas, sino que también cumplen con los más altos estándares de calidad y durabilidad.
    </p>
    <p>
      Nuestra misión es proporcionarte una experiencia de compra excepcional, con un servicio al cliente amigable y 
      una colección que te inspire. ¡Gracias por elegirnos para acompañarte en tu tiempo!
    </p>
  </div>
</template>

<script setup>
// No necesita lógica específica por ahora, solo es contenido estático.
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  text-align: justify;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.2em;
  font-weight: 700;
  border-bottom: 2px solid #eee;
  padding-bottom: 15px;
}

p {
  font-size: 1.1em;
  line-height: 1.7;
  color: #555;
  margin-bottom: 20px;
}

p:last-child {
  margin-bottom: 0;
}

/* Media Queries para AboutPage */
@media (max-width: 768px) {
  .about-page {
    margin: 20px;
    padding: 20px;
  }
  h2 {
    font-size: 1.8em;
    margin-bottom: 20px;
  }
  p {
    font-size: 1em;
    line-height: 1.6;
    margin-bottom: 15px;
  }
}

@media (max-width: 480px) {
  .about-page {
    padding: 15px;
    margin: 15px;
  }
  h2 {
    font-size: 1.5em;
    margin-bottom: 15px;
  }
  p {
    font-size: 0.9em;
    margin-bottom: 10px;
  }
}
</style>