"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export function NavbarWrapper() {
  const pathname = usePathname();

  // Hide navbar on game page (fullscreen experience)
  if (pathname === "/game") return null;

  return <Navbar />;
}
