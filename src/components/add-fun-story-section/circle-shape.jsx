import { Image } from "lucide-react";
import { toBase64 } from "../../helpers/file-helper";

export function CircleShape({
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
          className="h-full w-full rounded-full overflow-hidden p-2 bg-white"
        >
          <label
            htmlFor="input-image"
            className="h-full w-full flex items-center justify-center cursor-pointer"
          >
            {image != "" ? (
              <img className="h-full w-full object-cover rounded-full" src={image} />
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
          className="absolute max-w-48 w-fit bottom-8 -left-4 p-3 px-3.5 bg-white rounded-2xl text-sm cursor-pointer shadow-xl"
          onClick={toggleTextInput}
        >
          <p className="opacity-50">Ajouter une petite description</p>
          <p className="mt-1.5 leading-[1.25]">{text}</p>
        </div>

        <div
          id="emoji-container"
          style={{ scale: 0 }}
          className="absolute w-24 h-24 top-4 -right-0 p-3 px-3.5 bg-white rounded-full cursor-pointer"
          onClick={toggleEmojiSelection}
        >
          <img className="h-full w-full" src={emoji} />
        </div>
      </div>
    </div>
  );
}
