<template>
  <div class="contact-page">
    <h2>Contactanos</h2>
    <p class="intro-text">
      ¿Tienes alguna pregunta, sugerencia o necesitas ayuda? ¡Estamos aquí para asistirte! 
      Puedes contactarnos a través del siguiente formulario o utilizando la información de contacto a continuación.
    </p>

    <form @submit.prevent="submitForm" class="contact-form">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label for="subject">Asunto:</label>
        <input type="text" id="subject" v-model="form.subject" required />
      </div>

      <div class="form-group">
        <label for="message">Mensaje:</label>
        <textarea id="message" v-model="form.message" rows="6" required></textarea>
      </div>

      <button type="submit" class="submit-button">Enviar Mensaje</button>

      <p v-if="formSubmitted" class="success-message">
        ¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.
      </p>
    </form>

    <div class="contact-info">
      <h3>También puedes encontrarnos en:</h3>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:info@mitiendaderelojes.com">info@mitiendaderelojes.com</a></li>
        <li><strong>Teléfono:</strong> +57 310 123 4567</li>
        <li><strong>Dirección:</strong> Calle 123 #45-67, Cali, Valle del Cauca, Colombia</li>
      </ul>
      <div class="social-links">
        <a href="#" target="_blank" rel="noopener noreferrer" class="social-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.7 1.5H7.3c-3.1 0-5.6 2.5-5.6 5.6v9.7c0 3.1 2.5 5.6 5.6 5.6h9.7c3.1 0 5.6-2.5 5.6-5.6V7.1c0-3.1-2.5-5.6-5.6-5.6zm3.5 15.3c0 1.9-1.6 3.5-3.5 3.5H7.3c-1.9 0-3.5-1.6-3.5-3.5V7.1c0-1.9 1.6-3.5 3.5-3.5h9.7c1.9 0 3.5 1.6 3.5 3.5v9.7zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.5-10.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" />
          </svg>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" class="social-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.46 6c-.8 1.8-1.9 3-3.2 4-.3.1-.7.2-1.1.2s-.8-.1-1.1-.2c-1.3-1-2.1-2.2-3.2-4.1-.7-1-.9-2.2-.9-3.4H.1v17.5c0 1.2.6 2.2 1.8 2.2s2.1-.9 2.1-2.2V11.3c0-1.1.3-1.9.9-2.2s1.3-.4 2.1-.4c.8 0 1.6.2 2.2.6s1.1.9 1.5 1.6c.4.7.6 1.5.6 2.4v7c0 1.2.6 2.2 1.8 2.2s2.1-.9 2.1-2.2V11.3c0-1.1.3-1.9.9-2.2s1.3-.4 2.1-.4c.8 0 1.6.2 2.2.6s1.1.9 1.5 1.6c.4.7.6 1.5.6 2.4v7c0 1.2.6 2.2 1.8 2.2s2.1-.9 2.1-2.2V6h-.04z" />
          </svg>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" class="social-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.43 4.39a.75.75 0 00-.8-.1L4.85 9.7a.75.75 0 00.3 1.45l7.76 2.39 2.39 7.76a.75.75 0 001.45.3l5.41-11.78a.75.75 0 00-.1-.8z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const formSubmitted = ref(false);

const submitForm = () => {
  console.log('Formulario de contacto enviado:', form.value);
  formSubmitted.value = true;

  setTimeout(() => {
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    formSubmitted.value = false;
  }, 3000);
};
</script>

<style scoped>
.contact-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 2.2em;
  font-weight: 700;
}

.intro-text {
  text-align: center;
  font-size: 1.1em;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.contact-form {
  margin-bottom: 40px;
  border-top: 1px solid #eee;
  padding-top: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #444;
  font-size: 1em;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  color: #333;
  background-color: #fcfcfc;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  outline: none;
}

.form-group textarea {
  resize: vertical; 
  min-height: 120px;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.submit-button:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}

.success-message {
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  font-weight: 500;
}

.contact-info {
  border-top: 1px solid #eee;
  padding-top: 30px;
  text-align: center;
}

.contact-info h3 {
  font-size: 1.6em;
  color: #333;
  margin-bottom: 20px;
}

.contact-info ul {
  list-style: none;
  padding: 0;
  margin-bottom: 25px;
}

.contact-info ul li {
  margin-bottom: 10px;
  font-size: 1em;
  color: #555;
}

.contact-info ul li a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-info ul li a:hover {
  text-decoration: underline;
  color: #0056b3;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 20px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #f0f4f8; 
  color: #007bff;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
}

.social-icon:hover {
  background-color: #007bff;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 12px rgba(0, 123, 255, 0.2);
}

.social-icon svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

/* Media Queries para ContactPage */
@media (max-width: 768px) {
  .contact-page { margin: 20px; padding: 20px; }
  h2 { font-size: 1.8em; }
  .intro-text { font-size: 1em; }
  .form-group label, .form-group input, .form-group textarea, .submit-button { font-size: 0.95em; }
  .contact-info h3 { font-size: 1.4em; }
  .social-icon { width: 40px; height: 40px; }
  .social-icon svg { width: 22px; height: 22px; }
}

@media (max-width: 480px) {
  .contact-page { padding: 15px; margin: 15px; }
  h2 { font-size: 1.5em; }
  .intro-text { font-size: 0.9em; }
  .form-group label, .form-group input, .form-group textarea, .submit-button { font-size: 0.9em; }
  .contact-info h3 { font-size: 1.2em; }
  .social-icon { width: 35px; height: 35px; }
  .social-icon svg { width: 20px; height: 20px; }
}
</style>