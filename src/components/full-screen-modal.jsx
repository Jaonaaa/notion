import { useEffect } from "react";
import { Copy } from "./text/copy";
import gsap from "gsap";

export function FullScreenModal() {
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
    gsap.to(".full-screen-modal-details", {
      opacity: 1,
      duration: 0.5,
      delay: 1.25,
      stagger: 0.05,
    });
  }, []);

  return (
    <>
      <div
        id="full-screen-modal-overlay"
        style={{ opacity: 0 }}
        className="fixed z-100 inset-0 bg-[#00000058]"
      >
        <div
          id="full-screen-modal"
          style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
          className="fixed inset-0 z-100 bg-black text-white flex select-none"
        >
          <div className="w-2/5 h-full overflow-hidden">
            <img
              id="full-screen-modal-image"
              className="w-full h-full object-cover"
              src="/images/13.png"
            />
          </div>
          <div className="w-3/5 relative h-full flex flex-col py-32 px-32">
            <Copy delay={0.8}>
              <h2 className="text-sm">Je suis malade</h2>
            </Copy>
            <div className="mt-32"></div>
            <Copy delay={0.8}>
              <p className="text-2xl font-medium leading-[1.3]">
                She wanted rainbow hair. That's what she told the hairdresser. It should be deep
                rainbow colors, too. She wasn't interested in pastel rainbow hair. She wanted it
                deep and vibrant so there was no doubt that she had done this on purpose.
              </p>
            </Copy>
            <div className="mt-32"></div>
            <p style={{ opacity: 0 }} className="full-screen-modal-details flex">
              <span className="w-36">Emotion</span>
              <span>Heureux</span>
            </p>
            <p style={{ opacity: 0 }} className="full-screen-modal-details flex">
              <span className="w-36">Date</span>
              <span>24.04.2025</span>
            </p>
            <span className="absolute top-7 right-8 cursor-pointer">Fermer</span>
          </div>
        </div>
      </div>
    </>
  );
}
