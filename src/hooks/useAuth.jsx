// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import api from '../api/client';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/profile')
      .then(res => {
        setUser(res.data);
        console.log('Perfil carregado:', res.data);
      })
      .catch(err => {
        console.error('Erro ao carregar perfil:', err.response?.data || err.message);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
