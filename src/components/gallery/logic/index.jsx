// App.jsx or DemoLoader.jsx
import React, { useEffect } from "react";
import One from "./demo-1";
import Two from "./demo-2";

const demos = [One, Two];

const DemoLoader = ({ demoId }) => {
  useEffect(() => {
    const Demo = demos[demoId];
    new Demo(); // runs the WebGL scene

    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");

    const images = document.querySelectorAll('img:not([src*="https://tympanus.net/codrops/wp-content/banners/"])');
    let imagesIndex = 0;

    Array.from(images).forEach((element) => {
      const image = new Image();
      image.src = element.src;
      image.onload = () => {
        imagesIndex += 1;

        if (imagesIndex === images.length) {
          document.documentElement.classList.remove("loading");
          document.documentElement.classList.add("loaded");
        }
      };
    });
  }, [demoId]);

  return null;
};

export default DemoLoader;
