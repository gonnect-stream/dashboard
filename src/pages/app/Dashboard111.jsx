import { useEffect, useState } from 'react';
import api from '../../api/client';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get('/profile')
      .then(res => {
        setProfile(res.data);
        setErro('');
      })
      .catch(err => {
        setProfile(null);
        const message = err.response?.data?.error || 'Erro ao carregar perfil';
        setErro(message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-4">Carregando perfil...</p>;
  }

  if (erro) {
    return <p className="p-4 text-red-600">{erro}</p>;
  }


  async function handleLogout(){
    await api.post('/logout'); // api já está com withCredentials: true
    navigate('/')
  }


  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p><strong>Nome:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Telefone:</strong> {profile.phone}</p>
      <p><strong>Role:</strong> {profile.role}</p>

      <button className='bg-red-500 p-5' onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}
