"use client";

import { Bloom, ChromaticAberration, Vignette, EffectComposer } from "@react-three/postprocessing";
import { Vector2 } from "three";

export default function PostFX({ intensity = 1.5 }: { intensity?: number }) {
    return (
        <EffectComposer>
            <Bloom
                intensity={intensity}
                luminanceThreshold={0.2}
                mipmapBlur
            />
            <ChromaticAberration
                offset={new Vector2(0.0005, 0.0005)}
            />
            <Vignette
                darkness={0.5}
                offset={0.5}
            />
        </EffectComposer>
    );
}
