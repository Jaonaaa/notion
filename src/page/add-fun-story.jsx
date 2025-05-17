import { useEffect, useState } from "react";
import { AddFunInitialForm } from "../components/add-fun-story-section/add-fun-initial-form";
import { AddFunStorySection } from "../components/add-fun-story-section/add-fun-story-section";
import { AddFormLastStep } from "../components/add-fun-story-section/add-fun-last-step";

const gradients = [
  "from-red-100 to-green-100",
  "from-pink-100 to-gray-100",
  "from-yellow-100 to-blue-100",
  "from-gray-100 to-rose-100",
  "from-pink-100 to-violet-100",
  "from-red-100 to-blue-100",
  "from-indigo-100 to-blue-100",
  "from-green-100 to-red-100",
];

export function AddFunStory() {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);

  const [formValues, setFormValues] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [values, setValues] = useState([
    {
      text: "Set a descirption",
      image: "",
      disposition: "square",
      emoji: "/emojies/1.png",
    },
    {
      text: "Set a descirption",
      image: "",
      disposition: "square",
      emoji: "/emojies/1.png",
    },
    {
      text: "Set a descirption",
      image: "",
      disposition: "square",
      emoji: "/emojies/1.png",
    },
    {
      text: "Set a descirption",
      image: "",
      disposition: "square",
      emoji: "/emojies/1.png",
    },
    {
      text: "Set a descirption",
      image: "",
      disposition: "square",
      emoji: "/emojies/1.png",
    },
    {
      text: "Set a descirption",
      image: "",
      disposition: "square",
      emoji: "/emojies/1.png",
    },
    {
      text: "Set a descirption",
      image: "",
      disposition: "square",
      emoji: "/emojies/1.png",
    },
    {
      text: "Set a descirption",
      image: "",
      disposition: "square",
      emoji: "/emojies/1.png",
    },
  ]);

  useEffect(() => {
    if (document.getElementById("add-fun-container")) {
      document.getElementById(
        "add-fun-container"
      ).className = `duration-500 bg-gradient-to-b ${gradients[index]}`;
    }
  }, [index]);

  return (
    <div id="add-fun-container" className="duration-500 bg-gradient-to-b from-green-100 to-red-100">
      {/* Tailwind gradients, do not remove. if you remove, you are gay! */}
      <div className="hidden bg-gradient-to-b from-red-100 to-green-100"></div>
      <div className="hidden bg-gradient-to-b from-pink-100 to-gray-100"></div>
      <div className="hidden bg-gradient-to-b from-yellow-100 to-blue-100"></div>
      <div className="hidden bg-gradient-to-b from-gray-100 to-rose-100"></div>
      <div className="hidden bg-gradient-to-b from-pink-100 to-violet-100"></div>
      <div className="hidden bg-gradient-to-b from-red-100 to-blue-100"></div>
      <div className="hidden bg-gradient-to-b from-indigo-100 to-blue-100"></div>
      <div className="hidden bg-gradient-to-b from-green-100 to-red-100"></div>
      {step === 0 && (
        <AddFunInitialForm
          formValues={formValues}
          setFormValues={setFormValues}
          setStep={setStep}
        />
      )}
      {step === 1 && (
        <div id="add-fun-steps-container" style={{ opacity: 0 }}>
          {index == 0 && (
            <AddFunStorySection
              index={0}
              initialValue={values[0]}
              setValues={setValues}
              setIndex={setIndex}
              setStep={setStep}
            />
          )}
          {index == 1 && (
            <AddFunStorySection
              index={1}
              initialValue={values[1]}
              setValues={setValues}
              setIndex={setIndex}
              setStep={setStep}
            />
          )}
          {index == 2 && (
            <AddFunStorySection
              index={2}
              initialValue={values[2]}
              setValues={setValues}
              setIndex={setIndex}
              setStep={setStep}
            />
          )}
          {index == 3 && (
            <AddFunStorySection
              index={3}
              initialValue={values[3]}
              setValues={setValues}
              setIndex={setIndex}
              setStep={setStep}
            />
          )}
          {index == 4 && (
            <AddFunStorySection
              index={4}
              initialValue={values[4]}
              setValues={setValues}
              setIndex={setIndex}
              setStep={setStep}
            />
          )}
          {index == 5 && (
            <AddFunStorySection
              index={5}
              initialValue={values[5]}
              setValues={setValues}
              setIndex={setIndex}
              setStep={setStep}
            />
          )}
          {index == 6 && (
            <AddFunStorySection
              index={6}
              initialValue={values[6]}
              setValues={setValues}
              setIndex={setIndex}
              setStep={setStep}
            />
          )}
          {index == 7 && (
            <AddFunStorySection
              index={7}
              initialValue={values[7]}
              setValues={setValues}
              setIndex={setIndex}
              setStep={setStep}
            />
          )}
        </div>
      )}
      {step === 2 && <AddFormLastStep values={values} formValues={formValues} />}
    </div>
  );
}
