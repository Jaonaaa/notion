import { useEffect, useState } from "react";
import { Circle, RectangleHorizontal, Square } from "lucide-react";
import { SquareShape } from "./square-shape";
import { CircleShape } from "./circle-shape";
import { RectangleShape } from "./rectangle-shape";
import gsap from "gsap";

export function AddFunStorySection() {
  const [mode, setMode] = useState("square");
  const [isClickable, setIsClickable] = useState(true);

  const [image, setImage] = useState("");

  const [text, setText] = useState("Set a descirption");
  const [isTextInput, setIsTextInput] = useState(false);
  const toggleTextInput = () => {
    setIsTextInput(!isTextInput);
  };

  const enterShapeAnimation = () => {
    gsap.to("#image-container, #text-container, #emoji-container", {
      scale: 1,
      rotate: "-3deg",
      duration: 1.4,
      stagger: 0.2,
      ease: "elastic.out",
    });
  };

  const exitShapeAnimation = (foo = () => {}) => {
    gsap.to("#image-container, #text-container, #emoji-container", {
      scale: 0,
      rotate: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.in",
      onComplete: foo,
    });
  };

  const handleItemClick = (value) => {
    if (value === mode || !isClickable) {
      return;
    }
    exitShapeAnimation(() => {
      setMode(value);
      setTimeout(() => {
        enterShapeAnimation();
        setIsClickable(true);
      }, 200);
    });
  };

  useEffect(enterShapeAnimation, []);
  useEffect(() => {
    if (isTextInput) {
      gsap.to("#text-input", {
        duration: 0.2,
        opacity: 1,
        onComplete: () => {
          document.querySelector("#text-input textarea").focus();
        },
      });
    }
  }, [isTextInput]);

  return (
    <>
      <div className="fixed flex p-1 rounded-xl bg-white z-10 top-8 left-1/2 -translate-x-1/2 shadow-xl">
        <div
          onClick={() => handleItemClick("square")}
          className="p-2 hover:bg-gray-100 cursor-pointer duration-200 rounded-lg"
          style={{ opacity: mode === "square" ? 1 : 0.3 }}
        >
          <Square className="h-6 w-6" />
        </div>
        <div
          onClick={() => handleItemClick("circle")}
          className="p-2 hover:bg-gray-100 cursor-pointer duration-200 rounded-lg"
          style={{ opacity: mode === "circle" ? 1 : 0.3 }}
        >
          <Circle className="h-6 w-6" />
        </div>
        <div
          onClick={() => handleItemClick("rectangle")}
          className="p-2 hover:bg-gray-100 cursor-pointer duration-200 rounded-lg"
          style={{ opacity: mode === "rectangle" ? 1 : 0.3 }}
        >
          <RectangleHorizontal className="h-6 w-6" />
        </div>
      </div>

      {mode === "square" && (
        <SquareShape
          text={text}
          toggleTextInput={toggleTextInput}
          image={image}
          setImage={setImage}
        />
      )}
      {mode === "circle" && (
        <CircleShape
          text={text}
          toggleTextInput={toggleTextInput}
          image={image}
          setImage={setImage}
        />
      )}
      {mode === "rectangle" && (
        <RectangleShape
          text={text}
          toggleTextInput={toggleTextInput}
          image={image}
          setImage={setImage}
        />
      )}

      {isTextInput && (
        <div
          id="text-input"
          style={{ opacity: 0 }}
          className="fixed z-10 p-4 py-3 w-sm bottom-8 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-xl"
        >
          <textarea
            className="w-full resize-none rounded-lg placeholder-gray-400 outline-none"
            rows="3"
            placeholder="Add a small description"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
            onBlur={() => {
              gsap.to("#text-input", {
                duration: 0.2,
                opacity: 0,
                onComplete: () => {
                  setIsTextInput(false);
                },
              });
            }}
          ></textarea>
        </div>
      )}
    </>
  );
}
