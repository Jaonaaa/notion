import gsap from "gsap";
import { Crown, Smile } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AddStoryChoseModal({ onHide }) {
  const navigate = useNavigate();

  const hide = () => {
    gsap.to("#chose-modal-overlay, #chose-modal", {
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      onComplete: onHide,
    });
  };

  useEffect(() => {
    gsap.to("#chose-modal-overlay, #chose-modal", {
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
    });
  }, []);

  return (
    <>
      <div
        id="chose-modal-overlay"
        onClick={hide}
        className="fixed inset-0 bg-[#33333397] opacity-0"
      ></div>
      <div
        id="chose-modal"
        className="fixed top-1/2 w-80 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-xl p-7 px-8 opacity-0"
      >
        <h3 className="text-center">Choisir un mode</h3>
        <div className="flex w-full gap-4 mt-6">
          <div
            onClick={() => {
              gsap.to("#profile-container", {
                opacity: 0,
                duration: 0.3,
                onComplete: () => navigate("/add-simple-story"),
              });
            }}
            className="border border-[#22222247] flex flex-col items-center w-1/2 rounded-lg py-6 cursor-pointer"
          >
            <Crown className="text-[#00000070] h-10 w-10" />
            <p className="text-sm mt-2">Élégante</p>
          </div>
          <div
            onClick={() => {
              gsap.to("#profile-container", {
                opacity: 0,
                duration: 0.3,
                onComplete: () => navigate("/add-fun-story"),
              });
            }}
            className="border border-[#22222247] flex flex-col items-center w-1/2 rounded-lg py-6 cursor-pointer"
          >
            <Smile className="text-[#00000070] h-10 w-10" />
            <p className="text-sm mt-2">Fun</p>
          </div>
        </div>
      </div>
    </>
  );
}
