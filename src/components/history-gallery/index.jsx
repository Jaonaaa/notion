import { useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshReflectorMaterial, Environment } from "@react-three/drei";
import Frames from "./components/Frames";
import { getStoryById } from "../../queries/stories";
import { base_url } from "../../queries";

const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;
export const imagesDefaultGallery = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel(1103970) },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430) },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: pexel(327482) },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(325185) },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(358574) },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(227675) },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(911738) },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1738986) },
];

export const GalleryCanvas = ({ images }) => {
  const [loaded, setLoaded] = useState(false);
  const [stories, setStories] = useState([]);

  const loadImages = async (images) => {
    const promises = images.map(({ url }) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    for (const promise of promises) {
      await promise;
    }
    setLoaded(true);
  };

  const getData = useCallback(async () => {
    const res = await getStoryById(1);
    const storiesFetched = res.StoryElements.map((item, i) => ({
      ...item,
      position: imagesDefaultGallery[i].position,
      rotation: imagesDefaultGallery[i].rotation,
    }));

    setStories(storiesFetched);

    const medias = res.StoryElements.map((item) => ({
      url: base_url + item.media,
    }));
    console.log("====================================");
    console.log(medias);
    console.log("====================================");
    await loadImages(medias);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0 }}>
      {!loaded ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            zIndex: 10,
            left: 0,
            width: "100vw",
            height: "100vh",
          }}
          className=" bg-gradient-to-b from-[#010008] to-[#171932] "
        ></div>
      ) : null}

      <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 5, 25] }}>
        <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#191920", 0, 15]} />
        <group position={[0, -0.5, 0]}>
          <Frames images={stories} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.5}
            />
          </mesh>
        </group>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default GalleryCanvas;
