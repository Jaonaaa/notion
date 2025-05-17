import React from "react";
import "../styles/demos/demo-2.scss";

const GalleryX = () => {
  return (
    <div data-id="1">
      <main>
        <div className="frame">
          <div className="frame__title-wrap">
            <h1 className="frame__title">IDGGGGG</h1>
            <p className="frame__tagline">
              using <a href="https://github.com/oframe/ogl">OGL</a> with shaders
            </p>
          </div>

          <div className="frame__links">
            <a href="https://tympanus.net/Tutorials/BreathingDots/">Previous Demo</a>
            <a href="https://tympanus.net/codrops/?p=52634">Article</a>
            <a href="https://github.com/lhbizarro/infinite-webl-gallery" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <div className="demo-2">
          {/* <div className="demo-2__header">
            <h1 className="demo-2__title">Aaa lessy e</h1>
          </div> */}

          <div className="demo-2__gallery">
            {[...Array(7)].map((_, i) => (
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
