import { FunStoryItem } from "../components/fun-story-page/fun-story-item";

const items = [
  {
    text: "Image 1 — Hello my G",
    emoji: "/emojies/1.png",
    image: "/images/1.png",
    index: 0,
    defaultPosition: "center",
    displayMode: "rectangle",
  },
  {
    text: "Image 2 — Really really cool",
    emoji: "/emojies/2.png",
    image: "/images/2.png",
    index: 1,
    defaultPosition: "right",
    displayMode: "square",
  },
  {
    text: "Image 3 — I think it's pretty nice",
    emoji: "/emojies/3.png",
    image: "/images/3.png",
    index: 2,
    defaultPosition: "longRight",
    displayMode: "square",
  },
  {
    text: "Image 4 — And this is the end",
    emoji: "/emojies/4.png",
    image: "/images/4.png",
    index: 3,
    defaultPosition: "longRight",
    displayMode: "circle",
  },
];

export function FunStoryPage() {
  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ backgroundImage: "linear-gradient(to bottom, #fee2e2, #d1fae5)" }}
      id="gradient-background-fun"
    >
      <h1 className="absolute top-0 left-0 w-screen text-[21.5vw] leading-[1] text-center font-little-bubble text-white opacity-60 select-none uppercase">
        Profitons
      </h1>
      {items.map((item, index) => (
        <FunStoryItem key={index} {...item} />
      ))}
    </div>
  );
}
