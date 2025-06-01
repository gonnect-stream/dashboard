import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/client";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", { email, password });
      console.log("Login bem-sucedido:", res.data);
      navigate("/dashboard", { replace: true }); // Redireciona
    } catch (err) {
      if (
        err.response?.data?.error === "Invalid login credentials"
          ? setError("Email ou senha inválido")
          : setError(err.response?.data?.error)
      );
      // setError(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Gonnect"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=red&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-100">
            Acesse sua conta
          </h2>

          <p className="mt-2 text-center  font-light tracking-tight text-gray-100">
            Plataforma de gerenciamento de streams
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-zinc-900 px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-light text-gray-100"
                >
                  Email:
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 border border-gray-300 text-base text-gray-900 outline-1 -outline-offset-2 outline-red-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-light text-gray-100"
                >
                  Senha
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 border border-gray-300 text-base text-gray-900 outline-1 -outline-offset-2 outline-red-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm/6">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-red-600 hover:text-red-500"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  {loading ? "Entrando..." : "Entrar"}
                </button>
              </div>
            </form>

            {error && (
              <p className="mt-4 text-center text-sm text-gray-700">{error}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
