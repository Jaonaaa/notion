import { useState, useEffect, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshReflectorMaterial, Environment } from "@react-three/drei";
import Frames from "./components/Frames";
import { getStoryById } from "../../queries/stories";
import { base_url } from "../../queries";
import { defaultImages } from "./data";
import { Pause, Play } from "lucide-react";

export const GalleryCanvas = () => {
  const memoryId = new URLSearchParams(window.location.search).get("memoryId");

  const [loaded, setLoaded] = useState(false);
  const [stories, setStories] = useState([]);
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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
    const res = await getStoryById(memoryId);
    const storiesFetched = res.StoryElements.map((item, i) => ({
      url: base_url + item.media,
      position: defaultImages[i].position,
      rotation: defaultImages[i].rotation,
      description: item.description,
    }));
    if (res.audio) setSong(base_url + res.audio);

    setStories(storiesFetched);

    const medias = res.StoryElements.map((item) => ({
      url: base_url + item.media,
    }));
    await loadImages(medias);
  }, [memoryId]);

  // Audio controls
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  // Sync play state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

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
          <Frames images={stories} memoryId={memoryId} />
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
      {song && (
        <div style={{ position: "fixed", bottom: 20, left: 20, zIndex: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={handlePlayPause}
            style={{
              background: "#fff",
              border: "none",
              borderRadius: "1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label={isPlaying ? "Pause" : "Lecture"}
          >
            {isPlaying ? <Pause size={20} color="#222" /> : <Play size={20} color="#222" />}
          </button>
          <span style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>{"  "}</span>
          <audio
            ref={audioRef}
            onLoad={() => {
              audioRef.current.play();
            }}
            onPlay={() => {
              setIsPlaying(true);
            }}
            onPause={() => {
              setIsPlaying(false);
            }}
            autoPlay
            src={song}
            style={{ display: "none" }}
            loop
          />
        </div>
      )}
    </div>
  );
};

export default GalleryCanvas;
