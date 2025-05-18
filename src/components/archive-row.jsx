import { useRef } from "react";
import "./archive-row.css";

export function ArchiveRow({ text, author, date, image, onClick = () => {} }) {
  const elementRef = useRef(null);

  return (
    <div
      ref={elementRef}
      className="w-full relative flex font-bold gap-2 text-xl px-3 py-1 cursor-pointer hover:bg-black hover:text-white duration-200 archive-row opacity-0 row-archive"
      onClick={onClick}
    >
      <div className="w-3/5">{text}</div>
      <div className="w-1/5">{author}</div>
      <div className="w-1/5 text-right">{date}</div>
      <img
        src={image}
        className="absolute top-1/2 -translate-y-1/2 left-2/5 h-80 aspect-[12/15] object-cover -z-10 opacity-0 duration-100 pointer-events-none"
      />
    </div>
  );
}
