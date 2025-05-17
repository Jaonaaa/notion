import { Image } from "lucide-react";
import { toBase64 } from "../../helpers/file-helper";

export function SquareShape({ text, toggleTextInput, image, setImage }) {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-gradient-to-b from-gray-200 to-red-100">
      <div id="content-container" style={{ aspectRatio: "1" }} className="w-96 relative">
        <div
          id="image-container"
          style={{ scale: 0 }}
          className="h-full w-full rounded-4xl overflow-hidden bg-white cursor-pointer"
        >
          <label
            htmlFor="input-image"
            className="h-full w-full flex items-center justify-center cursor-pointer"
          >
            {image != "" ? (
              <img className="h-full w-full object-cover rounded-4xl" src={image} />
            ) : (
              <Image className="h-12 w-12 opacity-40" />
            )}
          </label>
          <input
            id="input-image"
            type="file"
            className="hidden"
            onChange={(event) => {
              if (event.target.files) {
                const [file] = event.target.files;
                toBase64(file).then(setImage);
              }
            }}
          />
        </div>

        <div
          id="text-container"
          style={{ scale: 0 }}
          className="absolute max-w-48 w-fit bottom-2 -left-16 p-3 px-3.5 bg-white rounded-2xl text-sm cursor-pointer shadow-xl"
          onClick={toggleTextInput}
        >
          <p className="opacity-50">A little Description</p>
          <p className="mt-1.5 leading-[1.25]">{text}</p>
        </div>

        <div
          id="emoji-container"
          style={{ scale: 0 }}
          className="absolute w-48 h-48 -top-20 -right-16 p-3 px-3.5 cursor-pointer"
        >
          <img
            className="h-full w-full"
            src="https://cdn.prod.website-files.com/667ad2c31e593132fcd80f3d/667ad2c31e593132fcd80f70_icon-3d-fire-p-500.png"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
