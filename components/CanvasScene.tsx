"use client";

import * as THREE from "three";
import { useState, useRef } from "react";
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
  const [cubePosition, setCubePosition] = useState<[number, number, number]>([0, 0, 0]);
  const meshRef = useRef<THREE.Mesh | null>(null);

  return (
    <div className="w-full h-screen">
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
          <meshStandardMaterial color="#d1d5db" roughness={0.6} metalness={0.05} />
          {selected && <Edges scale={1.03} color="#2563eb" threshold={15} />}
        </mesh>

        {/* TransformControls solo si el cubo ya está en la escena */}
        {selected && meshRef.current && (
          <TransformControls
            mode="translate"
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
                setCubePosition([pos.x, pos.y, pos.z]); // guarda posición nueva
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
    </div>
  );
}
