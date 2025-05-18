import React from "react";
import GalleryX from "./components/gallery-x";
import DemoLoader from "./logic";
import "./styles/index.scss";

function Gallery() {
  return (
    <>
      <GalleryX />
      <DemoLoader demoId={1} />
    </>
  );
}

export default Gallery;
