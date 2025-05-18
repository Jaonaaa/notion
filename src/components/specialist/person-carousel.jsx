import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Gltf, Html, MeshReflectorMaterial, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Vector3 } from "three";
import Drawer from "./drawer";
import { base_url } from "../../queries";
import { getToken } from "../../helpers/token";

function Person({ person, index, total, onClick, isSelected, onPointerOn }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const angle = (index / total) * Math.PI * 2;
  const radius = 5;
  const position = new Vector3(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);

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
      onPointerOver={() => {
        setHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
    >
      <mesh position={[0, hovered || isSelected ? 0.2 : 0, 0]} castShadow>
        <Gltf castShadow receiveShadow rotation={[0, 0, 0]} scale={1.2} src="/glb/orlando.glb" />
      </mesh>
      <Html position={[0, 2, 0]} center distanceFactor={10}>
        <div
          className={`px-5 py-1 select-none rounded-md text-white text-center ${hovered || isSelected ? "bg-black" : "bg-gray-800"}`}
        >
          {person.nom}
        </div>
      </Html>
    </group>
  );
}

function RotatingCarousel({ onPersonClick, selectedPerson, onPointerOn }) {
  const groupRef = useRef(null);
  const [people, setPeople] = useState([]);
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await fetch(base_url + "api/specialiste", {
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      });
      const data = await response.json();

      setPeople(data);
    };

    fetchPeople();
  }, []);

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
          onPointerOn={onPointerOn}
        />
      ))}
    </group>
  );
}

export default function PersonCarousel() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePointer = (person) => {
    setMessage("");
    setResponse("");
    setSelectedPerson(person);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    try {
      const response = await fetch(base_url + "api/specialist/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify({
          specialistId: selectedPerson?.id,
          userRequest: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const result = await response.json();
      setResponse(result.response);
    } catch {
      setResponse("An error occurred while sending the message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Canvas shadows className="h-screen w-screen">
        <PerspectiveCamera makeDefault position={[0, 5, 11]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} castShadow />
        <RotatingCarousel onPersonClick={handlePointer} selectedPerson={selectedPerson} onPointerOn={handlePointer} />
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
      <div className="fixed bottom-[1.5rem] left-0 w-screen ">
        <div className="flex flex-col gap-2 w-full justify-center items-center mx-auto">
          {selectedPerson && (
            <div className="p-4 w-full flex justify-center items-center flex-col rounded-lg shadow-lg">
              <h2 className="text-3xl text-white font-semibold mb-1">{selectedPerson.nom}</h2>
              <p className="text-gray-500 mt-1.5 max-w-[25rem] text-center">{selectedPerson.description}</p>

              <button
                className="cursor-pointer w-[15rem] transition-all duration-200 hover:scale-95 mt-5  px-6 py-3 text-black  rounded-full bg-white"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Consulter
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Drawer */}
      <Drawer open={openModal} onClose={() => setOpenModal(false)}>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Consulter {selectedPerson?.nom}</h3>
        </div>
        <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
          {!response.trim() && (
            <>
              <textarea
                className="border-b outline-0 rounded p-2 w-full min-h-[80px] resize-none"
                placeholder="Votre message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={10}
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-black text-white rounded-full py-3 px-4 hover:bg-gray-800 transition"
                disabled={loading || !message.trim()}
              >
                {loading ? "Envoi..." : "Envoyer"}
              </button>
            </>
          )}
        </form>
        {response && <div className="mt-4 p-3 mb-2 bg-green-50 border border-green-200 rounded text-green-800">{response}</div>}
        {response && (
          <button
            className="bg-black text-white w-full mt-1.5 cursor-pointer  rounded-full py-3 px-4 hover:bg-gray-800 transition"
            onClick={() => {
              setResponse("");
            }}
          >
            Renvoyer un message
          </button>
        )}
      </Drawer>
    </>
  );
}
