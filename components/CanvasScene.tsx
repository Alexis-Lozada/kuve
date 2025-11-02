"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { TrackballControls, Grid } from "@react-three/drei";

export default function CanvasScene() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [3, 3, 3], far: 1000 }}>
        <color attach="background" args={["#f3f4f6"]} />
        <fog attach="fog" args={["#f3f4f6", 40, 140]} />

        <ambientLight intensity={0.6} />
        <hemisphereLight intensity={0.5} groundColor={"#ffffff"} />
        <directionalLight position={[5, 8, 5]} intensity={0.9} />

        {/* Grilla visible por arriba y por abajo */}
        <Grid
          infiniteGrid
          followCamera
          side={THREE.DoubleSide}   // 👈 hace visible la cara posterior
          cellSize={0.75}
          cellThickness={0.6}
          cellColor="#cbd5e1"
          sectionSize={4}
          sectionThickness={1}
          sectionColor="#60a5fa"
          fadeDistance={120}
          fadeStrength={2.5}
        />

        {/* Pieza un poco arriba del plano */}
        <group position={[0, -0.5, 0]}>
          <mesh>
            <cylinderGeometry args={[1.6, 1.6, 0.4, 64]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.6} metalness={0.05} />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[1.0, 1.0, 0.5, 64]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.6} metalness={0.05} />
          </mesh>
          <mesh position={[0, 0.9, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.5, 64]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.6} metalness={0.05} />
          </mesh>
          <mesh position={[0, 1.35, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.7, 64]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.6} metalness={0.05} />
          </mesh>
        </group>

        <TrackballControls
          rotateSpeed={4.5}
          zoomSpeed={1.4}
          panSpeed={1.0}
          dynamicDampingFactor={0.12}
          minDistance={0.8}
          maxDistance={80}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
