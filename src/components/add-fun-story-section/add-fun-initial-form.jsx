export function AddFunInitialForm() {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-rose-200 to-red-100 flex items-center justify-center">
      <div className="w-lg bg-white py-8 px-5 rounded-2xl shadow-lg">
        <h1 className="text-2xl text-center font-little-bubble">Raconte-nous ton histoire</h1>
        <div className="mt-8"></div>
        <div className="flex flex-col gap-0.5">
          <input
            type="text"
            id="title"
            className="w-full outline-none border-b border-gray-300 px-2 py-1"
            placeholder="Titre"
          />
        </div>
        <div className="flex flex-col gap-0.5 mt-8">
          <textarea
            className="w-full resize-none rounded-lg outline-none px-2 border-b border-gray-300"
            rows="5"
            placeholder="Description"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
