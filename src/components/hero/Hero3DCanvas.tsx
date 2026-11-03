"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Shared Geometries & Materials for maximum 60FPS performance & 0 garbage collection lag
interface FeatherProps {
  x: number;
  y: number;
  z: number;
  color: string;
  length: number;
  swaySpeed: number;
  swayOffset: number;
}

function HangingFeather({
  x,
  y,
  z,
  color,
  length,
  swaySpeed,
  swayOffset,
}: FeatherProps) {
  const featherRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!featherRef.current) return;
    const t = state.clock.getElapsedTime();
    const targetZ = Math.sin(t * swaySpeed + swayOffset) * 0.1;
    const targetX = Math.cos(t * (swaySpeed * 0.7) + swayOffset) * 0.06;
    
    // Stable delta damping prevents any animation stutter or sudden jumps
    featherRef.current.rotation.z = THREE.MathUtils.damp(
      featherRef.current.rotation.z,
      targetZ,
      3,
      delta
    );
    featherRef.current.rotation.x = THREE.MathUtils.damp(
      featherRef.current.rotation.x,
      targetX,
      3,
      delta
    );
  });

  return (
    <group position={[x, y, z]} ref={featherRef}>
      {/* Hanging thread */}
      <mesh position={[0, -length / 2, 0]}>
        <cylinderGeometry args={[0.007, 0.007, length, 6]} />
        <meshBasicMaterial color="#C9A24B" transparent opacity={0.6} />
      </mesh>

      {/* Gold bead */}
      <mesh position={[0, -0.12, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#DFC27A" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Accent bead */}
      <mesh position={[0, -length + 0.08, 0]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#14234B" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Feather blade */}
      <group position={[0, -length - 0.38, 0]}>
        <mesh scale={[0.16, 0.55, 0.02]}>
          <coneGeometry args={[1, 1.4, 4]} />
          <meshStandardMaterial
            color={color}
            roughness={0.5}
            metalness={color === "#C9A24B" ? 0.8 : 0.2}
          />
        </mesh>
        {/* Feather gold spine */}
        <mesh scale={[0.01, 0.8, 0.02]}>
          <cylinderGeometry args={[1, 1, 1, 6]} />
          <meshStandardMaterial color="#DFC27A" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// Center Book & Logo Medallion
function CenterMedallion() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating breathing motion
    const targetY = Math.sin(t * 1.0) * 0.035;
    meshRef.current.position.y = THREE.MathUtils.damp(
      meshRef.current.position.y,
      targetY,
      2,
      delta
    );
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Central circular gold disc */}
      <mesh>
        <cylinderGeometry args={[0.78, 0.78, 0.04, 32]} />
        <meshStandardMaterial
          color="#12302A"
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Gold outer bezel */}
      <mesh>
        <torusGeometry args={[0.79, 0.025, 16, 32]} />
        <meshStandardMaterial
          color="#C9A24B"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Center Open Book */}
      <group scale={0.35} position={[0, 0, 0.03]}>
        <mesh position={[-0.42, 0, 0]} rotation={[0, 0.25, -0.05]}>
          <boxGeometry args={[0.75, 0.06, 0.95]} />
          <meshStandardMaterial color="#FAF6ED" roughness={0.6} />
        </mesh>
        <mesh position={[0.42, 0, 0]} rotation={[0, -0.25, 0.05]}>
          <boxGeometry args={[0.75, 0.06, 0.95]} />
          <meshStandardMaterial color="#FAF6ED" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[0.12, 0.05, 0.96]} />
          <meshStandardMaterial color="#C9A24B" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// Procedural Dreamcatcher Web with interlocking golden chords
function DreamcatcherWeb() {
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const count = 12;
    const outerRadius = 1.95;
    const innerRadius = 0.85;

    for (let i = 0; i < count; i++) {
      const angle1 = (i / count) * Math.PI * 2;
      const angle2 = ((i + 4) / count) * Math.PI * 2;

      points.push(
        new THREE.Vector3(Math.cos(angle1) * outerRadius, Math.sin(angle1) * outerRadius, 0),
        new THREE.Vector3(Math.cos(angle2) * outerRadius, Math.sin(angle2) * outerRadius, 0)
      );

      const angleInner1 = ((i + 0.5) / count) * Math.PI * 2;
      const angleInner2 = ((i + 2.5) / count) * Math.PI * 2;
      points.push(
        new THREE.Vector3(Math.cos(angleInner1) * innerRadius, Math.sin(angleInner1) * innerRadius, 0),
        new THREE.Vector3(Math.cos(angleInner2) * innerRadius, Math.sin(angleInner2) * innerRadius, 0)
      );
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#C9A24B" transparent opacity={0.35} />
    </lineSegments>
  );
}

// Subtle golden ambient stars / particles
function AmbientParticles() {
  const points = useMemo(() => {
    const pts = new Float32Array(40 * 3);
    for (let i = 0; i < 40; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 7;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return pts;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#DFC27A" transparent opacity={0.4} />
    </points>
  );
}

// Main assembly with damped mouse parallax & stable idle rotation
function DreamcatcherAssembly() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Silky smooth idle rotation + damped pointer parallax
    // Uses THREE.MathUtils.damp with delta to eliminate any hitch or stuck feeling
    const targetY = Math.sin(t * 0.35) * 0.12 + state.pointer.x * 0.2;
    const targetX = -state.pointer.y * 0.12;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetY,
      3.5,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetX,
      3.5,
      delta
    );
  });

  return (
    <group ref={groupRef} position={[0, 0.45, 0]}>
      {/* Outer Polished Gold Hoop */}
      <mesh>
        <torusGeometry args={[1.98, 0.038, 16, 64]} />
        <meshStandardMaterial
          color="#C9A24B"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* Inner Thin Accent Hoop */}
      <mesh>
        <torusGeometry args={[1.86, 0.016, 12, 48]} />
        <meshStandardMaterial
          color="#14234B"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Gold Threads */}
      <DreamcatcherWeb />

      {/* Center Medallion */}
      <CenterMedallion />

      {/* Feathers */}
      <HangingFeather
        x={0}
        y={-1.98}
        z={0.02}
        color="#1F4A3A"
        length={1.0}
        swaySpeed={1.05}
        swayOffset={0}
      />
      <HangingFeather
        x={-0.62}
        y={-1.88}
        z={0.01}
        color="#C9A24B"
        length={0.82}
        swaySpeed={1.2}
        swayOffset={0.8}
      />
      <HangingFeather
        x={0.62}
        y={-1.88}
        z={-0.01}
        color="#FAF6ED"
        length={0.84}
        swaySpeed={1.15}
        swayOffset={1.5}
      />
      <HangingFeather
        x={-1.2}
        y={-1.55}
        z={0.03}
        color="#14234B"
        length={0.7}
        swaySpeed={1.3}
        swayOffset={2.2}
      />
      <HangingFeather
        x={1.2}
        y={-1.55}
        z={-0.02}
        color="#C9A24B"
        length={0.68}
        swaySpeed={1.25}
        swayOffset={2.9}
      />
      <HangingFeather
        x={-1.6}
        y={-1.15}
        z={0.01}
        color="#FAF6ED"
        length={0.55}
        swaySpeed={1.4}
        swayOffset={3.6}
      />
      <HangingFeather
        x={1.6}
        y={-1.15}
        z={-0.01}
        color="#1F4A3A"
        length={0.56}
        swaySpeed={1.35}
        swayOffset={4.3}
      />
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 45 }}
        dpr={1.5}
        frameloop="always"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[4, 5, 4]} intensity={1.6} color="#FAF6ED" />
        <pointLight position={[-3, -2, 2]} intensity={1.0} color="#C9A24B" />
        <AmbientParticles />
        <DreamcatcherAssembly />
      </Canvas>
    </div>
  );
}
