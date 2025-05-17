// import { Gallery } from "./photo/gallery/gallery";

import { useRef } from "react";
import { useScrambleText } from "../hooks/use-scramble-text";

export function Hero() {
  const titleRef = useRef(null);

  useScrambleText({
    target: titleRef,
  });

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <h1 className="text-9xl font-medium text-center leading-[0.9]" ref={titleRef}>
          Learn it <br />
          Tweak it <br />
          Use it
        </h1>
      </div>
    </div>
  );
}
