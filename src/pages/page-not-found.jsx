import { Link, useNavigate } from "react-router-dom";


export default function PageNotFound() {
      const navigate = useNavigate()

  return (
    <>
      <div className="grid h-screen place-items-center bg-transparent px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-4xl font-semibold text-red-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-100 sm:text-7xl">
            Página não encontrada
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sentimos muito pelo ocorrido, vamos trabalhar para que isso não se
            repita.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/dashboard"
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Voltar ao inicio
            </Link>

            <Link to={-1} className="text-sm font-semibold text-zinc-100 hover:text-zinc-300">
              Chamar o suporte <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
