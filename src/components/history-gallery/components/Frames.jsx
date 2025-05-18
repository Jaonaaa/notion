import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useRoute, useLocation } from "wouter";
import { easing } from "maath";
import Frame from "./Frame";
import { base_url } from "../../../queries";

const GOLDENRATIO = 1.61803398875;
const path = "/gallery-history";
const pathId = path + "/frames/";

const Frames = ({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) => {
  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute(`${pathId}:id`);
  const [, setLocation] = useLocation();

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 6);
      q.identity();
    }
  });

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt * 0.7);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt * 0.7);
  });

  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? "/" : pathId + e.object.name))}
      onPointerMissed={() => setLocation(path)}
    >
      {images.map((props) => (
        <Frame key={props.media} {...props} url={base_url + props.media} />
      ))}
    </group>
  );
};

export default Frames;
