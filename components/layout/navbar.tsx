"use client";

import Image from "next/image";
import { UserAvatar } from "@/components/shared";
import Link from "next/link";

interface NavbarProps {
  children?: React.ReactNode;
}
export const Navbar = ({ children }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/favicon.ico"
            height={30}
            width={30}
            alt="Kanban-app"
          />
          <div className="flex flex-col text-sm font-bold tracking-wide max-md:sr-only">
            <span>Kanban-app</span>
            <span className="text-muted-foreground">By Poraparint</span>
          </div>
        </Link>
        {children}
        <div className="flex items-center">
          <UserAvatar />
        </div>
      </div>
      
    </nav>
  );
};
