import { useLayoutEffect, useState } from "react";
import { toBase64 } from "../../helpers/file-helper";
import { Music, Volume2 } from "lucide-react";
import gsap from "gsap";

export function AddFormLastStep({ values, formValues }) {
  const [sound, setSound] = useState("");

  const handleSubmit = () => {
    console.log({
      values,
      sound,
      formValues,
    });
  };

  useLayoutEffect(() => {
    gsap.to("#sound-container", { opacity: 1, duration: 0.3 });
  }, []);

  return (
    <div
      id="sound-container"
      style={{ opacity: 0 }}
      className="h-screen w-screen flex items-center justify-center"
    >
      <h1 className="z-0 absolute top-0 left-0 w-screen text-[15vw] leading-[1] text-center font-little-bubble text-white opacity-80 select-none uppercase">
        Une denriere ?
      </h1>
      <div className="aspect-square w-sm bg-white rotate-3 rounded-4xl shadow-xl">
        <label
          htmlFor="sound-input"
          className="h-full w-full flex items-center justify-center cursor-pointer"
        >
          {sound === "" ? (
            <Volume2 className="h-12 w-12 opacity-40" />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Music className="h-12 w-12 opacity-40" />
              <p className="opacity-70 text-sm">C'est vraiment du lourd</p>
              <audio className="hidden" autoPlay loop>
                <source src={sound} type="audio/mpeg" />
              </audio>
            </div>
          )}
        </label>
        <input
          className="hidden"
          id="sound-input"
          type="file"
          accept="audio/mpeg"
          onChange={(event) => {
            setSound("");
            if (event.target.files) {
              const [file] = event.target.files;
              toBase64(file).then(setSound);
            }
          }}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 border-2 border-black px-6 py-2 rounded-4xl text-xl cursor-pointer bg-gradient-to-l bg-black text-white"
      >
        Envoyer
      </button>
    </div>
  );
}
