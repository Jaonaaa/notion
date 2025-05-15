"use client";

import gsap from "gsap";
import { useInView } from "motion/react";
import { useLayoutEffect, useState } from "react";
import SplitType from "split-type";
import { random } from "../helpers/random";

// type ScrambleTextOptions = {
//   target: RefObject<Element | null>;
//   viewOptions?: UseInViewOptions;
//   splitOptions?: Partial<SplitTypeOptions>;
//   delayRange?: [number, number];
//   durationRange?: [number, number];
// };

export function useScrambleText({
  target,
  viewOptions,
  splitOptions,
  delayRange = [200, 1200],
  durationRange = [400, 800],
}) {
  const inView = useInView(target, viewOptions);
  const [durations, setDurations] = useState([]);

  const splitElement = () => {
    const element = target.current;
    const text = new SplitType(element, splitOptions);
    const durations = [];

    text.chars?.forEach((char) => {
      const { innerHTML } = char;
      char.innerHTML = `
        <div class="initial-char">${innerHTML}</div>
        <div class="final-char absolute top-0 left-0 translate-y-[150%]">${innerHTML}</div>
      `;

      const delay = random(...delayRange) / 1000;
      const duration = random(...durationRange) / 1000;
      durations.push([delay, duration]);
    });

    setDurations(durations);
  };

  const animateInView = () => {
    const element = target.current;
    if (inView) {
      gsap.to(element?.querySelectorAll(".initial-char"), {
        y: "-150%",
        delay: (index) => {
          const [delay] = durations[index];
          return delay;
        },
        duration: (index) => {
          const [_, duration] = durations[index];
          return duration;
        },
        ease: "power4.in",
      });

      gsap.to(element?.querySelectorAll(".final-char"), {
        y: 0,
        delay: (index) => {
          const [delay, duration] = durations[index];
          return delay + duration;
        },
        duration: (index) => {
          const [_, duration] = durations[index];
          return duration;
        },
        ease: "power4.out",
      });
    }
  };

  useLayoutEffect(splitElement, []);
  useLayoutEffect(animateInView, [inView]);
}
