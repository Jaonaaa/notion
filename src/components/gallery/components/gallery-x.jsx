import React from "react";
import "../styles/demos/demo-2.scss";
import { ArrowRight, ArrowRightFromLine } from "lucide-react";

const GalleryX = () => {
  return (
    <div data-id="1">
      <main>
        <div className="frame">
          <div className="frame__title-wrap">
            <h1 className="frame__title">
              <a href="/ ">NOTION CORP</a>
            </h1>
          </div>

          <div className="frame__links flex gap-5 justify-between px-3">
            <a href="/sign-in" className="inline-flex gap-5 items-center transition-opacity hover:opacity-50 duration-200">
              SE CONNECTER
              <ArrowRightFromLine size={17} />
            </a>
            <a href="/archive" className="underline transition-opacity hover:opacity-50 duration-200">
              DECOUVRIR
            </a>
          </div>
        </div>

        <div className="demo-2">
          {/* <div className="demo-2__header">
            <h1 className="demo-2__title">Aaa lessy e</h1>
          </div> */}

          <div className="demo-2__gallery">
            {[...Array(8)].map((_, i) => (
              <figure className="demo-2__gallery__figure" key={i}>
                <img className="demo-2__gallery__image" src={`images/demo-2/${i + 1}.jpg`} alt={`Gallery item ${i + 1}`} />
              </figure>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GalleryX;
