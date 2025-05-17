import React from "react";
import GalleryX from "./components/gallery-x";
import DemoLoader from "./logic";
import GalleryY from "./components/gallery-y";
import "./styles/index.scss";

function Gallery() {
  const demoId = 0; // Change this to 1 for the second demo

  return (
    <>
      {demoId === 0 && <GalleryX />}
      {demoId === 1 && <GalleryY />}
      <DemoLoader demoId={demoId} />
    </>
  );
}

export default Gallery;
