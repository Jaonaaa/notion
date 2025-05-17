import gsap from "gsap";
import { useEffect, useState } from "react";
import { animateEmojies } from "../add-fun-story-section/animate-emojies";

const gradients = [
  "linear-gradient(to bottom, #fee2e2, #d1fae5)", // from-red-100 to-green-100
  "linear-gradient(to bottom, #fce7f3, #f3f4f6)", // from-pink-100 to-gray-100
  "linear-gradient(to bottom, #fef3c7, #dbeafe)", // from-yellow-100 to-blue-100
  "linear-gradient(to bottom, #f3f4f6, #ffe4e6)", // from-gray-100 to-rose-100
  "linear-gradient(to bottom, #fce7f3, #ede9fe)", // from-pink-100 to-violet-100
  "linear-gradient(to bottom, #fee2e2, #dbeafe)", // from-red-100 to-blue-100
  "linear-gradient(to bottom, #e0e7ff, #dbeafe)", // from-indigo-100 to-blue-100
  "linear-gradient(to bottom, #d1fae5, #fee2e2)", // from-green-100 to-red-100
];

const place = {
  center: {
    top: "50vh",
    left: "50vw",
    y: "-50%",
    x: "-50%",
    scale: 1,
    rotate: "-3deg",
    opacity: 1,
    cursor: "default",
  },
  right: {
    top: "50vh",
    left: "100vw",
    y: "-45%",
    x: "-60%",
    scale: 0.6,
    rotate: "10deg",
    cursor: "pointer",
    opacity: 1,
  },
  longRight: {
    top: "50vh",
    left: "150vw",
    y: "-45%",
    x: "-60%",
    scale: 0.6,
    rotate: "10deg",
    cursor: "pointer",
    opacity: 1,
  },
  left: {
    top: "50vh",
    left: "0vw",
    y: "-45%",
    x: "-40%",
    scale: 0.6,
    rotate: "-10deg",
    cursor: "pointer",
    opacity: 1,
  },
  longLeft: {
    top: "50vh",
    left: "-50vw",
    y: "-45%",
    x: "-40%",
    scale: 0.6,
    rotate: "-10deg",
    cursor: "pointer",
    opacity: 1,
  },
};

export function FunStoryItem({ image, text, emoji, displayMode, index, defaultPosition }) {
  const handleEmojiClick = () => {
    animateEmojies(emoji);
  };

  const handleClick = () => {
    gsap.to(`#fun-content-${index}`, { ...place.center, duration: 1.2, ease: "power3.out" });
    gsap.to(`#fun-content-${index - 1}`, { ...place.left, duration: 1.2, ease: "power3.out" });
    gsap.to(`#fun-content-${index - 2}`, { ...place.longLeft, duration: 1.2, ease: "power3.out" });
    gsap.to(`#fun-content-${index + 1}`, { ...place.right, duration: 1.2, ease: "power3.out" });
    gsap.to(`#fun-content-${index + 2}`, { ...place.longRight, duration: 1.2, ease: "power3.out" });
    gsap.to("#gradient-background-fun", { backgroundImage: gradients[index], duration: 0.4 });
  };

  useEffect(() => {
    gsap.set(`#fun-content-${index}`, { ...place[defaultPosition] });
  }, []);

  return (
    <>
      {displayMode === "square" && (
        <div
          id={`fun-content-${index}`}
          style={{ aspectRatio: "1", opacity: 0 }}
          className="w-96 absolute"
          onClick={handleClick}
        >
          <div className="h-full w-full flex items-center justify-center cursor-pointer">
            <img className="h-full w-full object-cover rounded-4xl" src={image} />
          </div>

          <div className="absolute max-w-48 w-fit bottom-2 -left-16 p-3 px-3.5 bg-white rounded-2xl text-sm shadow-xl text-container">
            <p className="leading-[1.25]">{text}</p>
          </div>

          <div className="absolute w-48 h-48 -top-20 -right-16 p-3 px-3.5 cursor-pointer">
            <img className="h-full w-full" src={emoji} onClick={handleEmojiClick} />
          </div>
        </div>
      )}
      {displayMode === "circle" && (
        <div
          id={`fun-content-${index}`}
          style={{ aspectRatio: "1", opacity: 0 }}
          className="w-96 absolute"
          onClick={handleClick}
        >
          <div className="h-full w-full rounded-full overflow-hidden p-2 bg-white">
            <img className="h-full w-full object-cover rounded-full" src={image} />
          </div>

          <div className="absolute max-w-48 w-fit bottom-8 -left-4 p-3 px-3.5 bg-white rounded-2xl text-sm shadow-xl text-container">
            <p className="leading-[1.25]">{text}</p>
          </div>

          <div className="absolute w-24 h-24 top-4 -right-0 p-3 px-3.5 bg-white rounded-full cursor-pointer emoji-container">
            <img className="h-full w-full" src={emoji} onClick={handleEmojiClick} />
          </div>
        </div>
      )}
      {displayMode === "rectangle" && (
        <div
          id={`fun-content-${index}`}
          style={{ aspectRatio: "1.5", opacity: 0 }}
          className="w-lg absolute"
          onClick={handleClick}
        >
          <div className="h-full w-full rounded-4xl overflow-hidden bg-white">
            <img className="h-full w-full object-cover rounded-4xl" src={image} />
          </div>

          <div className="absolute max-w-48 w-fit bottom-2 -left-16 p-3 px-3.5 bg-white rounded-2xl text-sm shadow-xl text-container">
            <p className="leading-[1.25]">{text}</p>
          </div>

          <div className="absolute w-48 h-48 -top-20 -right-16 p-3 px-3.5 cursor-pointer">
            <img className="h-full w-full" src={emoji} onClick={handleEmojiClick} />
          </div>
        </div>
      )}
    </>
  );
}
