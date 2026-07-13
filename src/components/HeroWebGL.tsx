"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Procedural Dotted Globe representing landmasses
function ProceduralDottedGlobe() {
  const dotCount = 2000;
  const points = React.useMemo(() => {
    const coords: number[] = [];
    const temp = new THREE.Vector3();
    const radius = 1.7;

    for (let i = 0; i < dotCount; i++) {
      // Golden spiral distribution on sphere for uniform spacing
      const phi = Math.acos(-1 + (2 * i) / dotCount);
      const theta = Math.sqrt(dotCount * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      temp.set(x, y, z).normalize();
      
      // Trigonometric noise sum to model organic continent shapes
      const noise = 
        Math.sin(temp.x * 4.5) * Math.cos(temp.y * 4.5) +
        Math.sin(temp.y * 9.0) * Math.cos(temp.z * 9.0) +
        Math.sin(temp.z * 3.0) * Math.cos(temp.x * 7.0);

      // Threshold to filter coordinates as landmass dots
      if (noise > -0.15) {
        coords.push(x, y, z);
      }
    }

    return new Float32Array(coords);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.048}
        color="#8b5cf6"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Beacon node orbiting along a Bezier path
function ArcBeacon({ curve, speed, color }: { curve: THREE.QuadraticBezierCurve3; speed: number; color: string }) {
  const beaconRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = (state.clock.getElapsedTime() * speed) % 1;
    if (beaconRef.current) {
      const pos = curve.getPointAt(t);
      beaconRef.current.position.copy(pos);
    }
  });

  return (
    <mesh ref={beaconRef}>
      <sphereGeometry args={[0.038, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// Global Networking Arcs Component
function GlobalArcs() {
  const arcPoints = React.useMemo(() => {
    // Latitude and longitude coordinates representing connection nodes
    const coords = [
      { lat1: 12.97, lon1: 77.59, lat2: 37.77, lon2: -122.41, color: "#06b6d4", speed: 0.35 }, // Bangalore - SF
      { lat1: 51.507, lon1: -0.127, lat2: 35.676, lon2: 139.65, color: "#8b5cf6", speed: 0.42 }, // London - Tokyo
      { lat1: -33.868, lon1: 151.209, lat2: 40.712, lon2: -74.006, color: "#ec4899", speed: 0.3 }, // Sydney - NY
      { lat1: 48.856, lon1: 2.352, lat2: -33.924, lon2: 18.424, color: "#10b981", speed: 0.48 }, // Paris - Cape Town
      { lat1: -22.906, lon1: -43.172, lat2: 19.076, lon2: 72.877, color: "#f59e0b", speed: 0.38 }, // Rio - Mumbai
      { lat1: 30.044, lon1: 31.235, lat2: 55.755, lon2: 37.617, color: "#06b6d4", speed: 0.45 }, // Cairo - Moscow
    ];

    const getSpherePoint = (lat: number, lon: number, r = 1.7) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(r * Math.sin(phi) * Math.sin(theta)),
        r * Math.cos(phi),
        -(r * Math.sin(phi) * Math.cos(theta))
      );
    };

    return coords.map((c) => {
      const start = getSpherePoint(c.lat1, c.lon1);
      const end = getSpherePoint(c.lat2, c.lon2);
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      
      // Height of the Bezier arch proportional to distance
      const height = 1.7 + dist * 0.38;
      const ctrl = mid.clone().normalize().multiplyScalar(height);
      const curve = new THREE.QuadraticBezierCurve3(start, ctrl, end);
      return { start, end, curve, color: c.color, speed: c.speed };
    });
  }, []);

  return (
    <group>
      {arcPoints.map((arc, i) => {
        const points = arc.curve.getPoints(40);
        const floatArray = new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]));

        return (
          <group key={i}>
            {/* Draw curve line */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[floatArray, 3]}
                  count={points.length}
                  array={floatArray}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={arc.color} transparent opacity={0.3} />
            </line>

            {/* Connection Node points */}
            <mesh position={arc.start}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color={arc.color} />
            </mesh>
            <mesh position={arc.end}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color={arc.color} />
            </mesh>

            {/* Flying Beacon package */}
            <ArcBeacon curve={arc.curve} speed={arc.speed} color={arc.color} />
          </group>
        );
      })}
    </group>
  );
}

// Beacon node orbiting on a ring path
function OrbitBeacon({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const beaconRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (beaconRef.current) {
      beaconRef.current.position.x = Math.cos(t) * radius;
      beaconRef.current.position.y = Math.sin(t) * radius;
    }
  });

  return (
    <mesh ref={beaconRef}>
      <sphereGeometry args={[0.065, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// Combined 3D Globe Visual Scene
function HolographicGlobe() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const outerWireframeRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (globeGroupRef.current) {
      // Gentle floating animation
      globeGroupRef.current.position.y = Math.sin(t * 0.4) * 0.12;
      // Auto-rotation of the core group
      globeGroupRef.current.rotation.y = t * 0.02;
    }

    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.y = -t * 0.015;
      outerWireframeRef.current.rotation.z = Math.cos(t * 0.005) * 0.02;
    }

    // Orbiting ring rotations
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.06;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.04;
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.03;
  });

  return (
    <group ref={globeGroupRef}>
      {/* 1. Procedural Dotted World Map Globe */}
      <ProceduralDottedGlobe />

      {/* 2. Soft Glowing Sphere Core */}
      <mesh scale={[1.68, 1.68, 1.68]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          emissive="#4338ca"
          emissiveIntensity={0.65}
          transparent
          opacity={0.06}
          roughness={0.9}
          metalness={0.1}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Outer Lat-Long Wireframe (Grid overlay) */}
      <mesh ref={outerWireframeRef} scale={[1.71, 1.71, 1.71]}>
        <sphereGeometry args={[1, 18, 14]} />
        <meshPhysicalMaterial
          wireframe
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={1.2}
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Global Data Bezier Arc Network */}
      <GlobalArcs />

      {/* 5. Tilted Satellite Orbit Rings */}
      {/* Ring 1 - Cyan */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.35, 0.008, 8, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <OrbitBeacon radius={2.35} speed={0.6} color="#06b6d4" />
      </mesh>

      {/* Ring 2 - Violet */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, -Math.PI / 4, 0]}>
        <torusGeometry args={[2.55, 0.006, 8, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 3, -Math.PI / 4, 0]}>
        <OrbitBeacon radius={2.55} speed={-0.45} color="#8b5cf6" />
      </mesh>

      {/* Ring 3 - Pink (Equatorial) */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.005, 8, 100]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Particle field representing space dust / data points
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 350;

  const pointsData = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.01;
    pointsRef.current.rotation.x = Math.sin(t * 0.004) * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[pointsData, 3]}
          count={count}
          array={pointsData}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#06b6d4"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroWebGL() {
  const [mounted, setMounted] = useState(false);
  const [useWebGL, setUseWebGL] = useState(true);
  const fallbackCanvasRef = useRef<HTMLCanvasElement>(null);

  // Mounted and WebGL support check
  useEffect(() => {
    setMounted(true);

    try {
      const canvas = document.createElement("canvas");
      const glSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setUseWebGL(glSupported && !isMobile);
    } catch {
      setUseWebGL(false);
    }
  }, []);

  // 2D Canvas Fallback particle field for mobile / non-WebGL
  useEffect(() => {
    if (useWebGL || !mounted || !fallbackCanvasRef.current) return;

    const canvas = fallbackCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      opacity: number;
    }> = [];

    const pCount = 80;
    for (let i = 0; i < pCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate2D = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and move particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
        ctx.fill();
      });

      // Add a central soft 2D glowing circle
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        200
      );
      grad.addColorStop(0, "rgba(139, 92, 246, 0.08)");
      grad.addColorStop(1, "rgba(5, 5, 7, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 200, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate2D);
    };

    animate2D();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [useWebGL, mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background pointer-events-none">
      {/* Aurora glowing backdrop blobs */}
      <div className="absolute -top-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-accent-violet/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-accent-cyan/8 blur-[120px] animate-pulse-slow-delayed" />

      {useWebGL ? (
        <div className="w-full h-full opacity-70">
          <Canvas camera={{ position: [0, 0, 6.2], fov: 55 }} gl={{ antialias: true }}>
            <ambientLight intensity={0.65} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
            <pointLight position={[-10, -10, 10]} intensity={1.5} color="#06b6d4" />
            <directionalLight position={[0, 5, 2]} intensity={0.5} />
            <HolographicGlobe />
            <Particles />
            {/* Interactive orbit rotation with zoom and panning disabled */}
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate 
              autoRotateSpeed={0.3} 
            />
          </Canvas>
        </div>
      ) : (
        <canvas ref={fallbackCanvasRef} className="w-full h-full opacity-70" />
      )}

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Dark Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />
    </div>
  );
}
