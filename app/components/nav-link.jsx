"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./main-header.module.css";
export default function NavLink({ href, children }) {
  const path = usePathname();

  return (
    <>
      <li>
        <Link
          href={href}
          className={path.startsWith(href) ? classes.active : undefined}
        >
          {children}
        </Link>
      </li>
    </>
  );
}
