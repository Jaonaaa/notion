import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Gltf, Html, MeshReflectorMaterial, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Vector3 } from "three";

const people = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Product Manager",
    email: "alex@example.com",
    bio: "Experienced product manager with a passion for user-centered design and agile methodologies.",
    avatar: "/placeholder.svg?height=100&width=100",
    color: "#FF5733",
  },
  {
    id: 2,
    name: "Sam Wilson",
    role: "UX Designer",
    email: "sam@example.com",
    bio: "Creative designer focused on creating intuitive and accessible user experiences across platforms.",
    avatar: "/placeholder.svg?height=100&width=100",
    color: "#33FF57",
  },
  {
    id: 3,
    name: "Taylor Smith",
    role: "Developer",
    email: "taylor@example.com",
    bio: "Full-stack developer with expertise in React, Node.js, and cloud infrastructure.",
    avatar: "/placeholder.svg?height=100&width=100",
    color: "#3357FF",
  },
  {
    id: 4,
    name: "Jordan Lee",
    role: "Marketing Specialist",
    email: "jordan@example.com",
    bio: "Digital marketing expert specializing in growth strategies and content marketing.",
    avatar: "/placeholder.svg?height=100&width=100",
    color: "#F3FF33",
  },
  {
    id: 5,
    name: "Casey Brown",
    role: "Data Analyst",
    email: "casey@example.com",
    bio: "Data analyst with a background in statistics and machine learning, focused on actionable insights.",
    avatar: "/placeholder.svg?height=100&width=100",
    color: "#FF33F3",
  },
  {
    id: 6,
    name: "Casey Brown",
    role: "Data Analyst",
    email: "casey@example.com",
    bio: "Data analyst with a background in statistics and machine learning, focused on actionable insights.",
    avatar: "/placeholder.svg?height=100&width=100",
    color: "#FF33F3",
  },
];
function Person({ person, index, total, onClick, isSelected, onCursorMove }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const lastMove = useRef(0);

  const angle = (index / total) * Math.PI * 2;
  const radius = 5;
  const position = new Vector3(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);

  // Throttle pointer move events to 30fps
  const handlePointerMove = (e) => {
    if (!hovered) return;
    const now = Date.now();
    if (now - lastMove.current > 33) {
      lastMove.current = now;
      onCursorMove({
        x: e.clientX,
        y: e.clientY,
        person,
      });
    }
  };

  useFrame((state, delta) => {
    if (ref.current && hovered && !isSelected) {
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      onClick={() => onClick(person)}
      onPointerOver={(e) => {
        setHovered(true);
        onCursorMove({
          x: e.clientX,
          y: e.clientY,
          person,
        });
      }}
      onPointerOut={() => {
        setHovered(false);
        onCursorMove(null);
      }}
      onPointerEnter={handlePointerMove}
    >
      <mesh scale={hovered || isSelected ? 1.2 : 1} castShadow>
        <Gltf castShadow receiveShadow rotation={[0, 0, 0]} scale={1.2} src="/glb/orlando.glb" />
      </mesh>
      <Html position={[0, 2, 0]} center distanceFactor={10}>
        <div
          className={`px-5 py-1 select-none rounded-md text-white text-center ${hovered || isSelected ? "bg-primary" : "bg-gray-800"}`}
        >
          {person.name}
        </div>
      </Html>
    </group>
  );
}

function RotatingCarousel({ onPersonClick, selectedPerson, onCursorMove }) {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {people.map((person, index) => (
        <Person
          key={person.id}
          person={person}
          index={index}
          total={people.length}
          onClick={onPersonClick}
          isSelected={selectedPerson?.id === person.id}
          onCursorMove={onCursorMove}
        />
      ))}
    </group>
  );
}

export default function PersonCarousel() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [cursorButton, setCursorButton] = useState(null);

  const handleCursorMove = (info) => {
    setCursorButton((prev) => {
      if (!info || !prev || prev.x !== info.x || prev.y !== info.y || prev.person !== info.person) {
        return info;
      }
      return prev;
    });
  };

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };

  return (
    <>
      <Canvas shadows className="h-screen w-screen">
        <PerspectiveCamera makeDefault position={[0, 5, 11]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} castShadow />
        <RotatingCarousel onPersonClick={handlePersonClick} selectedPerson={selectedPerson} onCursorMove={handleCursorMove} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <group position={[0, -1, 0]}>
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
              enableZoom={false}
              metalness={0.5}
            />
          </mesh>
        </group>
        <Environment preset="city" />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
      </Canvas>
      {/* Floating button at cursor position */}
      {cursorButton && (
        <button
          style={{
            position: "fixed",
            left: cursorButton.x + 10,
            top: cursorButton.y + 10,
            zIndex: 1000,
            pointerEvents: "auto",
            background: "#fff",
            color: "#222",
            borderRadius: "9999px",
            padding: "0.5rem 1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
          }}
          onClick={() => alert(`Action sur ${cursorButton.person.name}`)}
        >
          <span className="w-2 h-2 bg-black rounded-full" />
          Action
        </button>
      )}
    </>
  );
}
