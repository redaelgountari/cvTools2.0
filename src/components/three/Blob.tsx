"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import * as THREE from "three";

interface BlobProps {
    materialRef: React.RefObject<THREE.MeshPhysicalMaterial | null>;
}

export default function Blob({ materialRef }: BlobProps) {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Organic slow breathing / pulse
        const breathe = 1 + Math.sin(time * 0.5) * 0.05;
        meshRef.current.scale.multiplyScalar(breathe / meshRef.current.scale.x);

        // Subtle rotation
        meshRef.current.rotation.z = time * 0.1;
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1.5, 128, 128]} />
            <meshPhysicalMaterial
                ref={materialRef}
                roughness={0.02}
                metalness={0.9}
                transmission={0.8}
                thickness={2}
                envMapIntensity={2}
                clearcoat={1}
                clearcoatRoughness={0.1}
            />
        </mesh>
    );
}
