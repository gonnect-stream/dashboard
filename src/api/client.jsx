// src/api/client.js
import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // ← permite uso de cookies
});