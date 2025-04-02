import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:8080/api';

// Configuramos una instancia de Axios con la URL base
const api = axios.create({
  baseURL: API_URL
});

// Interceptor para añadir el token JWT a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn('Sesión expirada. Redirigiendo al login...');
        localStorage.removeItem('token');
        window.location.href = '/#/login'; // Redirige al usuario al login
      }
    }
    return Promise.reject(error);
  }
);

export { api };
