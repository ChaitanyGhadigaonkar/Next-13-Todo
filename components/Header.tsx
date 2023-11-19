"use client";
import Link from "next/link";
import React from "react";
import { redirect, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import ButtonComponent from "./ButtonComponent";
import { LogOut } from "lucide-react";
import ToggleThemeButton from "./ToggleThemeButton";

const Header = () => {
  const currentPath = usePathname();
  const { data: session } = useSession();
  return (
    <div className="flex justify-between py-3">
      <Link
        href={"/"}
        className="logo font-semibold text-xl px-2"
      >
        TODO
      </Link>
      <div className="links flex items-center gap-6 px-2">
        <ToggleThemeButton />
        <Link
          className={`${
            currentPath === "/" ? "text-zinc-950 dark:text-[#F7EFE5]" : ""
          } text-zinc-600  hover:text-zinc-950 dark:hover:text-[#FFFBF5] list-none cursor-pointer font-semibold transition-colors duration-300`}
          href={"/"}
        >
          Home
        </Link>
        <Link
          className={`${
            currentPath === "/add" ? "text-zinc-950 dark:text-[#F7EFE5]" : ""
          } text-zinc-600  hover:text-zinc-950 dark:hover:text-[#FFFBF5] list-none cursor-pointer font-semibold transition-colors duration-300`}
          href={"/add"}
        >
          Add Todo
        </Link>
        {!session ? (
          <Link
            className={`${
              currentPath === "/add" ? "text-zinc-950 dark:text-[#F7EFE5]" : ""
            } text-zinc-600  hover:text-zinc-950 dark:hover:text-[#FFFBF5] list-none cursor-pointer font-semibold transition-colors duration-300`}
            href={"/api/auth/signin"}
          >
            Login
          </Link>
        ) : (
          <ButtonComponent
            variant={"default"}
            className="flex items-center gap-2 py-0 px-3 border-none text-zinc-600  dark:hover:text-[#FFFBF5] "
            onClick={() => signOut()}
          >
            <LogOut
              width={15}
              height={15}
            />
            Logout
          </ButtonComponent>
        )}
      </div>
    </div>
  );
};

export default Header;
