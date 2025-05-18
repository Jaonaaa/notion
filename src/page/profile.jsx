import "./profile.css";
import { useEffect, useRef, useState } from "react";

// import Footer from "@/components/Footer/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ReactLenis from "lenis/react";
import { useScrambleText } from "../hooks/use-scramble-text";
import { FullScreenModal } from "../components/full-screen-modal";
import { AddStoryChoseModal } from "../components/add-story-chose-modal";
import fetchUserData from "../queries/profile";
import { base_url } from "../queries";
import { getUserName } from "../helpers/token";

export function Profile() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [profileData, setProfileData] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [isChosing, setIsChosing] = useState(false);

  const [storyForModal, setStoryForModal] = useState(null);
  const [profileLayout, setProfileLayout] = useState([]);

  useScrambleText({ target: titleRef });

  const productDistribution = [
    [1, 1, 0, 1],
    [0, 1, 1, 0],
    [1, 0, 1, 1],
    [0, 1, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 0, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
  ];

  const getUserData = async () => {
    const res = await fetchUserData();
    console.log(res);
    setProfileData(res);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getProfileLayout = () => {
    let productIndex = 0;
    const layout = [];

    for (let rowIndex = 0; rowIndex < productDistribution.length; rowIndex++) {
      const rowLayout = [[], [], [], []];

      for (let colIndex = 0; colIndex < 4; colIndex++) {
        const productCount = productDistribution[rowIndex][colIndex];

        for (let i = 0; i < productCount; i++) {
          if (productIndex < profileData.length) {
            rowLayout[colIndex].push(profileData[productIndex]);
            productIndex++;
          }
        }
      }

      layout.push(rowLayout);
    }

    return layout;
  };

  useEffect(() => {
    setProfileLayout(getProfileLayout());
  }, [profileData]);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray(".column");

      gsap.fromTo(
        rows,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
          delay: 0.85,
        }
      );
    },
    { scope: containerRef }
  );

  useEffect(() => {
    gsap.to("button", {
      opacity: 1,
      duration: 0.4,
      delay: 0.7,
    });
  }, []);

  return (
    <ReactLenis root>
      <div id="profile-container" className="catalogue-page" ref={containerRef}>
        <div className="mb-48"></div>
        <h1 ref={titleRef} className="w-full text-center text-8xl tracking-tight mb-12">
          {getUserName()}
        </h1>
        <div className="w-full flex justify-center mb-24">
          <button
            className="border-2 border-black px-6 py-2 rounded-4xl text-xl cursor-pointer bg-gradient-to-l opacity-0"
            onClick={() => setIsChosing(true)}
          >
            Raconter mon histoire
          </button>
        </div>
        <div className="products">
          {profileLayout.map((row, rowIndex) => (
            <div className="row" key={`row-${rowIndex}`}>
              {row.map((column, colIndex) => (
                <div
                  className={`column ${column.length === 0 ? "empty-column" : ""} cursor-pointer`}
                  key={`col-${rowIndex}-${colIndex}`}
                >
                  {column.map((product) => (
                    <div
                      key={product.id}
                      className="product-link"
                      onClick={() => {
                        setStoryForModal(product);
                        console.log(product);
                        setIsModal(true);
                      }}
                    >
                      <div className="product-card">
                        <div className="product-card-image">
                          <img src={`${base_url}${product.image}`} alt={product.name} className="product-card-img" />
                        </div>
                        <div className="product-info">
                          <p className="uppercase -mt-1 font-medium text-sm">{product.titre}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pb-10"></div>
      </div>
      {isModal && <FullScreenModal onHide={() => setIsModal(false)} story={storyForModal} />}
      {isChosing && <AddStoryChoseModal onHide={() => setIsChosing(false)} />}
    </ReactLenis>
  );
}
