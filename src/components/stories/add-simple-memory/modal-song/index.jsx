import { Music2, XIcon, Play, Pause } from "lucide-react";
import React, { useRef, useState } from "react";

const ModalSong = ({ toogleModal, setMusic, send }) => {
  const [show, setShow] = useState(true);
  const [musicFile, setMusicFile] = useState(null);
  const [musicUrl, setMusicUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMusicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMusic(reader.result);
      };
      reader.readAsDataURL(file);
      setMusicUrl(URL.createObjectURL(file));
      setIsPlaying(false);
    }
  };

  const handleRemove = () => {
    setMusicFile(null);
    setMusicUrl(null);
    setIsPlaying(false);
    setMusic(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleAudioPlay = () => setIsPlaying(true);
  const handleAudioPause = () => setIsPlaying(false);

  return (
    <div
      style={{ opacity: 1, transform: "translateY(0)", transition: "opacity 0.5s, transform 0.5s" }}
      className={`w-[100vw] h-[100vh] fixed z-20 ${show ? "show-modal" : "hide-modal"} flex justify-center items-center`}
    >
      <div
        className="w-full h-full absolute z-0 bg-black opacity-50 backdrop-blur-lg"
        onClick={() => {
          setShow(false);
          setTimeout(() => {
            toogleModal();
          }, 500);
        }}
      />
      <div className="flex relative justify-center items-center z-10">
        <div className="bg-gray-600 w-[50%] h-[50%] rounded-lg shadow-lg flex flex-col justify-center items-center">
          <div id="webcrumbs">
            <div className="w-[480px] p-6 rounded-xl bg-gradient-to-br bg-[#363636] shadow-lg">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-100 mb-2">Ajoutez une musique à votre moment</h2>
                <p className="text-gray-300">Partagez votre talent avec le monde</p>
              </div>

              <div className="mt-6 flex flex-col">
                {musicFile ? (
                  <div
                    className="bg-[#303030] rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md mb-4"
                    id="upload-preview"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary-600 text-3xl p-3 rounded-full bg-orange-100">
                          <Music2 color="orange" size={15} />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-gray-50">{musicFile.name}</p>
                        <p className="text-xs text-gray-200">{(musicFile.size / (1024 * 1024)).toFixed(2)} Mo</p>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={handlePlayPause}
                          className="bg-blue-200 p-3 rounded-full hover:bg-blue-300 transition"
                          aria-label={isPlaying ? "Pause" : "Lecture"}
                        >
                          {isPlaying ? <Pause color="blue" size={15} /> : <Play color="blue" size={15} />}
                        </button>
                      </div>
                      <button
                        className="bg-red-100 p-2 rounded-xl hover:bg-red-300 cursor-pointer transition-colors"
                        onClick={handleRemove}
                        type="button"
                        aria-label="Supprimer"
                      >
                        <XIcon color="red" />
                      </button>
                    </div>
                    {musicUrl && (
                      <div className="flex items-center gap-3 mt-3">
                        <audio ref={audioRef} src={musicUrl} onPlay={handleAudioPlay} onPause={handleAudioPause} className="w-full">
                          Votre navigateur ne supporte pas la lecture audio.
                        </audio>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border-2 border-blue-500 border-dashed border-primary-300 rounded-lg p-8 transition-all duration-300 hover:border-primary-500 bg-[#303030]/50 backdrop-blur-sm relative group">
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="music-upload"
                      accept="audio/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={handleFileChange}
                    />

                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-primary-600 text-3xl p-5 rounded-full bg-blue-400">
                          <Music2 color="blue" />
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-100">Glissez votre fichier audio ici ou cliquez pour parcourir</p>
                        <p className="text-sm text-gray-400 mt-2">Formats supportés : MP3, WAV, FLAC, AAC (Max 30Mo)</p>
                      </div>
                    </div>
                  </div>
                )}
                {musicFile && (
                  <button
                    type="button"
                    onClick={send}
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:scale-95 cursor-pointer transition-all duration-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-3xl text-sm px-5 py-3 text-center me-2 mb-2 mt-2"
                    disabled={!musicFile}
                  >
                    Enregistrer mon histoire
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSong;
