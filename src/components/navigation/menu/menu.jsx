"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";

import { useMenuContext } from "../../../contexts/menu-context";
import { MenuItem } from "./menu-item";

export function Menu() {
  const { items, toggleOpen } = useMenuContext();

  useGSAP(() => {
    gsap.to("#menu", {
      opacity: 1,
      duration: 0.2,
    });
    gsap.to(".menu-item", {
      y: 0,
      duration: 0.4,
      stagger: 0.05,
      delay: 0.1,
      ease: "power3.out",
    });
    gsap.to(".menu-links span", {
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: "power3.out",
      delay: 0.1,
    });
  });

  return (
    <motion.div
      id="menu"
      className="z-10 fixed top-0 left-0 h-screen w-screen p-8 py-4 bg-[#000] text-[#f1f1f1] flex flex-col justify-between opacity-0 select-none"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="flex justify-between">
        <span className="text-xl font-medium tracking-tight">Motion</span>
        <div className="flex items-center gap-4">
          <span className="cursor-pointer" onClick={toggleOpen}>
            Close
          </span>
        </div>
      </div>
      <div className="w-fit pl-72 flex flex-col">
        {items.map((item) => (
          <MenuItem key={item.to} {...item} />
        ))}
      </div>
      <div className="menu-links w-full flex gap-12">
        <span className="opacity-0">Facebook</span>
        <span className="opacity-0">Instagram</span>
        <span className="opacity-0">Linkedin</span>
        <span className="opacity-0 ml-auto">Contact</span>
      </div>
    </motion.div>
  );
}
