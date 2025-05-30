// src/api/client.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-production-5486.up.railway.app/',
  withCredentials: true // ← permite uso de cookies
});

export default api;
