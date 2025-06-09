import { useEffect, useState } from "react";
import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/dropdown";
import { Heading } from "@/components/heading";
import { Link } from "react-router-dom";
import { Select } from "@headlessui/react";
import { Button } from "@headlessui/react";
import { Input } from "@headlessui/react";
import CreateEventModal from "@/components/create-event-modal";

import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";

import { getEvents } from "@/data";
import { Pagination } from "@/components/pagination";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [erro, setErro] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        const dados = await getEvents();
        setEvents(dados);
      } catch (err) {
        console.error("Erro ao buscar Eventos:", err);
        setErro("Erro ao carregar eventos");
      }
    };

    carregarEventos();
  }, []);

  if (erro) return <div>{erro}</div>;
  if (!events.length) return <div>Carregando todos os eventos...</div>;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Eventos</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              {/* <MagnifyingGlassIcon className="w-5"/> */}
              <Input
                name="search"
                placeholder="Procure o seu evento"
                className={
                  "w-full text-sm bg-zinc-800 border border-zinc-500 border-0.5 text-zinc-400 px-5 py-2  rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
                }
              />
            </div>
            <div>
              <Select
                className={
                  "w-full b text-sm bg-zinc-800 border border-zinc-500 border-0.5 text-zinc-400 px-5 py-2  rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
                }
              >
                <option value="*" disabled>
                  Selecionar
                </option>
                <option value="name">No ar</option>
                <option value="date">Próximos</option>
                <option value="status">Finalizado</option>
              </Select>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Criar transmissão
        </button>
      </div>
      <ul className="mt-10">
        {events.map((event, index) => (
          <li key={event.id}>
            <Divider />
            <div className="flex items-center justify-between">
              <div key={event.id} className="flex gap-6 py-6">
                <div className="w-32 shrink-0">
                  <Link>
                    <img
                      className="aspect-3/2 rounded-lg shadow-sm"
                      src={event.imgUrl}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="space-y-1.5">
                  <div className="text-lg font-semibold text-white">
                    <Link to={event.url}>{event.name}</Link>
                  </div>
                  <div className="text-xs/6 text-zinc-500">
                    {event.date} at {event.time}{" "}
                    <span aria-hidden="true">·</span> {event.location}
                  </div>
                  <div className="text-xs/6 text-zinc-600">
                    {event.ticketsSold}/{event.ticketsAvailable} tickets sold
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  className="max-sm:hidden"
                  color={
                    event.status === "No ar"
                      ? "lime"
                      : event.status === "Programado"
                      ? "yellow"
                      : "red"
                  }
                >
                  {event.status}
                </Badge>

                <Dropdown>
                  <DropdownButton
                    className={
                      "border-none focus:outline-none focus:ring-0 focus:border-transparent"
                    }
                  >
                    <EllipsisVerticalIcon className="size-5" />
                  </DropdownButton>
                  <DropdownMenu>
                    <DropdownItem className={"hover:bg-zinc-700"}>
                      Editar
                    </DropdownItem>
                    <DropdownItem className={"hover:bg-zinc-700"}>
                      Deletar
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Pagination />

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
