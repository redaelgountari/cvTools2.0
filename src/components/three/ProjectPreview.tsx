"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Shape({ type }: { type: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.5;
        meshRef.current.rotation.y = time * 0.8;

        if (type === "Pulse") {
            const scale = 1 + Math.sin(time * 3) * 0.2;
            meshRef.current.scale.setScalar(scale);
        }

        if (type === "Drift") {
            meshRef.current.position.y = Math.sin(time) * 0.2;
        }
    });

    return (
        <mesh ref={meshRef}>
            {type === "Void" && <icosahedronGeometry args={[1, 0]} />}
            {type === "Pulse" && <torusKnotGeometry args={[0.7, 0.2, 128, 16]} />}
            {type === "Drift" && <torusGeometry args={[0.8, 0.2, 16, 100]} />}
            <meshPhysicalMaterial
                color={type === "Void" ? "#0044ff" : type === "Pulse" ? "#ff4400" : "#ffffff"}
                metalness={0.9}
                roughness={0.1}
                emissive={type === "Void" ? "#001133" : type === "Pulse" ? "#220800" : "#111111"}
                emissiveIntensity={2}
            />
        </mesh>
    );
}

export default function ProjectPreview({ type }: { type: string }) {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={50} />
                <Shape type={type} />
            </Canvas>
        </div>
    );
}
