"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/public/images/rickmorty.png";

export function Navbar() {
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-50 p- w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logo} alt="Logo" width={150} height={32} />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-rick-green",
                pathname === "/"
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link
              href="/characters"
              className={cn(
                "text-sm font-medium transition-colors hover:text-portal-blue",
                pathname === "/characters" || pathname.startsWith("/characters/")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              )}
            >
              Characters
            </Link>
          </nav>
        </div>
       
      </div>
    </header>
  );
}
