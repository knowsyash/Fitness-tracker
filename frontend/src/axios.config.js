
  import axios from 'axios';
  // Create an axios instance with custom configuration
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  // Request interceptor for adding auth token
  // api.interceptors.request.use(
  //   (config) => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       config.headers['Authorization'] = `Bearer ${token}`;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  // // Response interceptor for handling errors
  // api.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     // Handle 401 Unauthorized responses
  //     if (error.response && error.response.status === 401) {
  //       localStorage.removeItem('token');
  //       // Redirect to login page or handle as needed
  //       window.location.href = '/login';
  //     }
  //     return Promise.reject(error);
  //   }
  

  export default api;