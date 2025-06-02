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
      <Heading>Good afternoon, Erica</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select
            className={
              "w-full text-sm bg-zinc-800 border border-zinc-500 border-0.5 text-zinc-400 px-5 py-2 pr-2 rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
            }
          >
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
      </div>

      <Subheading className="mt-14">Recent orders</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Event</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              title={`Order #${order.id}`}
            >
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={order.event.thumbUrl} className="size-6" />
                  <span>{order.event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>

    // <h1>VEM COMIGO</h1>
  );
}
