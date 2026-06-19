"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Environment, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";

// ── Sound system ──
function useKeycapSound() {
  const pressRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const ctx = new AudioContext();
        const r = await fetch("/assets/keycap-sounds/press.mp3");
        pressRef.current = await ctx.decodeAudioData(await r.arrayBuffer());
      } catch { /* ignore */ }
    }
    load();
  }, []);

  const play = useCallback(() => {
    const buf = pressRef.current;
    if (!buf) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    ctx.resume();
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.detune.value = (Math.random() - 0.5) * 200;
    const gn = ctx.createGain();
    gn.gain.value = 0.2;
    src.connect(gn); gn.connect(ctx.destination);
    src.start(0);
  }, []);

  return play;
}

// ── Data ──
const categories = [
  { key: "languages",  label: "LANGUAGES",  color: "#3b82f6", items: profile.techStack.languages },
  { key: "backend",    label: "BACKEND",    color: "#22c55e", items: profile.techStack.backend },
  { key: "frontend",    label: "FRONTEND",    color: "#a855f7", items: profile.techStack.frontend },
  { key: "databases",   label: "DATABASES",  color: "#f59e0b", items: profile.techStack.databases },
  { key: "devops",      label: "DEVOPS",     color: "#06b6d4", items: profile.techStack.devops },
  { key: "ai",          label: "AI & ML",    color: "#ef4444", items: profile.techStack.ai },
  { key: "csFundamentals", label: "CS FUND.", color: "#ec4899", items: profile.techStack.csFundamentals },
];

// ── Single Keycap ──
function Keycap({
  label, color, isCategory,
  x, y,
  onHover, onUnhover,
}: {
  label: string; color: string; isCategory?: boolean;
  x: number; y: number;
  onHover: () => void; onUnhover: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null!);
  const w = isCategory ? 1.1 : 0.55;
  const d = 0.45;
  const h = 0.08;

  const handleOver = (e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(true); onHover(); };
  const handleOut = () => { setHovered(false); onUnhover(); };

  // Smooth hover lift
  useFrame(() => {
    if (!meshRef.current) return;
    const t = hovered ? 0.06 : 0;
    meshRef.current.position.y += (t - meshRef.current.position.y) * 0.08;
  });

  return (
    <group>
      {/* Shadow */}
      <mesh position={[x, y - 0.04, 0]}>
        <planeGeometry args={[w + 0.08, d + 0.08]} />
        <meshBasicMaterial color="#000" transparent opacity={hovered ? 0.35 : 0.1} depthWrite={false} />
      </mesh>

      {/* Keycap body */}
      <mesh
        ref={meshRef}
        position={[x, y, 0]}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        castShadow
      >
        <boxGeometry args={[w, h, d]} />
        <meshPhysicalMaterial
          color={hovered ? "#fff" : "#18181b"}
          metalness={hovered ? 0.0 : 0.3}
          roughness={hovered ? 0.2 : 0.6}
          clearcoat={hovered ? 0.5 : 0.05}
          emissive={hovered ? color : "#000"}
          emissiveIntensity={hovered ? 0.25 : 0}
        />
      </mesh>

      {/* Top bevel */}
      <mesh position={[x, y + 0.045, 0]}>
        <planeGeometry args={[w - 0.04, d - 0.04]} />
        <meshBasicMaterial color="#fff" transparent opacity={hovered ? 0.2 : 0.04} depthWrite={false} />
      </mesh>

      {/* Bottom edge accent */}
      <mesh position={[x, y - h / 2 - 0.001, 0]}>
        <planeGeometry args={[w + 0.02, d + 0.02]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.3 : 0} depthWrite={false} />
      </mesh>

      {/* Truncate label if too long */}
      <Text
        position={[x, y + 0.055, 0]}
        fontSize={isCategory ? 0.045 : 0.04}
        color={hovered ? (isCategory ? "#000" : "#fff") : "#a1a1aa"}
        anchorX="center"
        anchorY="middle"
        maxWidth={w - 0.08}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.&!-+ "
      >
        {label.length > (isCategory ? 10 : 9) ? label.substring(0, (isCategory ? 9 : 8)) + ".." : label}
      </Text>
    </group>
  );
}

// ── Scene ──
function Scene({
  onSelect, onDeselect,
}: {
  onSelect: (name: string, color: string) => void;
  onDeselect: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const playSound = useKeycapSound();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHover = useCallback((name: string, color: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    playSound();
    onSelect(name, color);
  }, [playSound, onSelect]);

  const handleUnhover = useCallback(() => {
    hoverTimer.current = setTimeout(() => onDeselect(), 80);
  }, [onDeselect]);

  useEffect(() => () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }, []);

  // Gentle float + rotation
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.1;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {categories.map((cat, ri) => {
        const rowY = 1.5 - ri * 0.48;
        const stagger = [0, 0.12, 0.24, 0.12, 0, 0.18, 0.06][ri] ?? 0;
        const totalW = 1.1 + cat.items.length * 0.55 + (cat.items.length) * 0.06;
        const startX = -(totalW / 2) + stagger;

        return (
          <group key={cat.key}>
            <Keycap
              label={cat.label} color={cat.color} isCategory
              x={startX} y={rowY}
              onHover={() => handleHover(cat.label, cat.color)}
              onUnhover={handleUnhover}
            />
            {cat.items.map((tech, i) => {
              const kx = startX + 1.1 + 0.06 + i * (0.55 + 0.06);
              return (
                <Keycap
                  key={tech} label={tech} color={cat.color}
                  x={kx} y={rowY}
                  onHover={() => handleHover(tech, cat.color)}
                  onUnhover={handleUnhover}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

// ── Main ──
export default function KeyboardSkills() {
  const [skill, setSkill] = useState<{ name: string; color: string } | null>(null);

  return (
    <div className="relative w-full h-[480px] md:h-[620px] rounded-2xl overflow-hidden border border-white/[0.08] bg-neutral-950">
      {/* Canvas */}
      <Canvas
        camera={{ position: [0, 0.6, 4.0], fov: 30, near: 0.1, far: 20 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#09090b");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 4]} intensity={1.5} />
        <directionalLight position={[-3, 2, -3]} intensity={0.5} />
        <pointLight position={[0, 3, 2]} intensity={0.4} color="#dc2626" />
        <Environment preset="city" />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.65, 0]} receiveShadow>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#0a0a0c" />
        </mesh>

        {/* Grid */}
        <gridHelper args={[12, 20, "#1a1a1e", "#1a1a1e"]} position={[0, -0.64, 0]} />

        {/* 3D Scene */}
        <Scene
          onSelect={(n, c) => setSkill({ name: n, color: c })}
          onDeselect={() => setSkill(null)}
        />

        {/* Camera control for orbit (comment out for production) */}
        {/* <OrbitControls /> */}
      </Canvas>

      {/* Info overlay */}
      <AnimatePresence>
        {skill && (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/80 backdrop-blur-lg border border-white/10 shadow-2xl">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: skill.color }} />
              <span className="text-sm font-semibold text-white/90">{skill.name}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner stats */}
      <div className="absolute top-3 left-3 text-[10px] font-mono text-white/10 tracking-widest select-none pointer-events-none">
        7⨯{categories.reduce((a, c) => a + c.items.length, 0)}
      </div>
      <div className="absolute top-3 right-3 flex gap-1 pointer-events-none">
        {categories.map((c) => (
          <span key={c.key} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
        ))}
      </div>
    </div>
  );
}
