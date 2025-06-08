import { Stat } from "@/pages/app/stat";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { Heading, Subheading } from "@/components/heading";
import { Select } from "@headlessui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";

import { getRecentOrders } from "@/data";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarPedidos = async () => {
      try {
        const dados = await getRecentOrders();
        setOrders(dados);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        setErro("Erro ao carregar pedidos");
      }
    };

    carregarPedidos();
  }, []);

  // console.log(orders[0].event.imgUrl)

  if (erro) return <div>{erro}</div>;
  if (!orders.length) return <div>Carregando pedidos...</div>;

  return (
    <>
      <Heading>Olá, nome do usuário</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Resumo da plataforma</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Transmissões hoje" value="10" change="Ao vivo" />
        <Stat title="Total de transmissões" value="250" change="Plataforma" />
        <Stat title="Total de VOD" value="350" change="VOD%" />
      </div>

      <Subheading className="mt-14">
        Transmissões programadas para hoje
      </Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            {/* <TableHeader>id</TableHeader> */}
            <TableHeader>Nome</TableHeader>
            <TableHeader>Programa</TableHeader>
            <TableHeader>Inicio-Fim</TableHeader>
            <TableHeader className="text-right">Inicia em:</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} title={`Order #${order.id}`}>
              {/* <TableCell>{order.id}</TableCell> */}
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={order.event.thumbUrl} className="size-6" />
                  <span>{order.event.name}</span>
                </div>
              </TableCell>

              <TableCell className="text-zinc-500">
                <div className="inlin flex-col ">
                  <p className="text-sm">{order.date}</p>
                  <p className="text-sm">{order.date}</p>
                </div>
              </TableCell>

              <TableCell className="text-right">19:39</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>

    // <h1>VEM COMIGO</h1>
  );
}
