import { Divider } from "@/components/divider";
import { Label } from "@/components/fieldset";
import { Heading, Subheading } from "@/components/heading";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Text } from "@/components/text";
import { Textarea } from "@/components/textarea";
import { Address } from "./address";
import { Avatar } from "@/components/avatar";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { clsx } from "clsx";
import { Checkbox } from "../../../components/checkbox";

import { HomeIcon, UserCircleIcon } from "@heroicons/react/20/solid";

export default function Profile() {

  return (
    <form method="post" className="mx-auto max-w-4xl">
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2 mt-16">
        <div className="flex items-start space-x-5">
          <div className="shrink-0">
            <div className="relative">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                className="size-16 rounded-full"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full shadow-inner"
              />
            </div>
          </div>
          <div className="pt-1.5">
            <h1 className="text-2xl font-bold text-zinc-100">
              Nome da pessoa vai vir aqui
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Cadastrado desde{" "}
              <a href="#" className="text-zinc-100">
                21/12/1990
              </a>
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Alterar minha foto
          </button>
        </div>
      </section>

      <Divider className="my-10 mt-6" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Seu nome</Subheading>
          <Text>Digite seu nome completo</Text>
        </div>

        <div>
          <Input
            aria-label="Organization Name"
            name="name"
            placeholder="Ex: Marcondes da silva"
          />
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Breve biografia</Subheading>
          <Text>Conte um pouco mais sobre você</Text>
        </div>
        <div>
          <Textarea
            aria-label="Organization Bio"
            name="bio"
            placeholder="Ex: Meu nome é Marcondes da Silva, sou natural de ......."
          />
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Email de contato</Subheading>
          <Text>Digite seu email de contato</Text>
        </div>
        <div className="space-y-4">
          <Input
            type="email"
            aria-label="Organization Email"
            name="email"
            defaultValue="info@example.com"
          />
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Nível de acesso</Subheading>
          <Text>Quais ferramentas o usuário pode alterar.</Text>
          <Text>Somente admins podem alterar níveis de acesso</Text>
        </div>
        <div className="space-y-4">
          <div>
            {/* <Label>Show email on public profile</Label> */}
            <Checkbox />
          </div>
        </div>
      </section>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <button
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          type="submit"
        >
          Salvar alterações
        </button>
      </div>
    </form>
  );
}
