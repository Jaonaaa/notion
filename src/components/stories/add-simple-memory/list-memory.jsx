import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import "./index.sass";
import Memory from "./memory";
import ModalSong from "./modal-song";
import { addMemories } from "../../../queries/add-simple-memory";

const ListMemory = ({ toogleModal, showModal }) => {
  const [hideList, setHideList] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [musicFile, setMusicFile] = useState(null);
  const [memories, setMemories] = useState([
    {
      id: Date.now(),
      image: null,
      description: "A propos de cette image...",
    },
  ]);
  const [switched, setSwitched] = useState(false);
  const maxFiles = 8;
  const [selectedMemory, setSelectedMemory] = useState(0);

  const handleSubmit = () => {
    setHideList(false);
  };

  const updateMemoryById = (id, updatedData) => {
    setMemories((prevMemories) => prevMemories.map((memory) => (memory.id === id ? { ...memory, ...updatedData } : memory)));
  };

  const isFormValid = useMemo(() => {
    return title.trim() !== "" && description.trim() !== "";
  }, [title, description]);

  const addNewMemory = () => {
    setSwitched(true);
    if (memories.length >= maxFiles) {
      return;
    }
    setMemories((prevMemories) => {
      setSelectedMemory(prevMemories.length);
      return [
        ...prevMemories,
        {
          id: Date.now(),
          image: null,
          description: "",
        },
      ];
    });
  };

  const send = async () => {
    if (musicFile) {
      const payload = {
        titre: title,
        contenu: description,
        audio: musicFile,
        date: date,
        image: memories[0]?.image || null,
        elements: memories.map((memory) => ({
          titre: memory.title || "Sans titre",
          description: memory.description,
          media: memory.image,
        })),
      };
      await addMemories(payload);
    }
  };

  const areMemoriesValid = useMemo(() => {
    return memories.length >= 4 && memories.every((memory) => memory.description?.trim() !== "" && memory.image);
  }, [memories]);

  return (
    <>
      {showModal && <ModalSong send={send} setMusic={setMusicFile} toogleModal={toogleModal} />}
      <div
        className={`flex absolute left-[50%] -translate-x-[50%] items-center gap-[4rem] flex-col ${
          !hideList ? "slide-down-hide select-none" : ""
        }`}
      >
        <div className="w-4rem max-w-[4rem] rotate-6 flex  items-center">
          <img
            src="https://file.aiquickdraw.com/imgcompressed/img/compressed_18c8a4ad67ba185eb2d467e00e9e3feb.webp"
            alt="Memory"
            className="w-full h-full object-cover select-none"
          />
        </div>
        <div className="w-[36rem] flex flex-col gap-[3rem]">
          <div className="w-full">
            <input
              type="text"
              name="title"
              placeholder="Le titre de ton histoire..."
              onChange={(e) => setTitle(e.target.value)}
              className=" w-full text-2xl border-b border-gray-100 outline-0 text-white p-4 py-3"
            />
          </div>
          <div className="w-full">
            <textarea
              name="description"
              type="text"
              rows={7}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Parle nous de ton histoire..."
              className=" w-full text-2xl border-b border-gray-100 outline-0 text-white px-4 py-3"
            />
          </div>
          <div className="w-full">
            <div className="w-full">
              <input
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-2xl border-b border-gray-100 outline-0 text-white p-4 py-3 bg-transparent"
              />
            </div>
          </div>
        </div>
        <button
          className="bg-[#fff] group text-gray-800 uppercase border-gray-100 rounded-full hover:text-white hover:bg-[#191920] px-[4rem] inline-flex py-5 hover:scale-95 cursor-pointer transition-all duration-300 items-center"
          onClick={() => {
            if (isFormValid) {
              handleSubmit();
            }
          }}
        >
          <span className="font-medium ">SUIVANT</span>
          <span>
            <ArrowRight className=" ml-2.5 text-gray-800 group-hover:text-white transition-all duration-300 " size={18} />
          </span>
        </button>
      </div>
      {!hideList ? (
        <div className="w-[100vw] flex flex-col items-center justify-center gap-[2rem] absolute left-[50%] -translate-x-[50%]">
          <div className="mr-[20%] relative w-[25rem] h-[40rem]">
            {memories.map((memory, index) => (
              <Memory
                description={memory.description}
                title={memory.title}
                image={memory.image}
                key={memory.id}
                id={memory.id}
                selected={selectedMemory === index}
                add={addNewMemory}
                update={updateMemoryById}
                length={memories.length}
                maxFiles={maxFiles}
                switched={switched}
              />
            ))}
          </div>
        </div>
      ) : null}
      {!hideList && (
        <div className="flex absolute gap-5 bottom-[5rem] items-baseline left-[50%] text-2xl -translate-x-[50%] z-1 text-white">
          {selectedMemory > 0 && (
            <button
              className="bg-[#fff] p-3 rounded-full hover:scale-95 transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedMemory((prev) => prev - 1)}
            >
              <ArrowLeft color="#000" size={20} />
            </button>
          )}
          {selectedMemory < memories.length - 1 && memories[selectedMemory].description.trim() && memories[selectedMemory].image && (
            <button
              className="bg-[#fff] p-3 rounded-full hover:scale-95 transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedMemory((prev) => prev + 1)}
            >
              <ArrowRight color="#000" size={20} />
            </button>
          )}
        </div>
      )}
      {!hideList && (
        <div className="flex absolute gap-2.5 bottom-[1.5rem] items-baseline left-[50%] text-2xl -translate-x-[50%] z-1 text-white">
          <span className="text-3xl"> {selectedMemory + 1} </span>
          <span className="text-[2rem]"> / </span>
          <span className="opacity-60"> 8 </span>
        </div>
      )}
      l
      {areMemoriesValid ? (
        <button
          onClick={toogleModal}
          className="fixed bottom-7 right-7 border-white border-2 text-white inline-flex gap-1 items-center p-5 px-8 hover:scale-95 transition-all duration-200 cursor-pointer rounded-full z-2 "
        >
          <span className="font-semibold"> Suivant </span>
          <ArrowRight color="white" size={22} />
        </button>
      ) : null}
    </>
  );
};

export default ListMemory;
