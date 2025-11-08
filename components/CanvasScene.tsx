"use client";

import * as THREE from "three";
import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Grid,
  Edges,
  TransformControls,
} from "@react-three/drei";

export default function CanvasScene() {
  const [selected, setSelected] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [cubePosition, setCubePosition] = useState<[number, number, number]>([
    0, 0.5, 0, // 👈 base del cubo justo sobre la malla
  ]);
  const [mode, setMode] = useState<"translate" | "scale" | "rotate">(
    "translate"
  );
  const meshRef = useRef<THREE.Mesh | null>(null);
  const transformRef = useRef<any>(null);

  // 🔹 Detectar teclas para cambiar modo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "t":
          setMode("translate");
          break;
        case "s":
          setMode("scale");
          break;
        case "r":
          setMode("rotate");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full h-screen relative">
      <Canvas camera={{ position: [4, 3, 4], fov: 45, far: 1000 }}>
        {/* Fondo y niebla */}
        <color attach="background" args={["#f3f4f6"]} />
        <fog attach="fog" args={["#f3f4f6", 40, 140]} />

        {/* Luces */}
        <ambientLight intensity={0.6} />
        <hemisphereLight intensity={0.5} groundColor={"#ffffff"} />
        <directionalLight position={[5, 8, 5]} intensity={0.9} />

        {/* Grid infinito */}
        <Grid
          infiniteGrid
          followCamera
          side={THREE.DoubleSide}
          cellSize={0.75}
          cellThickness={0.6}
          cellColor="#cbd5e1"
          sectionSize={4}
          sectionThickness={1}
          sectionColor="#60a5fa"
          fadeDistance={120}
          fadeStrength={2.5}
        />

        {/* Cubo */}
        <mesh
          ref={meshRef}
          position={cubePosition}
          onClick={(e) => {
            e.stopPropagation();
            setSelected((prev) => !prev);
          }}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#d1d5db"
            roughness={0.6}
            metalness={0.05}
          />
          {selected && <Edges scale={1.03} color="#2563eb" threshold={15} />}
        </mesh>

        {/* TransformControls */}
        {selected && meshRef.current && (
          <TransformControls
            ref={transformRef}
            mode={mode}
            showX
            showY
            showZ
            size={0.9}
            object={meshRef.current}
            onMouseDown={() => setIsTransforming(true)}
            onMouseUp={() => {
              setIsTransforming(false);
              if (meshRef.current) {
                const pos = meshRef.current.position;
                setCubePosition([pos.x, pos.y, pos.z]);
              }
            }}
          />
        )}

        {/* OrbitControls */}
        <OrbitControls
          makeDefault
          enabled={!isTransforming}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={1.1}
          minDistance={1}
          maxDistance={60}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          target={[0, 0, 0]}
        />
      </Canvas>

      {/* Indicador de modo actual */}
      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow text-gray-700 text-sm font-medium">
        <p>
          Modo actual:{" "}
          <span className="text-blue-600 font-semibold uppercase">
            {mode}
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Usa <b>T</b> (mover) • <b>R</b> (rotar) • <b>S</b> (escalar)
        </p>
      </div>
    </div>
  );
}
