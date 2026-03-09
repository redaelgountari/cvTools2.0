"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const mousePos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px) scale(${isHovering ? 4 : 1})`;
            }
        };

        const onHoverStart = () => setIsHovering(true);
        const onHoverEnd = () => setIsHovering(false);

        window.addEventListener("mousemove", onMouseMove);

        const targets = document.querySelectorAll("a, button, [role='button']");
        targets.forEach(t => {
            t.addEventListener("mouseenter", onHoverStart);
            t.addEventListener("mouseleave", onHoverEnd);
        });

        // Ring LERP animation
        let frameId: number;
        const animate = () => {
            const lerp = 0.12;
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;
                ringRef.current.style.opacity = isHovering ? "0" : "1";
            }

            frameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(frameId);
            targets.forEach(t => {
                t.removeEventListener("mouseenter", onHoverStart);
                t.removeEventListener("mouseleave", onHoverEnd);
            });
        };
    }, [isHovering]);

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-[10px] h-[10px] bg-[#ff3c00] rounded-full pointer-events-none z-[9999] transition-transform duration-200 ease-out"
            />
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-[32px] h-[32px] border border-white rounded-full pointer-events-none z-[9998] transition-opacity duration-300"
            />
        </>
    );
}
