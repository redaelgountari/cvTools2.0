'use client';

import { useCallback, useState, useEffect } from 'react';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { useTheme } from 'next-themes';
import { loadSlim } from 'tsparticles-slim'; // much smaller bundle

export default function ParticlesBackground() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0"
      options={{
        fullScreen: false,
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: theme === 'dark' ? '#475569' : '#94a3b8',
          },
          links: {
            color: theme === 'dark' ? '#475569' : '#94a3b8',
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            direction: 'none',
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.2,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}