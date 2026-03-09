"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

export default function Particles() {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 500;
    const isExploding = useRef(false);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, []);

    const velocities = useMemo(() => {
        const v = new Float32Array(count);
        for (let i = 0; i < count; i++) v[i] = 0.05 + Math.random() * 0.1;
        return v;
    }, []);

    useEffect(() => {
        const handleSection = (e: any) => {
            // Explode on Skills (Index 2)
            if (e.detail.index === 2) {
                isExploding.current = true;
                setTimeout(() => isExploding.current = false, 1500);
            }
        };
        window.addEventListener('portfolio-section-change', handleSection);
        return () => window.removeEventListener('portfolio-section-change', handleSection);
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const array = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            if (isExploding.current) {
                // Explode outward from center
                const x = array[i * 3];
                const y = array[i * 3 + 1];
                const z = array[i * 3 + 2];
                const vec = new THREE.Vector3(x, y, z).normalize();
                array[i * 3] += vec.x * 0.5;
                array[i * 3 + 1] += vec.y * 0.5;
                array[i * 3 + 2] += vec.z * 0.5;
            } else {
                // Normal travel
                array[i * 3 + 2] += velocities[i];
            }

            // Reset
            if (array[i * 3 + 2] > 10 || Math.abs(array[i * 3]) > 20) {
                array[i * 3 + 2] = -15;
                array[i * 3] = (Math.random() - 0.5) * 10;
                array[i * 3 + 1] = (Math.random() - 0.5) * 10;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#ffffff"
                size={0.03}
                sizeAttenuation
                transparent
                opacity={0.4}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
