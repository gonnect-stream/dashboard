import { useState } from "react";
import { Divider } from "@/components/divider";

export function Checkbox() {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <fieldset>
      <legend className="sr-only">Notifications</legend>
      
      <div className="divide-y divide-gray-200">
        <div className="relative flex gap-3  pb-4">
          <div className="min-w-0 flex-1 text-sm/6">
            <label htmlFor="eventos" className="font-medium text-zinc-100">
              Criar e administrar eventos
            </label>
            <p id="comments-description" className="text-gray-500">
              O usuário pode criar, editar e excluir streams.
            </p>
          </div>
          <div className="flex h-6 shrink-0 items-center">
            <div className="group grid size-4 grid-cols-1">
              <input
                defaultChecked
                id="comments"
                name="comments"
                type="checkbox"
                aria-describedby="comments-description"
                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-600 checked:bg-red-600 indeterminate:border-red-600 indeterminate:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
              />
              <svg
                fill="none"
                viewBox="0 0 14 14"
                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-checked:opacity-100"
                />
                <path
                  d="M3 7H11"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-indeterminate:opacity-100"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="relative flex gap-3 pt-3.5 pb-4">
          <div className="min-w-0 flex-1 text-sm/6">
            <label htmlFor="candidates" className="font-medium text-zinc-100">
              Administrar usuários
            </label>
            <p id="candidates-description" className="text-gray-500">
              Pode criar, editar e excluir usuários da plataforma.
            </p>
          </div>
          <div className="flex h-6 shrink-0 items-center">
            <div className="group grid size-4 grid-cols-1">
              <input
                id="candidates"
                name="candidates"
                type="checkbox"
                aria-describedby="candidates-description"
                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-600 checked:bg-red-600 indeterminate:border-red-600 indeterminate:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
              />
              <svg
                fill="none"
                viewBox="0 0 14 14"
                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-checked:opacity-100"
                />
                <path
                  d="M3 7H11"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-indeterminate:opacity-100"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="relative flex gap-3 pt-3.5 pb-4">
          <div className="min-w-0 flex-1 text-sm/6">
            <label htmlFor="offers" className="font-medium text-zinc-100">
              Sistema
            </label>
            <p id="offers-description" className="text-gray-500">
              Pode monitorar, ativar e verificar servidores e sistemas.
            </p>
          </div>
          <div className="flex h-6 shrink-0 items-center">
            <div className="group grid size-4 grid-cols-1">
              <input
                id="offers"
                name="offers"
                type="checkbox"
                aria-describedby="offers-description"
                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-600 checked:bg-red-600 indeterminate:border-red-600 indeterminate:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
              />
              <svg
                fill="none"
                viewBox="0 0 14 14"
                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-checked:opacity-100"
                />
                <path
                  d="M3 7H11"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-indeterminate:opacity-100"
                />
              </svg>
            </div>
          </div>
        </div>

         <div className="relative flex gap-3 pt-3.5 pb-4">
          <div className="min-w-0 flex-1 text-sm/6">
            <label htmlFor="candidates" className="font-medium text-zinc-100">
              Superadministrador
            </label>
            <p id="candidates-description" className="text-gray-500">
              Acesso total a plataforma
            </p>
          </div>
          <div className="flex h-6 shrink-0 items-center">
            <div className="group grid size-4 grid-cols-1">
              <input
                id="candidates"
                name="candidates"
                type="checkbox"
                aria-describedby="candidates-description"
                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-600 checked:bg-red-600 indeterminate:border-red-600 indeterminate:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
              />
              <svg
                fill="none"
                viewBox="0 0 14 14"
                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-checked:opacity-100"
                />
                <path
                  d="M3 7H11"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-indeterminate:opacity-100"
                />
              </svg>
            </div>
          </div>
        </div>


      </div>
    </fieldset>
  );
}
