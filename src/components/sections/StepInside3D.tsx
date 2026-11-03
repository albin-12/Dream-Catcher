"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Stylised 3D Cubicle desk with partition and seat number
function DeskCubicle({
  position,
  rotation,
  label,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  label: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Desk surface (cream laminate) */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#F5EEDC" roughness={0.4} />
      </mesh>

      {/* Back acoustic partition wall (wood finish) */}
      <mesh position={[0, 1.2, -0.4]}>
        <boxGeometry args={[1.2, 0.9, 0.04]} />
        <meshStandardMaterial color="#8A5A3B" roughness={0.6} />
      </mesh>

      {/* Side partition wings (cream / wood curved look) */}
      <mesh position={[-0.6, 1.15, 0]}>
        <boxGeometry args={[0.04, 0.8, 0.8]} />
        <meshStandardMaterial color="#FAF6ED" roughness={0.5} />
      </mesh>
      <mesh position={[0.6, 1.15, 0]}>
        <boxGeometry args={[0.04, 0.8, 0.8]} />
        <meshStandardMaterial color="#FAF6ED" roughness={0.5} />
      </mesh>

      {/* Desk legs */}
      <mesh position={[-0.55, 0.375, -0.35]}>
        <cylinderGeometry args={[0.025, 0.025, 0.75, 8]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.7} />
      </mesh>
      <mesh position={[0.55, 0.375, -0.35]}>
        <cylinderGeometry args={[0.025, 0.025, 0.75, 8]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.7} />
      </mesh>
      <mesh position={[-0.55, 0.375, 0.35]}>
        <cylinderGeometry args={[0.025, 0.025, 0.75, 8]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.7} />
      </mesh>
      <mesh position={[0.55, 0.375, 0.35]}>
        <cylinderGeometry args={[0.025, 0.025, 0.75, 8]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.7} />
      </mesh>

      {/* Under-shelf warm LED glow strip */}
      <mesh position={[0, 1.45, -0.38]}>
        <boxGeometry args={[1.1, 0.02, 0.04]} />
        <meshBasicMaterial color="#FFEDB3" />
      </mesh>

      {/* Stylised Ergonomic Chair */}
      <group position={[0, 0, 0.6]}>
        {/* Seat cushion */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.5, 0.08, 0.5]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.8} />
        </mesh>
        {/* Curved mesh backrest */}
        <mesh position={[0, 0.85, 0.22]}>
          <boxGeometry args={[0.45, 0.65, 0.05]} />
          <meshStandardMaterial color="#262626" roughness={0.9} />
        </mesh>
        {/* Chair stem and 5-star base */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
          <meshStandardMaterial color="#404040" metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// 3D Study Hall Room
function StudyRoomScene({ progress }: { progress: number }) {
  const cameraTargetZ = useMemo(() => {
    // Progress 0 -> z = 9, Progress 1 -> z = -5
    return 9 - progress * 13.5;
  }, [progress]);

  useFrame((state) => {
    // Smooth camera glide
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      cameraTargetZ,
      0.08
    );
    state.camera.position.y = 1.6 + Math.sin(progress * Math.PI) * 0.15;
    state.camera.position.x = Math.sin(progress * 2) * 0.1;
    state.camera.lookAt(0, 1.5, state.camera.position.z - 4);
  });

  // Cubicle coordinates for A1 to A20 (Left side: A1 to A10, Right side: A11 to A20)
  const leftCubicles = [
    { id: "A1", z: 7 },
    { id: "A2", z: 5.2 },
    { id: "A3", z: 3.4 },
    { id: "A4", z: 1.6 },
    { id: "A5", z: -0.2 },
    { id: "A6", z: -2.0 },
    { id: "A7", z: -3.8 },
    { id: "A8", z: -5.6 },
  ];

  const rightCubicles = [
    { id: "A11", z: 7 },
    { id: "A12", z: 5.2 },
    { id: "A13", z: 3.4 },
    { id: "A14", z: 1.6 },
    { id: "A15", z: -0.2 },
    { id: "A16", z: -2.0 },
    { id: "A17", z: -3.8 },
    { id: "A18", z: -5.6 },
  ];

  return (
    <>
      <ambientLight intensity={0.65} color="#FAF6ED" />
      <directionalLight position={[0, 4, 2]} intensity={1.2} color="#FFF8E7" />
      <pointLight position={[0, 3.2, 0]} intensity={1.5} color="#FFDCA8" distance={15} />

      {/* Hallway Floor (polished light stone) */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 30]} />
        <meshStandardMaterial color="#E8DEC6" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Deep Navy Ceiling */}
      <mesh position={[0, 3.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 30]} />
        <meshStandardMaterial color="#14234B" roughness={0.8} />
      </mesh>

      {/* Overhead Warm Track Lights */}
      <mesh position={[0, 3.42, 0]}>
        <boxGeometry args={[0.08, 0.05, 26]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      {[-4, -1, 2, 5, 8].map((lz) => (
        <mesh key={lz} position={[0, 3.38, lz]}>
          <cylinderGeometry args={[0.09, 0.09, 0.06, 12]} />
          <meshBasicMaterial color="#FFEBB8" />
        </mesh>
      ))}

      {/* Back Forest Green Feature Wall */}
      <mesh position={[0, 1.75, -8]}>
        <boxGeometry args={[10, 3.5, 0.2]} />
        <meshStandardMaterial color="#1F4A3A" roughness={0.5} />
      </mesh>

      {/* Gold Wall Plaque with Inspiration */}
      <group position={[0, 2.2, -7.88]}>
        {/* Outer decorative gold frame */}
        <mesh>
          <boxGeometry args={[3.2, 1.2, 0.03]} />
          <meshStandardMaterial color="#C9A24B" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[3.0, 1.05, 0.02]} />
          <meshStandardMaterial color="#12302A" roughness={0.4} />
        </mesh>
      </group>

      {/* Left Wall (cream) */}
      <mesh position={[-4.5, 1.75, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[30, 3.5]} />
        <meshStandardMaterial color="#FAF6ED" roughness={0.7} />
      </mesh>

      {/* Right Wall (cream with window insets) */}
      <mesh position={[4.5, 1.75, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[30, 3.5]} />
        <meshStandardMaterial color="#FAF6ED" roughness={0.7} />
      </mesh>

      {/* Left Row of Cubicles (facing hallway aisle) */}
      {leftCubicles.map((c) => (
        <DeskCubicle
          key={c.id}
          label={c.id}
          position={[-2.1, 0, c.z]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}

      {/* Right Row of Cubicles (facing hallway aisle) */}
      {rightCubicles.map((c) => (
        <DeskCubicle
          key={c.id}
          label={c.id}
          position={[2.1, 0, c.z]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      ))}
    </>
  );
}

export default function StepInside3D({ progress }: { progress: number }) {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.7, 9], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#12302A"]} />
        <StudyRoomScene progress={progress} />
      </Canvas>
    </div>
  );
}
