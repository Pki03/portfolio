"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

/* ───────── Constants ───────── */
const COUNT = 800;
const CONNECT_RADIUS = 2.8;
const SPHERE_RADIUS = 8;
const CONNECT_STEP = 3;

/* ───────── Scene ───────── */
function ParticleScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const prevMouse = useRef({ x: 0, y: 0 });

  // ── Seed data ──
  const seed = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const phase = new Float32Array(COUNT);
    const orbitSpeed = new Float32Array(COUNT);
    const orbitRadius = new Float32Array(COUNT);
    const orbitOffset = new Float32Array(COUNT);

    // Site accent colors: blue (#3b82f6) → cyan (#06b6d4)
    const blue = new THREE.Color("#3b82f6");
    const cyan = new THREE.Color("#06b6d4");

    for (let i = 0; i < COUNT; i++) {
      const r = SPHERE_RADIUS * Math.pow(Math.random(), 0.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
      pos[i * 3 + 2] = Math.cos(phi) * r;

      // Blend between blue and cyan with random lightness variation
      const mix = Math.random();
      const bright = 0.6 + Math.random() * 0.4; // keep colors vibrant
      const c = blue.clone().lerp(cyan, mix).multiplyScalar(bright);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      phase[i] = Math.random() * Math.PI * 2;
      orbitSpeed[i] = 0.08 + Math.random() * 0.18;
      orbitRadius[i] = 0.04 + Math.random() * 0.1;
      orbitOffset[i] = Math.random() * Math.PI * 2;
    }
    return { pos, col, phase, orbitSpeed, orbitRadius, orbitOffset };
  }, []);

  // ── Three.js geometries (built once) ──
  const particleGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(seed.pos), 3));
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(seed.col), 3));
    return g;
  }, [seed]);

  const MAX_LINE_VERTS = 12000;
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(MAX_LINE_VERTS * 3), 3));
    g.setDrawRange(0, 0);
    return g;
  }, []);

  // ── Mouse tracking ──
  const handlePointer = useCallback((e: PointerEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.current.vx = nx - prevMouse.current.x;
    mouse.current.vy = ny - prevMouse.current.y;
    mouse.current.x = nx;
    mouse.current.y = ny;
    prevMouse.current.x = nx;
    prevMouse.current.y = ny;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, [handlePointer]);

  // ── Animation ──
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;

    // --- 1. Rotate group ---
    groupRef.current.rotation.y = t * 0.012 + mouse.current.x * 0.06;
    groupRef.current.rotation.x = Math.sin(t * 0.006) * 0.04 + mouse.current.y * 0.03;

    // --- 2. Animate particle positions (orbital drift) ---
    const pos = particleGeo.attributes.position.array as Float32Array;
    const base = seed.pos;
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const ph = seed.phase[i];
      const spd = seed.orbitSpeed[i];
      const rad = seed.orbitRadius[i];
      const off = seed.orbitOffset[i];

      const ax = Math.sin(t * spd + ph) * rad;
      const ay = Math.cos(t * spd * 0.7 + ph + off) * rad;
      const az = Math.sin(t * spd * 0.5 + ph + off * 1.3) * rad;

      pos[i3] = base[i3] + ax;
      pos[i3 + 1] = base[i3 + 1] + ay;
      pos[i3 + 2] = base[i3 + 2] + az;
    }
    particleGeo.attributes.position.needsUpdate = true;

    // --- 3. Dynamic connection lines ---
    const linePos = lineGeo.attributes.position.array as Float32Array;
    const maxFloats = MAX_LINE_VERTS * 3;
    let idx = 0;
    const threshold = CONNECT_RADIUS + Math.sin(t * 0.1) * 0.3;

    outer:
    for (let i = 0; i < COUNT; i += CONNECT_STEP) {
      const i3 = i * 3;
      const px = pos[i3], py = pos[i3 + 1], pz = pos[i3 + 2];
      for (let j = i + CONNECT_STEP; j < COUNT; j += CONNECT_STEP) {
        const j3 = j * 3;
        const dx = px - pos[j3], dy = py - pos[j3 + 1], dz = pz - pos[j3 + 2];
        if (dx * dx + dy * dy + dz * dz < threshold * threshold) {
          linePos[idx++] = px;
          linePos[idx++] = py;
          linePos[idx++] = pz;
          linePos[idx++] = pos[j3];
          linePos[idx++] = pos[j3 + 1];
          linePos[idx++] = pos[j3 + 2];
          if (idx + 6 > maxFloats) break outer;
        }
      }
    }
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.setDrawRange(0, idx / 3);

    // --- 4. Pulse line opacity with mouse velocity ---
    const mv = Math.abs(mouse.current.vx) + Math.abs(mouse.current.vy);
    const pulseBase = 0.08 + Math.sin(t * 0.15) * 0.04;
    const mouseBoost = Math.min(mv * 0.4, 0.25);
    const lines = groupRef.current.children[1] as THREE.LineSegments;
    if (lines?.material) {
      (lines.material as THREE.LineBasicMaterial).opacity = pulseBase + mouseBoost;
    }

    mouse.current.vx *= 0.92;
    mouse.current.vy *= 0.92;
  });

  return (
    <group ref={groupRef}>
      <points geometry={particleGeo}>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ───────── Canvas wrapper ───────── */
export default function TechBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", pointerEvents: "none" }}
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 0);
        }}
      >
        <ParticleScene />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.4}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
