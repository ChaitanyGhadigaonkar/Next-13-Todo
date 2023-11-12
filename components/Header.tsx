"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const currentPath = usePathname();
  return (
    <div className="flex justify-between py-3">
      <h1 className="logo font-semibold text-xl ">TODO</h1>
      <div className="links flex gap-6">
        <Link
          className={`${
            currentPath === "/" ? "text-zinc-950" : ""
          } text-zinc-600  hover:text-zinc-950 list-none cursor-pointer font-semibold transition-colors duration-300`}
          href={"/"}
        >
          Home
        </Link>
        <Link
          className={`${
            currentPath === "/add" ? "text-zinc-950" : ""
          } text-zinc-600  hover:text-zinc-950 list-none cursor-pointer font-semibold transition-colors duration-300`}
          href={"/add"}
        >
          Add Todo
        </Link>
      </div>
    </div>
  );
};

export default Header;
