import { PlusIcon } from "lucide-react";
import React, { useRef } from "react";

const Memory = ({ image, description, id, selected, add, update, length, maxFiles, switched }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        update(id, { image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (e) => {
    update(id, { description: e.target.value });
  };

  return (
    <div
      className={`w-[30rem] transition-all duration-200 h-[40rem] absolute top-0 left-0 border-5 border-gray-200 rounded-xl  ${
        selected ? (switched ? "show-item" : "slide-up-show") : "hide-item select-none"
      }`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <label htmlFor={id} className="w-full h-full flex justify-center items-center cursor-pointer">
          {image ? (
            <img src={image} alt="Memory" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <div className="w-full h-full flex justify-center items-center bg-gray-200 rounded">
              <span className="text-gray-500">Ajouter une image</span>
            </div>
          )}
        </label>
        <input
          ref={fileInputRef}
          type="file"
          name={id}
          id={id}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="absolute top-0 left-[105%] w-full h-[40%] rounded-b-xl p-4">
        <textarea
          name="description"
          rows={10}
          style={{ resize: "none" }}
          placeholder="A propos de cette image..."
          className=" w-full text-lg font-light border-b border-gray-100 outline-0 text-white p-2 py-3 pt-0 mt-[-0.8rem]"
          value={description}
          onChange={handleDescriptionChange}
        />
        <p className="text-gray-400 text-xs mt-2">Veuillez écrire une description en fonction de l'image.</p>
        <div className="mt-4 flex gap-2 justify-between">
          {description.trim() && image && length < maxFiles ? (
            <button
              className="bg-white inline-flex gap-1 items-center p-5 px-6 hover:scale-95 transition-all duration-200 cursor-pointer rounded-full z-2 text-gray-800"
              onClick={add}
            >
              <span className="font-semibold"> Ajouter un moment </span>
              <PlusIcon color="black" size={22} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Memory;
