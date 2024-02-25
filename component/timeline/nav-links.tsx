"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/navlink.module.scss"

const links = [
  { name: "고대", href: "/ancient"},
  { name: "중세", href: "/medieval" },
  { name: "르네상스", href: "/renaissance" },
  { name: "바로크/로코코", href: "/baroquerococo" },
  { name: "근현대", href: "/modern" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`${styles.linkbox} ${
            pathname === link.href ? styles.activeLink : ""
          }`}
        >
          <p className={styles.linkname}>{link.name}</p>
        </Link>
      ))}
    </>
  );
}
