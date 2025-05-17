import React from "react";
import GalleryY from "./components/gallery-y";
import DemoLoader from "./logic";
import GalleryX from "./components/gallery-x";
import "./styles/index.scss";

function Gallery() {
  const [demoId, setDemoId] = React.useState(1);

  return (
    <>
      <button
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          backgroundColor: "white",
          border: "1px solid black",
          padding: "5px",
          color: "black",
        }}
        onClick={() => {
          setDemoId((prev) => (prev === 0 ? 1 : 0));
        }}
      >
        Switch
      </button>
      {demoId === 0 && <GalleryY />}
      {demoId === 1 && <GalleryX />}
      <DemoLoader demoId={demoId} />
    </>
  );
}

export default Gallery;
