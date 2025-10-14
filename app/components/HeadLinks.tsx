"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeadLinks() {
  const pathname = usePathname();
  const links = [
    {
      name: "Search",
      href: "/",
    },
    {
      name: "Rated",
      href: "/rated",
    },
  ];

  console.log(pathname === links[0].href);
  return (
    <div className="flex flex-row justify-center align-middle gap-5">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={
            pathname === link.href
              ? `active-link`
              : `text-black/65 hover:text-black/80`
          }
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
