import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { SplitText } from "gsap/all";
import { RoadSVG } from "../components/svg/road-svg";

import gsap from "gsap";
import styles from "./story.module.scss";

gsap.registerPlugin(SplitText);

const paragraphs = [
  `Ten more steps. If he could take ten more steps it would be over, but his legs wouldn't move. He tried to will them to work, but they wouldn't listen to his brain. Ten more steps and it would be over but it didn't appear he would be able to do it.`,
  `She put the pen to paper but she couldn't bring herself to actually write anything. She just stared at the blank card and wondered what words she could write that would help in even a small way. She thought of a dozen ways to begin but none seemed to do justice to the situation. There were no words that could help and she knew it.`,
  `She was aware that things could go wrong. In fact, she had trained her entire life in anticipation that things would go wrong one day. She had quiet confidence as she started to see that this was the day that all her training would be worthwhile and useful. At this point, she had no idea just how wrong everything would go that day.`,
  `She didn't like the food. She never did. She made the usual complaints and started the tantrum he knew was coming. But this time was different. Instead of trying to placate her and her unreasonable demands, he just stared at her and watched her meltdown without saying a word.`,
  `The headache wouldn't go away. She's taken medicine but even that didn't help. The monstrous throbbing in her head continued. She had this happen to her only once before in her life and she realized that only one thing could be happening.`,
  `Twenty-five stars were neatly placed on the piece of paper. There was room for five more stars but they would be difficult ones to earn. It had taken years to earn the first twenty-five, and they were considered the "easy" ones.`,
  `Her breath exited her mouth in big puffs as if she were smoking a cigarette. The morning dew had made her clothes damp and she shivered from the chill in the air. There was only one thing that could get her up and out this early in the morning.`,
  `Twenty-five stars were neatly placed on the piece of paper. There was room for five more stars but they would be difficult ones to earn. It had taken years to earn the first twenty-five, and they were considered the "easy" ones.`,
];

export function Story() {
  const container = useRef(null);
  const [overlayOffset, setOverlayOffset] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(1);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useLayoutEffect(() => {
    gsap.set(`.${styles.overlay}, .${styles.content} p`, { opacity: 1, delay: 0.2 });
    gsap.to(`#description-${currentParagraph} .${styles.description}`, {
      y: 0,
      duration: 0.9,
      stagger: 0.04,
      ease: "power4.out",
      delay: 0.5,
    });
  }, []);

  const overflayOffsetTransform = useTransform(scrollYProgress, [0, 1], [0, 100]);
  useMotionValueEvent(overflayOffsetTransform, "change", (value) => {
    value = value / 100;
    const nextStep = currentParagraph / 8;
    const previousStep = (currentParagraph - 1) / 8;
    if (value >= nextStep && nextStep != 1) {
      gsap.to(`#description-${currentParagraph} .${styles.description}`, {
        y: "-100%",
        duration: 0.2,
        stagger: 0.02,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(`#description-${currentParagraph} .${styles.description}`, { y: "100%" });
          gsap.to(`#description-${currentParagraph + 1} .${styles.description}`, {
            y: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: "power4.out",
            delay: 0.2,
          });
          setCurrentParagraph(currentParagraph + 1);
        },
      });
    }
    if (value < previousStep) {
      gsap.to(`#description-${currentParagraph} .${styles.description}`, {
        y: "-100%",
        duration: 0.2,
        stagger: 0.02,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(`#description-${currentParagraph} .${styles.description}`, { y: "100%" });
          gsap.to(`#description-${currentParagraph - 1} .${styles.description}`, {
            y: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: "power4.out",
            delay: 0.2,
          });
          setCurrentParagraph(currentParagraph - 1);
        },
      });
    }
  });
  useMotionValueEvent(overflayOffsetTransform, "change", (value) => {
    setOverlayOffset(value);
  });

  const image1OpacityTransform = useTransform(scrollYProgress, [0, 0.115, 0.125], [1, 1, 0]);
  const image2OpacityTransform = useTransform(
    scrollYProgress,
    [0.115, 0.125, 0.24, 0.25],
    [0, 1, 1, 0]
  );
  const image3OpacityTransform = useTransform(
    scrollYProgress,
    [0.24, 0.25, 0.365, 0.375],
    [0, 1, 1, 0]
  );
  const image4OpacityTransform = useTransform(
    scrollYProgress,
    [0.365, 0.375, 0.49, 0.5],
    [0, 1, 1, 0]
  );
  const image5OpacityTransform = useTransform(
    scrollYProgress,
    [0.49, 0.5, 0.615, 0.625],
    [0, 1, 1, 0]
  );
  const image6OpacityTransform = useTransform(
    scrollYProgress,
    [0.615, 0.625, 0.74, 0.75],
    [0, 1, 1, 0]
  );
  const image7OpacityTransform = useTransform(
    scrollYProgress,
    [0.74, 0.75, 0.865, 0.875],
    [0, 1, 1, 0]
  );
  const image8OpacityTransform = useTransform(scrollYProgress, [0.86, 0.875, 1], [0, 1, 1]);

  return (
    <>
      <div ref={container} className={styles.container}>
        <div className={styles.content}>
          <motion.img style={{ opacity: image1OpacityTransform }} src="/images/11.png" />
          <motion.img style={{ opacity: image2OpacityTransform }} src="/images/12.png" />
          <motion.img style={{ opacity: image3OpacityTransform }} src="/images/1.png" />
          <motion.img style={{ opacity: image4OpacityTransform }} src="/images/2.png" />
          <motion.img style={{ opacity: image5OpacityTransform }} src="/images/3.png" />
          <motion.img style={{ opacity: image6OpacityTransform }} src="/images/4.png" />
          <motion.img style={{ opacity: image7OpacityTransform }} src="/images/5.png" />
          <motion.img style={{ opacity: image8OpacityTransform }} src="/images/6.png" />
          <RoadSVG className={styles.road} dashOffset={100} />
          <RoadSVG className={`${styles.road} ${styles.overlay}`} dashOffset={overlayOffset} />

          {paragraphs.map((paragraph, index) => (
            <SplitDescription key={index + 1} id={`description-${index + 1}`}>
              {paragraph}
            </SplitDescription>
          ))}
        </div>
      </div>
    </>
  );
}

function SplitDescription({ id, children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) {
      new SplitText(ref.current, {
        type: "lines",
        mask: "lines",
        linesClass: styles.description,
        onSplit: (split) => {
          gsap.set(split.lines, { y: "100%" });
        },
      });
    }
  }, []);

  return (
    <p ref={ref} id={id}>
      {children}
    </p>
  );
}
