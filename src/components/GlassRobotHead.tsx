"use client";

import React, { useRef, useEffect, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// Shared material preset objects
// ─────────────────────────────────────────────────────────────────────────────
const GLASS_MAT = {
  transmission: 0.88,
  thickness: 1.6,
  ior: 1.45,
  roughness: 0.06,
  metalness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0.12,
  envMapIntensity: 2.4,
  transparent: true,
} as const;

const CHROME_MAT = {
  metalness: 1.0,
  roughness: 0.07,
  envMapIntensity: 3.2,
  clearcoat: 0.8,
  clearcoatRoughness: 0.04,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Floating Sci-Fi Particle Dust
// ─────────────────────────────────────────────────────────────────────────────
function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 220;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#3B82F6"),
      new THREE.Color("#06b6d4"),
    ];

    for (let i = 0; i < count; i++) {
      const r = 1.9 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.65 - 0.15;
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.55;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3 + 0] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.022;
    ref.current.rotation.x = Math.sin(t * 0.007) * 0.055;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.016}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Procedural Glass Robot Head
// ─────────────────────────────────────────────────────────────────────────────
function RobotHead() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Idle oscillation (8–14 s loops, no sudden jumps)
    const idleYaw = Math.sin(t * 0.28) * 0.20 + Math.sin(t * 0.13) * 0.07;
    const upPulse = Math.max(0, Math.sin(t * 0.08) - 0.55) * 2.2;
    const idlePitch = Math.sin(t * 0.22 + 0.8) * 0.04 - upPulse * 0.11;
    const idleRoll = Math.sin(t * 0.17 + 1.4) * 0.025;
    const floatY = Math.sin(t * 0.46) * 0.065;

    // Mouse parallax — max ±8° = ±0.14 rad
    const mx = mouseRef.current.x * 0.13;
    const my = -mouseRef.current.y * 0.09;

    // Smooth lerp (damping 0.035)
    const lf = 0.035;
    rotRef.current.x += (idlePitch + my - rotRef.current.x) * lf;
    rotRef.current.y += (idleYaw + mx - rotRef.current.y) * lf;

    groupRef.current.rotation.x = rotRef.current.x;
    groupRef.current.rotation.y = rotRef.current.y;
    groupRef.current.rotation.z = idleRoll;
    groupRef.current.position.y = floatY;
  });

  return (
    <group ref={groupRef} position={[0, 0.08, 0]}>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ CRANIUM DOME ━━━━ */}
      <mesh scale={[1.06, 1.0, 0.90]}>
        <sphereGeometry args={[1, 72, 72]} />
        <meshPhysicalMaterial
          {...GLASS_MAT}
          color="#b0c8e8"
          emissive="#1e3a8a"
          emissiveIntensity={0.06}
          opacity={0.86}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ FACE PLATE ━━━━━ */}
      <mesh position={[0, -0.05, 0.34]} scale={[0.90, 0.78, 0.40]}>
        <sphereGeometry args={[1, 40, 40]} />
        <meshPhysicalMaterial
          {...GLASS_MAT}
          color="#c4d8f4"
          emissive="#1d4ed8"
          emissiveIntensity={0.04}
          opacity={0.72}
          transmission={0.92}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ VISOR CORE ━━━━━ */}
      <mesh position={[0, 0.10, 0.88]}>
        <boxGeometry args={[1.10, 0.135, 0.055]} />
        <meshPhysicalMaterial
          metalness={0}
          roughness={0.08}
          color="#001020"
          emissive="#06b6d4"
          emissiveIntensity={4.5}
          transparent
          opacity={0.97}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ VISOR BLOOM HALO ━ */}
      <mesh position={[0, 0.10, 0.84]}>
        <boxGeometry args={[1.28, 0.30, 0.03]} />
        <meshPhysicalMaterial
          metalness={0}
          roughness={0.3}
          color="#001830"
          emissive="#3B82F6"
          emissiveIntensity={1.2}
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ BROW RIDGE ━━━━━━ */}
      <mesh position={[0, 0.265, 0.79]} rotation={[0.12, 0, 0]}>
        <boxGeometry args={[0.90, 0.072, 0.048]} />
        <meshPhysicalMaterial
          {...CHROME_MAT}
          color="#6a80bb"
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ LOWER MUZZLE ━━━━ */}
      <mesh position={[0, -0.26, 0.70]} scale={[0.66, 0.44, 0.34]}>
        <sphereGeometry args={[1, 28, 28]} />
        <meshPhysicalMaterial
          {...GLASS_MAT}
          color="#b8ccec"
          emissive="#1e40af"
          emissiveIntensity={0.04}
          opacity={0.80}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ CHIN PLATE ━━━━━━ */}
      <mesh position={[0, -0.435, 0.70]}>
        <boxGeometry args={[0.52, 0.070, 0.048]} />
        <meshPhysicalMaterial {...CHROME_MAT} color="#6a80bb" />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ CHIN SEAM GLOW ━━ */}
      <mesh position={[0, -0.31, 0.79]}>
        <boxGeometry args={[0.032, 0.27, 0.038]} />
        <meshPhysicalMaterial
          metalness={0}
          roughness={0.1}
          color="#001020"
          emissive="#8b5cf6"
          emissiveIntensity={2.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ LEFT TEMPLE ━━━━━ */}
      <mesh position={[-0.89, 0.14, 0.15]} rotation={[0, Math.PI / 2, 0]} scale={[1, 0.5, 1]}>
        <cylinderGeometry args={[0.26, 0.29, 0.17, 32]} />
        <meshPhysicalMaterial
          {...GLASS_MAT}
          color="#b0c8e8"
          emissive="#1e3a8a"
          emissiveIntensity={0.05}
          opacity={0.70}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ RIGHT TEMPLE ━━━━ */}
      <mesh position={[0.89, 0.14, 0.15]} rotation={[0, Math.PI / 2, 0]} scale={[1, 0.5, 1]}>
        <cylinderGeometry args={[0.26, 0.29, 0.17, 32]} />
        <meshPhysicalMaterial
          {...GLASS_MAT}
          color="#b0c8e8"
          emissive="#1e3a8a"
          emissiveIntensity={0.05}
          opacity={0.70}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ LEFT CHEEK GUARD ━ */}
      <mesh position={[-0.70, -0.19, 0.50]} rotation={[0, -0.44, 0]}>
        <boxGeometry args={[0.27, 0.40, 0.10]} />
        <meshPhysicalMaterial
          {...GLASS_MAT}
          color="#c0d4f0"
          emissive="#1e40af"
          emissiveIntensity={0.03}
          opacity={0.74}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ RIGHT CHEEK GUARD ━ */}
      <mesh position={[0.70, -0.19, 0.50]} rotation={[0, 0.44, 0]}>
        <boxGeometry args={[0.27, 0.40, 0.10]} />
        <meshPhysicalMaterial
          {...GLASS_MAT}
          color="#c0d4f0"
          emissive="#1e40af"
          emissiveIntensity={0.03}
          opacity={0.74}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ LEFT EAR RING ━━━━ */}
      <mesh position={[-1.07, 0.12, 0.02]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.22, 0.042, 10, 40]} />
        <meshPhysicalMaterial {...CHROME_MAT} color="#7090c0" />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ LEFT EAR NODE ━━━━ */}
      <mesh position={[-1.17, 0.12, 0.02]}>
        <sphereGeometry args={[0.105, 16, 16]} />
        <meshPhysicalMaterial
          metalness={0}
          roughness={0.12}
          color="#001030"
          emissive="#8b5cf6"
          emissiveIntensity={2.8}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ RIGHT EAR RING ━━━ */}
      <mesh position={[1.07, 0.12, 0.02]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.22, 0.042, 10, 40]} />
        <meshPhysicalMaterial {...CHROME_MAT} color="#7090c0" />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ RIGHT EAR NODE ━━━ */}
      <mesh position={[1.17, 0.12, 0.02]}>
        <sphereGeometry args={[0.105, 16, 16]} />
        <meshPhysicalMaterial
          metalness={0}
          roughness={0.12}
          color="#001030"
          emissive="#8b5cf6"
          emissiveIntensity={2.8}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ NECK COLLAR ━━━━━━ */}
      <mesh position={[0, -1.08, 0]}>
        <cylinderGeometry args={[0.50, 0.60, 0.30, 40]} />
        <meshPhysicalMaterial
          {...GLASS_MAT}
          color="#b0c8e8"
          emissive="#1e3a8a"
          emissiveIntensity={0.05}
          opacity={0.82}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ NECK CHROME RING ━━ */}
      <mesh position={[0, -0.935, 0]}>
        <torusGeometry args={[0.54, 0.036, 10, 64]} />
        <meshPhysicalMaterial {...CHROME_MAT} color="#6a80bb" />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ EQUATORIAL TRIM ━━ */}
      <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.026, 10, 72]} />
        <meshPhysicalMaterial {...CHROME_MAT} color="#7090cc" />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ CROWN HALO RING ━━━ */}
      <mesh position={[0, 0.72, 0]}>
        <torusGeometry args={[0.68, 0.038, 10, 64]} />
        <meshPhysicalMaterial {...CHROME_MAT} color="#7090cc" />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ CROWN ANTENNA ━━━━━ */}
      <mesh position={[0, 1.10, 0]}>
        <cylinderGeometry args={[0.032, 0.052, 0.36, 14]} />
        <meshPhysicalMaterial {...CHROME_MAT} color="#7090cc" />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ANTENNA TIP ORBS ━━ */}
      <mesh position={[0, 1.31, 0]}>
        <sphereGeometry args={[0.062, 14, 14]} />
        <meshPhysicalMaterial
          metalness={0}
          roughness={0.08}
          color="#001020"
          emissive="#06b6d4"
          emissiveIntensity={5.5}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ SIDE MINI VENTS L ━ */}
      {[-0.52, -0.36, -0.20].map((yOff, i) => (
        <mesh key={`vl-${i}`} position={[-0.91, yOff, 0.30]} rotation={[0, -0.30, 0]}>
          <boxGeometry args={[0.09, 0.038, 0.028]} />
          <meshPhysicalMaterial
            metalness={0}
            roughness={0.1}
            color="#001020"
            emissive="#3B82F6"
            emissiveIntensity={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ SIDE MINI VENTS R ━ */}
      {[-0.52, -0.36, -0.20].map((yOff, i) => (
        <mesh key={`vr-${i}`} position={[0.91, yOff, 0.30]} rotation={[0, 0.30, 0]}>
          <boxGeometry args={[0.09, 0.038, 0.028]} />
          <meshPhysicalMaterial
            metalness={0}
            roughness={0.1}
            color="#001020"
            emissive="#3B82F6"
            emissiveIntensity={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ INNER FACE GLOW ━━━ */}
      <mesh position={[0, 0.08, 0.58]}>
        <sphereGeometry args={[0.40, 20, 20]} />
        <meshPhysicalMaterial
          metalness={0}
          roughness={1}
          color="#002244"
          emissive="#1e40af"
          emissiveIntensity={0.40}
          transparent
          opacity={0.10}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Full 3D Scene
// ─────────────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Dark background for glass refraction */}
      <color attach="background" args={["#07080f"]} />

      {/* ── Lighting ── */}
      <ambientLight intensity={0.35} color="#c8d8ff" />

      {/* Cool blue rim — left rear */}
      <pointLight position={[-4, 2, -1]} intensity={5.5} color="#3B82F6" />

      {/* Soft purple fill — right front */}
      <pointLight position={[3.5, -1, 2.5]} intensity={4} color="#8b5cf6" />

      {/* White key — top front */}
      <directionalLight position={[0, 5, 4]} intensity={2.2} color="#dde8ff" castShadow={false} />

      {/* Cyan accent — bottom */}
      <pointLight position={[0, -3, 1]} intensity={2} color="#06b6d4" />

      {/* Back rim for silhouette */}
      <pointLight position={[0, 0.5, -3.5]} intensity={2.5} color="#1e40af" />

      {/* ── HDR Environment ── */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      {/* ── Robot + Particles ── */}
      <Suspense fallback={null}>
        <RobotHead />
        <FloatingParticles />
      </Suspense>

      {/* ── Post-processing Bloom ── */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.45}
          luminanceSmoothing={0.85}
          intensity={2.0}
        />
      </EffectComposer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Default Export — Canvas wrapper with WebGL / mount guards
// ─────────────────────────────────────────────────────────────────────────────
export default function GlassRobotHeadScene() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted || !hasWebGL) return null;

  return (
    <Canvas
      camera={{ position: [0, 0.1, 3.9], fov: 46 }}
      gl={{
        antialias: true,
        alpha: false, // opaque bg so transmission has something to refract
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.35,
      }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
