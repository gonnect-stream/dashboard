import { Avatar } from "@/components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dropdown";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/components/sidebar";
import { SidebarLayout } from "@/components/sidebar-layout";

import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import {
  HomeIcon,
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  SignalIcon,
  StarIcon,
  VideoCameraIcon,
  ArrowsRightLeftIcon,
  ArrowRightEndOnRectangleIcon,
  PlayCircleIcon,
  UserIcon,
  UsersIcon,
  CloudArrowUpIcon,
  ServerStackIcon,
} from "@heroicons/react/20/solid";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";

import Breadcrumbs from "@/components/breadcrumbs";

// import erica from "@/erica.jpg";
import clsx from "clsx";
import { useEffect, useState } from "react";
import api from "../../api/client";

function AccountDropdownMenu({ anchor }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#teste">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/login">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export default function ApplicationLayout({}) {
  const location = useLocation();

  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    api
      .get("/profile")
      .then((res) => {
        setProfile(res.data);
        setErro("");
      })
      .catch((err) => {
        setProfile(null);
        const message = err.response?.data?.error || "Erro ao carregar perfil";
        setErro(message);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await api.post("/logout"); // api já está com withCredentials: true
    navigate("/");
  }

  console.log(profile);

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton>
                {/* <Avatar src={erica} square /> */}
              </DropdownButton>
              <AccountDropdownMenu />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Menu as="div" className="relative inline-block text-left mt-5">
              <div>
                <span className="flex min-w-0 items-center gap-3">
                  {/* TROCAR PELA URL DA FOTO DEPOIS */}

                  {profile && profile.name === "Mauricio Corrêa" ? (
                    <UserCircleIcon className="w-12 aspect-square text-gray-100" />
                  ) : (
                    <Avatar
                      // src={erica}
                      className="w-12 aspect-square"
                      alt="Foto de perfil"
                    />
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {profile && profile.name}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {profile && profile.email}
                    </span>
                  </span>
                </span>
              </div>
            </Menu>
          </SidebarHeader>

          <SidebarBody>
            <Link
              to="/dashboard/"
              className={clsx(
                "flex items-center text-white gap-3 hover:bg-gray-100/10 w-full pl-2 py-2 rounded-lg mb-5",
                location.pathname === "/dashboard/"
                  ? "border-l-4 border-red-500"
                  : "border-l-4 border-transparent hover:bg-gray-100/10 hover:text-white text-white/50 "
              )}
            >
              <HomeIcon className="h-5 w-5" />
              <SidebarLabel className="text-red-100">Inicio</SidebarLabel>
            </Link>

            <SidebarSection>
              <SidebarHeading>Controle de eventos</SidebarHeading>

              <Link
                to="/dashboard/eventos?status=todos&page=1"
                className={clsx(
                  "flex items-center  gap-3 hover:bg-gray-100/10 w-full pl-2 py-2 rounded-lg",
                  location.pathname === "/dashboard/eventos"
                    ? "border-l-4 border-red-500 text-white"
                    : "border-l-4 border-transparent hover:bg-gray-100/10 hover:text-white text-white/50 "
                )}
              >
                <StarIcon className="h-5 w-5" />
                <SidebarLabel className=" text-sm font-light">
                  Eventos
                </SidebarLabel>
              </Link>

              <Link
                to="/dashboard"
                className={clsx(
                  "flex items-center  gap-3 hover:bg-gray-100/10 w-full pl-2 py-2 rounded-lg",
                  location.pathname === "/dashboard/input-stream"
                    ? "border-l-4 border-red-500 text-white"
                    : "border-l-4 border-transparent hover:bg-gray-100/10 hover:text-white text-white/50 "
                )}
              >
                <VideoCameraIcon className="h-5 w-5" />
                <SidebarLabel className=" text-sm font-light">
                  Input Stream
                </SidebarLabel>
              </Link>

              <Link
                to="/dashboard"
                className={clsx(
                  "flex items-center  gap-3 hover:bg-gray-100/10 w-full pl-2 py-2 rounded-lg",
                  location.pathname === "/dashboard/re-stream"
                    ? "border-l-4 border-red-500 text-white"
                    : "border-l-4 border-transparent hover:bg-gray-100/10 hover:text-white text-white/50 "
                )}
              >
                <ArrowsRightLeftIcon className="h-5 w-5" />
                <SidebarLabel className=" text-sm font-light">
                  Restreams
                </SidebarLabel>
              </Link>

              <Link
                to="/dashboard"
                className={clsx(
                  "flex items-center  gap-3 hover:bg-gray-100/10 w-full pl-2 py-2 rounded-lg",
                  location.pathname === "/dashboard/ondemand"
                    ? "border-l-4 border-red-500 text-white"
                    : "border-l-4 border-transparent hover:bg-gray-100/10 hover:text-white text-white/50 "
                )}
              >
                <PlayCircleIcon className="h-5 w-5" />
                <SidebarLabel className=" text-sm font-light">
                  Video ON DEMAND
                </SidebarLabel>
              </Link>
            </SidebarSection>

            {/* Controle de usuários */}
            <SidebarSection>
              <SidebarHeading>Usuários</SidebarHeading>

              <Link
                to="/dashboard/Perfil"
                className={clsx(
                  "flex items-center  gap-3 hover:bg-gray-100/10 w-full pl-2 py-2 rounded-lg",
                  location.pathname === "/dashboard/Perfil"
                    ? "border-l-4 border-red-500 text-white"
                    : "border-l-4 border-transparent hover:bg-gray-100/10 hover:text-white text-white/50 "
                )}
              >
                <UserIcon className="h-5 w-5" />
                <SidebarLabel className=" text-sm font-light">
                  Meu perfil
                </SidebarLabel>
              </Link>

              <Link
                to="/dashboard/usuarios"
                className={clsx(
                  "flex items-center  gap-3 hover:bg-gray-100/10 w-full pl-2 py-2 rounded-lg",
                  location.pathname === "/dashboard/usuarios"
                    ? "border-l-4 border-red-500 text-white"
                    : "border-l-4 border-transparent hover:bg-gray-100/10 hover:text-white text-white/50 "
                )}
              >
                <UsersIcon className="h-5 w-5" />
                <SidebarLabel className=" text-sm font-light">
                  Usuários
                </SidebarLabel>
              </Link>
            </SidebarSection>

            {/* Controle de sistemas */}
            <SidebarSection>
              <SidebarHeading>Sistemas</SidebarHeading>

              <Link
                to="/dashboard/Perfil"
                className={clsx(
                  "flex items-center  gap-3 hover:bg-gray-100/10 w-full pl-2 py-2 rounded-lg",
                  location.pathname === "/dashboard/Perfil"
                    ? "border-l-4 border-red-500 text-white"
                    : "border-l-4 border-transparent hover:bg-gray-100/10 hover:text-white text-white/50 "
                )}
              >
                <CloudArrowUpIcon className="h-5 w-5" />
                <SidebarLabel className=" text-sm font-light">CDN</SidebarLabel>
              </Link>

              <Link
                to="/dashboard/usuarios"
                className={clsx(
                  "flex items-center  gap-3 hover:bg-gray-100/10 w-full pl-2 py-2 rounded-lg",
                  location.pathname === "/dashboard/usuarios"
                    ? "border-l-4 border-red-500 text-white"
                    : "border-l-4 border-transparent hover:bg-gray-100/10 hover:text-white text-white/50 "
                )}
              >
                <ServerStackIcon className="h-5 w-5" />
                <SidebarLabel className=" text-sm font-light">
                  Servidores
                </SidebarLabel>
              </Link>
            </SidebarSection>
          </SidebarBody>

          {/* SIDEBAR FOOTER */}
          <SidebarFooter className="max-lg:hidden">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton
                  onClick={handleLogout}
                  className="inline-flex w-full gap-5 rounded-md px-3 py-2 text-md text-gray-100 text-md items-center font-light "
                >
                  <ArrowRightEndOnRectangleIcon
                    aria-hidden="true"
                    className="-mr-1 size-6 text-gray-400"
                  />
                  Sair
                </MenuButton>
              </div>
            </Menu>
          </SidebarFooter>
        </Sidebar>
      }
    >
      <Breadcrumbs />
      <Outlet />
    </SidebarLayout>
  );
}
