"use client";

import { AnimatePresence } from "motion/react";

import { Menu } from "./menu/menu";
import { useMenuContext } from "../../contexts/menu-context";

export function Navigation() {
  const { isOpen, toggleOpen } = useMenuContext();

  return (
    <>
      <div className="z-10 fixed top-0 left-0 w-screen p-8 py-4 flex justify-between items-center">
        <span className="text-xl font-medium tracking-tight">Motion</span>
        <div className="flex items-center gap-4">
          <span className="cursor-pointer" onClick={toggleOpen}>
            Menu
          </span>
        </div>
      </div>
      <AnimatePresence mode="wait">{isOpen && <Menu />}</AnimatePresence>
    </>
  );
}
