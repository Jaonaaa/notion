import React, { useEffect, useState } from "react";
import ListMemory from "./list-memory";

const AddSimpleMemory = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toogleModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    setPageLoaded(true);
  }, []);
  return (
    <div className={`min-h-screen bg-black transition-opacity duration-1000 ${pageLoaded ? "animate-page-enter" : "opacity-0"}`}>
      <div className="bg-gradient-to-t from-[#191920] to-[#0A0B0E] h-[100vh] w-full flex justify-center items-center">
        <div className="w-[100vw] relative overflow-y-clip h-full flex flex-col justify-center items-center">
          <main className="w-full items-center flex justify-center">
            <ListMemory toogleModal={toogleModal} showModal={showModal} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AddSimpleMemory;
