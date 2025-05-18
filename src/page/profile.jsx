import "./profile.css";
import { useEffect, useRef, useState } from "react";

// import Footer from "@/components/Footer/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import products from "./profile-data";
import ReactLenis from "lenis/react";
import { useScrambleText } from "../hooks/use-scramble-text";
import { FullScreenModal } from "../components/full-screen-modal";
import fetchUserData from "../queries/profile";
import ImagePreview from "../components/comment/image-preview";

export function Profile() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [profileData, setProfileData] = useState({});
  const [isModal, setIsModal] = useState(false);

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

  const getProductLayout = () => {
    let productIndex = 0;
    const layout = [];

    for (let rowIndex = 0; rowIndex < productDistribution.length; rowIndex++) {
      const rowLayout = [[], [], [], []];

      for (let colIndex = 0; colIndex < 4; colIndex++) {
        const productCount = productDistribution[rowIndex][colIndex];

        for (let i = 0; i < productCount; i++) {
          if (productIndex < products.length) {
            rowLayout[colIndex].push(products[productIndex]);
            productIndex++;
          }
        }
      }

      layout.push(rowLayout);
    }

    return layout;
  };

  const productLayout = getProductLayout();

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

  return (
    <ReactLenis root>
      <div className="catalogue-page" ref={containerRef}>
        <ImagePreview />
        <div className="mb-48"></div>
        <h1 ref={titleRef} className="w-full text-center text-8xl tracking-tight mb-48">
          John Doe
        </h1>
        <div className="products">
          {productLayout.map((row, rowIndex) => (
            <div className="row" key={`row-${rowIndex}`}>
              {row.map((column, colIndex) => (
                <div className={`column ${column.length === 0 ? "empty-column" : ""}`} key={`col-${rowIndex}-${colIndex}`}>
                  {column.map((product) => (
                    <div
                      key={product.id}
                      className="product-link"
                      // onClick={() => navigateTo(`/catalogue/${generateSlug(product.name)}`)}
                      onClick={() => setIsModal(true)}
                    >
                      <div className="product-card">
                        <div className="product-card-image">
                          <img src={`/images/${product.previewImg}`} alt={product.name} className="product-card-img" />
                        </div>
                        <div className="product-info">
                          <p className="uppercase -mt-1 font-medium text-sm">{product.name}</p>
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
      {isModal && <FullScreenModal />}
    </ReactLenis>
  );
}
