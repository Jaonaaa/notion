import { useEffect, useState } from "react";
import { Circle, RectangleHorizontal, Square } from "lucide-react";
import { SquareShape } from "./square-shape";
import { CircleShape } from "./circle-shape";
import { RectangleShape } from "./rectangle-shape";
import gsap from "gsap";

export function AddFunStorySection({ index, setIndex, initialValue, setValues, setStep }) {
  const [mode, setMode] = useState(initialValue.disposition);
  const [isClickable, setIsClickable] = useState(true);

  const [image, setImage] = useState(initialValue.image);

  const [text, setText] = useState(initialValue.text);
  const [isTextInput, setIsTextInput] = useState(false);
  const toggleTextInput = () => {
    setIsTextInput(!isTextInput);
  };

  const [emoji, setEmoji] = useState(initialValue.emoji);
  const [isEmojiSelection, setIsEmojiSelection] = useState(false);
  const toggleEmojiSelection = () => {
    setIsEmojiSelection(!isEmojiSelection);
  };

  const enterShapeAnimation = () => {
    gsap.to("#image-container, #text-container, #emoji-container", {
      scale: 1,
      rotate: "-3deg",
      duration: 1.4,
      stagger: 0.2,
      ease: "elastic.out",
    });
    gsap.to("#button-container button", {
      scale: 1,
      duration: 1.4,
      stagger: 0.2,
      ease: "elastic.out",
    });
    gsap.to("#navigation", {
      opacity: 1,
      duration: 0.2,
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

  const handleExit = (foo = () => {}) => {
    gsap.to("#navigation", {
      opacity: 0,
      duration: 0.2,
    });
    gsap.to("#image-container, #text-container, #emoji-container, #button-container button", {
      scale: 0,
      rotate: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.in",
      onComplete: foo,
    });
  };

  const handleNavigation = (newIndex) => {
    setValues((oldValues) => {
      const newValues = [...oldValues];
      newValues[index] = { text, image, disposition: mode, emoji };

      return newValues;
    });

    handleExit(() => {
      setTimeout(() => {
        setIndex(newIndex);
      }, 200);
    });
  };

  const handlePrevious = () => {
    handleNavigation(index - 1);
  };

  const handleNext = () => {
    handleNavigation(index + 1);
  };

  const handleSubmit = () => {
    setValues((oldValues) => {
      const newValues = [...oldValues];
      newValues[index] = { text, image, disposition: mode, emoji };

      return newValues;
    });
    gsap.to("#add-fun-one-step", {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setStep(2);
      },
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
  useEffect(() => {
    if (isEmojiSelection) {
      document.querySelector("#emoji-list-container").focus();
      gsap.to("#emoji-list-container", {
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          gsap.to("#emoji-list-container div", {
            opacity: 1,
            duration: 0.2,
            stagger: 0.02,
          });
        },
      });
    }
  }, [isEmojiSelection]);

  return (
    <div id="add-fun-one-step" className="relative h-screen w-screen">
      <h1 className="z-0 absolute top-0 left-0 w-screen text-[18.5vw] leading-[1] text-center font-little-bubble text-white opacity-60 select-none uppercase">
        On t'écoute
      </h1>

      <div
        id="navigation"
        className="fixed flex p-1 rounded-xl bg-white z-10 top-8 left-1/2 -translate-x-1/2 shadow-xl"
        style={{ opacity: 0 }}
      >
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
          emoji={emoji}
          setImage={setImage}
          toggleEmojiSelection={toggleEmojiSelection}
        />
      )}
      {mode === "circle" && (
        <CircleShape
          text={text}
          toggleTextInput={toggleTextInput}
          image={image}
          emoji={emoji}
          setImage={setImage}
          toggleEmojiSelection={toggleEmojiSelection}
        />
      )}
      {mode === "rectangle" && (
        <RectangleShape
          text={text}
          toggleTextInput={toggleTextInput}
          image={image}
          emoji={emoji}
          setImage={setImage}
          toggleEmojiSelection={toggleEmojiSelection}
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

      <div id="button-container" className="fixed w-screen flex z-10 bottom-8 left-0 px-8 gap-2">
        {index === 0 ? (
          <div></div>
        ) : (
          <button
            className="border-2 px-6 py-2 rounded-4xl text-xl cursor-pointer"
            style={{ scale: 0 }}
            onClick={handlePrevious}
          >
            Précédent
          </button>
        )}
        <button
          className="border-2 border-black px-6 py-2 rounded-4xl text-xl cursor-pointer bg-black text-white ml-auto"
          style={{ scale: 0 }}
          onClick={handleNext}
        >
          Suivant
        </button>
        {index >= 3 && (
          <button
            className="border-2 border-white px-6 py-2 rounded-4xl text-xl cursor-pointer bg-gradient-to-l bg-white text-black"
            style={{ scale: 0 }}
            onClick={handleSubmit}
          >
            Terminer
          </button>
        )}
      </div>

      {isEmojiSelection && (
        <div
          id="emoji-list-container"
          className="fixed z-10 p-3 bottom-8 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-xl grid grid-cols-4 gap-2 select-none outline-none"
          style={{ scale: 0, transformOrigin: "center bottom" }}
          tabIndex={1}
          onBlur={() => {
            gsap.to("#emoji-list-container", {
              opacity: 0,
              duration: 0.2,
              onComplete: toggleEmojiSelection,
            });
          }}
        >
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                style={{ opacity: 0 }}
                className={`p-2 rounded-lg hover:bg-gray-100 duration-200 cursor-pointer ${
                  `/emojies/${i + 1}.png` == emoji ? "bg-gray-100" : "bg-white"
                }`}
              >
                <img
                  src={`/emojies/${i + 1}.png`}
                  className="w-8 h-8"
                  onClick={() => {
                    setEmoji(`/emojies/${i + 1}.png`);
                  }}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
