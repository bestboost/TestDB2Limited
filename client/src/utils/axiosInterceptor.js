// Налаштування інтерцептора Axios
import axios from 'axios';

axios.interceptors.response.use(
  (response) => response, // Пропуск успішних відповідей
  (error) => {
    if (error.response && error.response.status === 400) {
      // Ігноруємо логування помилок 400
      return Promise.reject(error); // Продовжуємо обробку
    }
    return Promise.reject(error);
  }
);
