"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import { useMenuContext } from "../../../contexts/menu-context";

export function MenuItem({ label = "", to = "", ...props }) {
  const { toggleOpen } = useMenuContext();

  const duration = 0.5;
  const location = useLocation();
  const navigate = useNavigate();

  const itemRef = useRef(null);

  const [isListeningMouseIntercations, setIsListeningMouseIntercations] = useState(true);

  const handleClick = (event) => {
    event.preventDefault();
    setIsListeningMouseIntercations(false);
    navigate(to);
    toggleOpen();
  };

  const handleMouseOver = () => {
    if (itemRef.current && location.pathname != to && isListeningMouseIntercations) {
      gsap.to(itemRef.current.querySelector(".original"), {
        y: "-100%",
        duration,
        ease: "power3.out",
      });
      gsap.to(itemRef.current.querySelector(".on-hover"), {
        y: 0,
        duration,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (itemRef.current && location.pathname != to && isListeningMouseIntercations) {
      gsap.to(itemRef.current.querySelector(".original"), {
        y: 0,
        duration,
        ease: "power3.out",
      });
      gsap.to(itemRef.current.querySelector(".on-hover"), {
        y: "100%",
        duration,
        ease: "power3.out",
      });
    }
  };

  return (
    <a href={to} onClick={handleClick} className="overflow-hidden w-fit">
      <div
        {...props}
        ref={itemRef}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className="menu-item relative text-6xl translate-y-full leading-[1.1] flex"
      >
        <span className={`original ${location.pathname == to ? "opacity-100" : "opacity-50"}`}>
          {label}
        </span>
        <span className="on-hover absolute top-0 left-0 translate-y-full">{label}</span>
      </div>
    </a>
  );
}
