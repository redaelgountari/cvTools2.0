"use client";

export default function Lights() {
    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} color="#ff4400" intensity={50} />
            <pointLight position={[-5, -5, 5]} color="#0044ff" intensity={50} />
            <pointLight position={[0, 5, -5]} color="#ffffff" intensity={30} />
        </>
    );
}
