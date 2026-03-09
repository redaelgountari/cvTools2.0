"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import Blob from "./Blob";
import Particles from "./Particles";
import Lights from "./Lights";
import PostFX from "./PostFX";

function SceneContent() {
  const { mouse, camera } = useThree();
  const blobWrapperRef = useRef<THREE.Group>(null);
  const blobMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const stateRef = useRef({
    scale: 0,
    x: 0, y: 0, z: 0,
    color: new THREE.Color("#0a1628"),
    lightColor: new THREE.Color("#ffffff"),
    bloom: 1.5,
    speed: 1.0
  });

  useEffect(() => {
    // Initial reveal animation
    gsap.fromTo(stateRef.current, 
      { scale: 0 },
      { scale: 1.0, duration: 2, ease: "bounce.out", delay: 0.5 }
    );

    const states = [
      { scale: 1.0, x: 0,    y: 0,   z: 0,  color: "#0a1628", light: "#ffffff", bloom: 1.5, speed: 1 }, // hero
      { scale: 1.5, x: -3.5, y: 0,   z: -2, color: "#002244", light: "#4488ff", bloom: 1.5, speed: 0.8 }, // about
      { scale: 0.0, x: 0,    y: 0,   z: 0,  color: "#0a1628", light: "#ffffff", bloom: 1.5, speed: 2 }, // skills
      { scale: 2.0, x: 0,    y: 3.5, z: -6, color: "#020202", light: "#222222", bloom: 0.5, speed: 0.3 }, // projects
      { scale: 1.1, x: 0,    y: 0,   z: 1,  color: "#e8e0d0", light: "#ffccaa", bloom: 3.0, speed: 1.5 }, // contact
    ];

    const handleSection = (e: any) => {
      const target = states[e.detail.index];
      gsap.to(stateRef.current, {
        scale: target.scale,
        x: target.x, y: target.y, z: target.z,
        bloom: target.bloom,
        speed: target.speed,
        duration: 2.0,
        ease: "expo.inOut"
      });
      gsap.to(stateRef.current.color, { r: new THREE.Color(target.color).r, g: new THREE.Color(target.color).g, b: new THREE.Color(target.color).b, duration: 2 });
      gsap.to(stateRef.current.lightColor, { r: new THREE.Color(target.light).r, g: new THREE.Color(target.light).g, b: new THREE.Color(target.light).b, duration: 2 });
    };

    window.addEventListener('portfolio-section-change', handleSection);
    return () => window.removeEventListener('portfolio-section-change', handleSection);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (blobWrapperRef.current) {
      // Rotation
      const targetRotX = mouse.y * 0.3;
      const targetRotY = mouse.x * 0.3;
      blobWrapperRef.current.rotation.x = THREE.MathUtils.lerp(blobWrapperRef.current.rotation.x, targetRotX, 0.05);
      blobWrapperRef.current.rotation.y = THREE.MathUtils.lerp(blobWrapperRef.current.rotation.y, targetRotY, 0.05);

      // Scale & Position
      blobWrapperRef.current.scale.setScalar(THREE.MathUtils.lerp(blobWrapperRef.current.scale.x, stateRef.current.scale, 0.05));
      blobWrapperRef.current.position.lerp(new THREE.Vector3(stateRef.current.x, stateRef.current.y, stateRef.current.z), 0.05);
    }

    if (blobMaterialRef.current) {
      blobMaterialRef.current.color.lerp(stateRef.current.color, 0.05);
      blobMaterialRef.current.emissive.lerp(stateRef.current.color, 0.05);
      
      // Heartbeat pulse for Contact scene (Index 4)
      if (stateRef.current.scale === 1.1) {
         const heart = 1 + Math.sin(time * 12) * 0.02 * (Math.sin(time * 3) > 0.5 ? 1 : 0);
         blobWrapperRef.current?.scale.multiplyScalar(heart);
      }
    }

    if (lightRef.current) {
      lightRef.current.color.lerp(stateRef.current.lightColor, 0.05);
    }

    // Camera
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, -mouse.x * 0.2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouse.y * 0.2, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <group ref={blobWrapperRef}>
        <Blob materialRef={blobMaterialRef} />
      </group>
      <Particles />
      <Lights />
      <pointLight ref={lightRef} position={[2, 2, 2]} intensity={10} />
      <Environment preset="night" />
      <PostFX intensity={stateRef.current.bloom} />
    </>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas dpr={[1, 2]} gl={{ antialias: false }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
