import gsap from "gsap";
import { useEffect, useState } from "react";

export function AddFunInitialForm({ formValues, setFormValues, setStep }) {
  const [title, setTitle] = useState(formValues.title);
  const [date, setDate] = useState(formValues.date);
  const [description, setDescription] = useState(formValues.description);

  const handleSubmit = () => {
    setFormValues({ title, description, date });
    gsap.to("#add-fun-base-form", {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setStep(1);
        setTimeout(() => {
          gsap.to("#add-fun-steps-container", {
            opacity: 1,
            duration: 0.3,
          });
        }, 200);
      },
    });
  };

  useEffect(() => {
    gsap.to("#add-fun-base-form", {
      opacity: 1,
      duration: 0.3,
    });
  }, []);

  return (
    <div
      id="add-fun-base-form"
      style={{ opacity: 0 }}
      className="w-screen h-screen relative bg-gradient-to-b from-rose-200 to-red-100 flex items-center justify-center"
    >
      <h1 className="absolute top-0 left-0 w-screen text-[12.5vw] leading-[1] text-center font-little-bubble text-white opacity-60 select-none uppercase">
        Pour commencer
      </h1>
      <div className="w-sm p-6 bg-white -rotate-3 rounded-4xl shadow-xl">
        <input
          type="text"
          className="border-b border-[#ddd] w-full p-1 outline-none placeholder-gray-400"
          placeholder="Titre"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          className="border-b border-[#ddd] w-full p-1 outline-none placeholder-gray-400 mt-6"
          placeholder="24.05.2024"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <textarea
          className="w-full resize-none placeholder-gray-400 outline-none border-b border-[#ddd] mt-6"
          rows="4"
          placeholder="Une petite description de ton histoire"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 border-2 border-black px-6 py-2 rounded-4xl text-xl cursor-pointer bg-gradient-to-l bg-black text-white"
      >
        Suivant
      </button>
    </div>
  );
}
