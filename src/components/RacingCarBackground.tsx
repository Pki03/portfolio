"use client";

import React, { useRef, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// ── Car model with custom materials ──
function CarModel() {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/ferrari.glb");

  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#0a0a0a"),
        metalness: 0.3,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        envMapIntensity: 2.5,
        reflectivity: 1.0,
      }),
    [],
  );

  const accentMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#111111"),
        metalness: 0.6,
        roughness: 0.3,
        envMapIntensity: 1.0,
      }),
    [],
  );

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#ffffff"),
        metalness: 0.0,
        roughness: 0.0,
        transmission: 0.95,
        thickness: 0.5,
        envMapIntensity: 1.5,
        transparent: true,
        opacity: 0.7,
        ior: 1.5,
      }),
    [],
  );

  const tireMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#000000"),
        metalness: 0.0,
        roughness: 1.0,
      }),
    [],
  );

  const wheelMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#111111"),
        metalness: 0.9,
        roughness: 0.1,
        envMapIntensity: 1.5,
      }),
    [],
  );

  const chromeMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#cccccc"),
        metalness: 1.0,
        roughness: 0.1,
        envMapIntensity: 2.0,
      }),
    [],
  );

  const carbonMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1a1a1a"),
        metalness: 0.3,
        roughness: 0.4,
        envMapIntensity: 0.5,
      }),
    [],
  );

  const tailLightMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#5c0000"),
        emissive: new THREE.Color("#3a0000"),
        emissiveIntensity: 1.5,
        metalness: 0.05,
        roughness: 0.3,
      }),
    [],
  );

  const wheelInnerMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#080808"),
        metalness: 0.6,
        roughness: 0.7,
      }),
    [],
  );

  const headLightMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#ffffff"),
        emissive: new THREE.Color("#ffffff"),
        emissiveIntensity: 0.8,
        metalness: 0.0,
        roughness: 0.0,
        envMapIntensity: 0.5,
      }),
    [],
  );

  const interiorMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#181818"),
        metalness: 0.0,
        roughness: 0.9,
      }),
    [],
  );

  const plasticMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1a1a1a"),
        metalness: 0.0,
        roughness: 0.9,
      }),
    [],
  );

  const metalMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#888888"),
        metalness: 1.0,
        roughness: 0.2,
        envMapIntensity: 1.0,
      }),
    [],
  );

  /* ───────── Material application ───────── */
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      const n = mesh.name.toLowerCase();

      if (n.includes("glass") || n.includes("window") || n.includes("windscreen")) {
        mesh.material = glassMat;
      } else if (n.includes("tire") || n.includes("tyre") || n.includes("wheel_tyre")) {
        mesh.material = tireMat;
      } else if (n.includes("wheel") || n.includes("rim")) {
        mesh.material = wheelMat;
      } else if (n.includes("chrome") || n.includes("grille") || n.includes("exhaust") || n.includes("badge") || n.includes("logo") || n.includes("emblem")) {
        mesh.material = chromeMat;
      } else if (n.includes("headlight") || n.includes("head_light") || n.includes("indicator") || n.includes("turn")) {
        mesh.material = headLightMat;
      } else if (n.includes("caliper") || n.includes("disc") || n.includes("rotor") || n.includes("hub") || n.includes("spindle") || n.includes("knuckle") || n.includes("barrel")) {
        mesh.material = wheelInnerMat;
      } else if (n.includes("tail") || n.includes("brake") || n.includes("rearlight") || n.includes("stop")) {
        mesh.material = tailLightMat;
      } else if (n.includes("plastic") || n.includes("trim") || n.includes("grille_frame") || n.includes("bumper")) {
        mesh.material = plasticMat;
      } else if (n.includes("interior") || n.includes("seat") || n.includes("dash") || n.includes("steering") || n.includes("carpet") || n.includes("floor")) {
        mesh.material = interiorMat;
      } else if (n.includes("carbon") || n.includes("spoiler") || n.includes("diffuser")) {
        mesh.material = carbonMat;
      } else if (n.includes("metal") || n.includes("strut") || n.includes("suspension") || n.includes("spring") || n.includes("axel")) {
        mesh.material = metalMat;
      } else if (n.includes("accent") || n.includes("side_skirt") || n.includes("splitter")) {
        mesh.material = accentMat;
      } else {
        mesh.material = bodyMat;
      }
    });
  }, [scene, bodyMat, glassMat, tireMat, wheelMat, chromeMat, headLightMat, tailLightMat, plasticMat, interiorMat, carbonMat, metalMat, accentMat, wheelInnerMat]);

  /* ───────── Animation ───────── */
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.03;
    groupRef.current.rotation.y = t * 0.15;
  });

  return (
    <group ref={groupRef} position={[0.3, 0, 0]} scale={0.75}>
      <primitive object={scene} />
    </group>
  );
}

// ── Scene ──
export default function RacingCarBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0.8, 0.5, 4.2], fov: 26 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none", width: "100%", height: "100%" }}
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 0);
          state.gl.toneMapping = THREE.ACESFilmicToneMapping;
          state.gl.toneMappingExposure = 1.0;
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 4]} intensity={4.0} />
        <directionalLight position={[-5, 3, 3]} intensity={2.0} color="#ffddaa" />
        <directionalLight position={[0, 1, -5]} intensity={0.8} color="#4488ff" />
        <pointLight position={[0, 2, 2]} intensity={0.3} color="#dc2626" />

        {/* Ground plane with reflections */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshPhysicalMaterial
            color="#090909"
            metalness={1.0}
            roughness={0.15}
            envMapIntensity={1.0}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Soft contact shadows */}
        <ContactShadows
          position={[0, -0.44, 0]}
          opacity={0.5}
          scale={10}
          blur={2.5}
          far={1}
        />

        <Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={1.2} />
          <CarModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
