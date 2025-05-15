import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ParallaxImage({
  image,
  className,
  scrollOptions = {
    offset: ["start end", "end start"],
  },
  transformOptions = {
    inputs: [0, 1],
    outputs: ["-30%", "30%"],
  },
}) {
  const containerRef = (useRef < HTMLDivElement) | (null > null);

  const { scrollYProgress: progress } = useScroll({
    ...scrollOptions,
    target: containerRef,
  });
  const y = useTransform(progress, [...transformOptions.inputs], [...transformOptions.outputs]);

  return (
    <div ref={containerRef} className={`${className} overflow-hidden`}>
      <motion.img
        style={{ y }}
        className="w-full h-full object-cover"
        src={image.source}
        alt={image.alt}
      />
    </div>
  );
}
