import React from "react";
import "../styles/demos/demo-1.scss";

const GalleryX = () => {
  return (
    <div data-id="0">
      <main>
        <div className="frame">
          <div className="frame__title-wrap">
            <h1 className="frame__title">Infinite WebGL Scrolling Gallery</h1>
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

          <div className="frame__demos">
            <a href="index.html" className="frame__demo frame__demo--current">
              Demo 1
            </a>
            <a href="index2.html" className="frame__demo">
              Demo 2
            </a>
          </div>
        </div>

        <div className="demo-1">
          <div className="demo-1__header">
            <h1 className="demo-1__title">Planete Elevene</h1>
          </div>

          <div className="demo-1__gallery">
            {[...Array(12)].map((_, i) => (
              <figure className="demo-1__gallery__figure" key={i}>
                <img className="demo-1__gallery__image" src={`images/demo-1/${i + 1}.jpg`} alt={`Gallery item ${i + 1}`} />
              </figure>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GalleryX;
