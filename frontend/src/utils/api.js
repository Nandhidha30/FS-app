import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
};

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart/add', data),
  update: (productId, data) => api.put(`/cart/update/${productId}`, data),
  remove: (productId) => api.delete(`/cart/remove/${productId}`)
};

// Wishlist API
export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  add: (productId) => api.post(`/wishlist/add/${productId}`),
  remove: (productId) => api.delete(`/wishlist/remove/${productId}`)
};

// Reviews API
export const reviewsAPI = {
  getByProduct: (productId) => api.get(`/reviews/product/${productId}`),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`)
};

// Twitter API
export const twitterAPI = {
  tweet: (message) => api.post('/twitter/tweet', { message }),
  getRecent: () => api.get('/twitter/recent')
};

export default api;