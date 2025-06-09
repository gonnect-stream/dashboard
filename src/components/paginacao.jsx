import { useSearchParams } from "react-router-dom";

export default function Paginacao({ totalPaginas }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const statusFiltro = searchParams.get("status") || "todos";
  const paginaAtual = parseInt(searchParams.get("page") || "1", 10);

  

  return (
    <div className="flex gap-4 items-center mt-4 text-zinc-100">
      <button
        onClick={() => {
          if (paginaAtual > 1) {
            setSearchParams({
              status: statusFiltro,
              page: paginaAtual - 1,
            });
          }
        }}
        disabled={paginaAtual <= 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Anterior
      </button>

      <span className="text-sm">
        Página {paginaAtual} de {totalPaginas}
      </span>

      <button
        onClick={() => {
          if (paginaAtual < totalPaginas) {
            setSearchParams({
              status: statusFiltro,
              page: paginaAtual + 1,
            });
          }
        }}
        disabled={paginaAtual >= totalPaginas}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );
}
