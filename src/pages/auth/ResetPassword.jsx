import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // Extrai o access_token da URL
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const accessToken = params.get("access_token");
    if (accessToken) {
      setToken(accessToken);
    } else {
      setStatus("Token não encontrado na URL.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Atualizando senha...");

    const { data, error } = await supabase.auth.updateUser(
      { password: newPassword },
      { accessToken: token }
    );

    if (error) {
      setStatus("Erro ao atualizar senha: " + error.message);
    } else {
      setStatus("Senha redefinida com sucesso!");
      setTimeout(() => navigate("/"), 3000); // redireciona para login
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Gonnect"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=red&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-100">
            Redefina sua senha
          </h2>
          
           <p className="mt-2 text-center  font-light tracking-tight text-gray-100">
            Digite sua nova senha no campo abaixo
          </p>

        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-zinc-900 px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-light text-gray-100"
                >
                  Email:
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Digite sua nova senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 border border-gray-300 text-base text-gray-900 outline-1 -outline-offset-2 outline-red-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Atualizar senha
              </button>

              {status && (
                <p className="mt-4 text-center text-sm text-gray-100">
                  {status}
                </p>
              )}
            </form>
          </div>

          <div className="flex items-center justify-between"></div>
        </div>
      </div>
    </>
  );
}
