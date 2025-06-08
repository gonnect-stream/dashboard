import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";

import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const pages = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
];

export default function Breadcrumbs() {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    const breadcrumbList = pathnames.map((segment, index) => {
      const to = "/" + pathnames.slice(0, index + 1).join("/");
      return {
        name: decodeURIComponent(
          segment.charAt(0).toUpperCase() + segment.slice(1)
        ),
        path: to,
      };
    });

    setBreadcrumbs(breadcrumbList);
  }, [location]);

  return (
    <nav aria-label="Breadcrumb" className="flex mb-5">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link to="/dashboard" className="text-gray-400 hover:text-gray-500">
              <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
              <span className="sr-only">Inicio</span>
            </Link>
          </div>
        </li>

        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="size-5 shrink-0 text-zinc-400"
              />
               {index === breadcrumbs.length - 1 ? (
              <span className="text-zinc-300">{crumb.name}</span>
            ) : (
              <Link to={crumb.path} className="text-zinc-600 hover:text-zinc-400">
                {crumb.name}
              </Link>
            )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
