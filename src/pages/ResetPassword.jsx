import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  // Extrai o access_token da URL
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const accessToken = params.get('access_token');
    if (accessToken) {
      setToken(accessToken);
    } else {
      setStatus('Token não encontrado na URL.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Atualizando senha...');

    const { data, error } = await supabase.auth.updateUser(
      { password: newPassword },
      { accessToken: token }
    );

    if (error) {
      setStatus('Erro ao atualizar senha: ' + error.message);
    } else {
      setStatus('Senha redefinida com sucesso!');
      setTimeout(() => navigate('/'), 3000); // redireciona para login
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Redefinir senha</h2>

      {token ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
            Atualizar senha
          </button>
        </form>
      ) : (
        <p className="text-red-600">{status}</p>
      )}

      {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
    </div>
  );
}
