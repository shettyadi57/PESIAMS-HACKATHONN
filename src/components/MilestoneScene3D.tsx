"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Data ─────────────────────────────────────────────────────────────── */

interface Phase {
  num: string;
  date: string;
  title: string;
  desc: string;
  color: string;
}

const PHASES: Phase[] = [
  {
    num: "01",
    date: "Jul 25, 2026",
    title: "Official Announcement",
    desc: "UTKARSH 1.0 website and portal go live. Notifications dispatched to leading BCA campuses across Karnataka.",
    color: "#06b6d4",
  },
  {
    num: "02",
    date: "Aug 1, 2026",
    title: "Registrations Open",
    desc: "Online portals open for team registration. Builder guides, API resources, and participant handbooks published.",
    color: "#8b5cf6",
  },
  {
    num: "03",
    date: "Aug 25, 2026",
    title: "Hacking Marathon Begins",
    desc: "Registration closes. Hacking kicks off — teams lock in problem statements with mentors on deck.",
    color: "#ec4899",
  },
  {
    num: "04",
    date: "Sep 5, 2026 — 09:00 AM",
    title: "Hackathon Day",
    desc: "The big day at PESIAMS Shivamogga. Opening ceremony, team check-in, live demos, expert evaluation.",
    color: "#f59e0b",
  },
  {
    num: "05",
    date: "Sep 5, 2026 — 04:00 PM",
    title: "Award Ceremony",
    desc: "Champions, runners-up, and innovation award winners announced. Certificates & prizes distributed.",
    color: "#10b981",
  },
];

// Arc of positions in 3D space — smooth S-curve
const NODE_POSITIONS: [number, number, number][] = [
  [-4.0, -1.2, 0.5],
  [-2.0, -0.3, -0.8],
  [ 0.0,  0.6,  0.5],
  [ 2.0, -0.3, -0.8],
  [ 4.0,  1.2,  0.5],
];

/* ─── Particle Starfield ────────────────────────────────────────────────── */

function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const count = 400;

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.006;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#8b5cf6"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Connection Tube ───────────────────────────────────────────────────── */

function ConnectionTube() {
  const curve = React.useMemo(() => {
    const pts = NODE_POSITIONS.map(([x, y, z]) => new THREE.Vector3(x, y, z));
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
  }, []);

  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.18 + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.06;
    }
  });

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 80, 0.025, 8, false]} />
      <meshBasicMaterial
        color="#06b6d4"
        transparent
        opacity={0.22}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Individual Milestone Node ─────────────────────────────────────────── */

function MilestoneNode({
  phase,
  position,
  index,
  isSelected,
  onSelect,
}: {
  phase: Phase;
  position: [number, number, number];
  index: number;
  isSelected: boolean;
  onSelect: (i: number | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const sphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref  = useRef<THREE.Mesh>(null);
  const ring2Ref  = useRef<THREE.Mesh>(null);
  const glowRef   = useRef<THREE.Mesh>(null);

  const active = hovered || isSelected;
  const col = new THREE.Color(phase.color);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const dir = index % 2 === 0 ? 1 : -1;

    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.7 * dir;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.5 * -dir;

    if (glowRef.current) {
      const scale = active
        ? 1.6 + Math.sin(t * 3) * 0.08
        : 1.3 + Math.sin(t * 2 + index) * 0.04;
      glowRef.current.scale.setScalar(scale);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        active ? 0.15 : 0.06;
    }

    if (sphereRef.current) {
      const mat = sphereRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = active ? 2.0 : 0.7;
    }
  });

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      onSelect(isSelected ? null : index);
    },
    [isSelected, index, onSelect]
  );

  return (
    <Float speed={1.4} rotationIntensity={0} floatIntensity={isSelected ? 0 : 0.3}>
      <group position={position}>
        {/* Outer glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.42, 16, 16]} />
          <meshBasicMaterial color={col} transparent opacity={0.06} depthWrite={false} side={THREE.BackSide} />
        </mesh>

        {/* Main clickable sphere */}
        <mesh
          ref={sphereRef}
          onClick={handleClick}
          onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
          onPointerLeave={() => { setHovered(false); document.body.style.cursor = "default"; }}
        >
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshPhysicalMaterial
            color={col}
            emissive={col}
            emissiveIntensity={0.7}
            roughness={0.1}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Ring 1 */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.50, 0.012, 8, 80]} />
          <meshBasicMaterial color={col} transparent opacity={active ? 0.85 : 0.35} />
        </mesh>

        {/* Ring 2 (tilted) */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.65, 0.007, 8, 80]} />
          <meshBasicMaterial color={col} transparent opacity={active ? 0.5 : 0.15} />
        </mesh>

        {/* Point light — each node glows its own color */}
        <pointLight color={col} intensity={isSelected ? 4 : active ? 2.5 : 1.0} distance={3.5} />

        {/* Always-visible phase number badge */}
        <Html center distanceFactor={6} zIndexRange={[10, 0]}>
          <div
            className="select-none pointer-events-none"
            style={{
              fontFamily: "monospace",
              fontWeight: 900,
              fontSize: "11px",
              color: phase.color,
              letterSpacing: "0.15em",
              textShadow: `0 0 8px ${phase.color}`,
              marginTop: "-52px",
              whiteSpace: "nowrap",
            }}
          >
            {phase.num}
          </div>
        </Html>

        {/* Expanded info card on click */}
        {isSelected && (
          <Html
            center
            distanceFactor={5}
            position={[0, 1.1, 0]}
            zIndexRange={[100, 0]}
            style={{ pointerEvents: "none" }}
          >
            <div
              style={{
                width: "220px",
                background: "rgba(5,5,7,0.92)",
                border: `1px solid ${phase.color}55`,
                borderRadius: "14px",
                padding: "14px 16px",
                boxShadow: `0 0 24px ${phase.color}30, 0 4px 24px rgba(0,0,0,0.6)`,
                backdropFilter: "blur(14px)",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: phase.color,
                  marginBottom: "6px",
                  fontFamily: "monospace",
                }}
              >
                {phase.date}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 900,
                  color: "#ffffff",
                  marginBottom: "6px",
                  lineHeight: 1.3,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {phase.title}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#a1a1aa",
                  lineHeight: 1.5,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {phase.desc}
              </div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

/* ─── Scene ─────────────────────────────────────────────────────────────── */

function Scene({
  selected,
  onSelect,
}: {
  selected: number | null;
  onSelect: (i: number | null) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 6, 4]} intensity={1.2} color="#8b5cf6" />
      <pointLight position={[0, -6, -4]} intensity={0.8} color="#06b6d4" />

      <Starfield />
      <ConnectionTube />

      {PHASES.map((phase, i) => (
        <MilestoneNode
          key={phase.num}
          phase={phase}
          position={NODE_POSITIONS[i]}
          index={i}
          isSelected={selected === i}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={4}
        maxDistance={14}
        autoRotate={selected === null}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(Math.PI * 3) / 4}
      />
    </>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────────── */

export default function MilestoneScene3D() {
  const [selected, setSelected] = useState<number | null>(null);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      if (!window.WebGLRenderingContext || (!c.getContext("webgl") && !c.getContext("experimental-webgl"))) {
        setWebglOk(false);
      }
    } catch {
      setWebglOk(false);
    }
  }, []);

  const handleSelect = useCallback((i: number | null) => setSelected(i), []);

  if (!webglOk) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-zinc-500 text-sm">
        WebGL not supported on this device.
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/8 bg-zinc-950/80"
         style={{ height: "520px" }}>
      {/* Instructions overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 px-4 py-1.5 rounded-full bg-black/60 border border-white/8 backdrop-blur-md">
          🖱 Drag to orbit · Scroll to zoom · Click a node to expand
        </span>
      </div>

      {/* Selected phase strip at bottom */}
      {selected !== null && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/70 border backdrop-blur-md"
             style={{ borderColor: `${PHASES[selected].color}44` }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: PHASES[selected].color }} />
          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: PHASES[selected].color }}>
            Phase {PHASES[selected].num} — {PHASES[selected].title}
          </span>
          <button
            className="ml-2 text-zinc-500 hover:text-white text-xs clickable"
            onClick={() => setSelected(null)}
          >
            ✕
          </button>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 1, 9], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        onPointerMissed={() => setSelected(null)}
      >
        <Scene selected={selected} onSelect={handleSelect} />
      </Canvas>
    </div>
  );
}
