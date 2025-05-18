import { useEffect, useState } from "react";
import { Copy } from "./text/copy";
import gsap from "gsap";
import { formatDate } from "../helpers/date-helper";
import { base_url } from "../queries";
import { formatNumber } from "../helpers/number-helper";
import { addVote } from "../queries/vote";
import { useNavigate } from "react-router-dom";

export function FullScreenModal({ story, onHide = () => {} }) {
  const navigate = useNavigate();
  const [votes, setVotes] = useState(story.votes || 0);

  const hide = () => {
    gsap.to("#full-screen-modal-overlay", {
      opacity: 0,
      duration: 0.1,
    });
    gsap.to("#full-screen-modal", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: onHide,
    });
  };

  useEffect(() => {
    gsap.to("#full-screen-modal-overlay", {
      opacity: 1,
      duration: 0.4,
    });
    gsap.to("#full-screen-modal", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.2,
      ease: "power4.inOut",
    });
    gsap.to(".full-screen-modal-details, .full-screen-modal-button button", {
      opacity: 1,
      duration: 0.5,
      delay: 1.25,
      stagger: 0.05,
    });
  }, []);

  const handleVote = () => {
    addVote(story.id).then((response) => {
      if (response.voted) {
        setVotes(votes + 1);
      } else {
        setVotes(votes - 1);
      }
    });
  };

  return (
    <>
      <div
        id="full-screen-modal-overlay"
        style={{ opacity: 0 }}
        className="fixed z-100 inset-0 bg-[#00000058]"
      ></div>
      <div
        id="full-screen-modal"
        style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
        className="fixed inset-0 z-100 bg-white flex select-none"
      >
        <div className="w-2/5 h-full overflow-hidden">
          <img
            id="full-screen-modal-image"
            className="w-full h-full object-cover"
            src={`${base_url}${story.image}`}
          />
        </div>

        <div className="w-3/5 relative h-full flex flex-col py-32 px-32">
          <Copy delay={0.8}>
            <h2 className="text-sm">{story.titre}</h2>
          </Copy>
          <div className="mt-32"></div>
          <Copy delay={0.8}>
            <p className="text-xl font-medium leading-[1.3]">{story.contenu}</p>
          </Copy>
          <div className="mt-24"></div>
          <p style={{ opacity: 0 }} className="full-screen-modal-details flex">
            <span className="w-36">Date</span>
            <span>{formatDate(story.date)}</span>
          </p>
          <div className="mt-auto flex justify-between full-screen-modal-button">
            <div className="flex gap-4 items-center">
              <button
                onClick={handleVote}
                className="border-2 border-black px-6 py-2 rounded-4xl text-xl cursor-pointer bg-gradient-to-l bg-white text-black opacity-0"
              >
                Voter
              </button>
              ({formatNumber(votes)})
            </div>
            <button
              onClick={() => {
                if (story.mode == "fun") {
                  navigate(`/fun-story/${story.id}`);
                } else {
                  navigate(`/gallery-history?memoryId=${story.id}`);
                }
              }}
              className="border-2 border-black px-6 py-2 rounded-4xl text-xl cursor-pointer bg-gradient-to-l text-white bg-black opacity-0"
            >
              Visiter
            </button>
          </div>

          <span className="absolute top-7 right-8 cursor-pointer" onClick={hide}>
            Fermer
          </span>
        </div>
      </div>
    </>
  );
}
