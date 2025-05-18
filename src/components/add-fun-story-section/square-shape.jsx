import { Image } from "lucide-react";
import { toBase64 } from "../../helpers/file-helper";

export function SquareShape({
  text,
  toggleTextInput,
  image,
  setImage,
  emoji,
  toggleEmojiSelection,
}) {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
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
          <p className="opacity-50">Ajouter une petite description</p>
          <p className="mt-1.5 leading-[1.25]">{text}</p>
        </div>

        <div
          id="emoji-container"
          style={{ scale: 0 }}
          className="absolute w-48 h-48 -top-20 -right-16 p-3 px-3.5 cursor-pointer"
          onClick={toggleEmojiSelection}
        >
          <img className="h-full w-full" src={emoji} />
        </div>
      </div>
    </div>
  );
}
