'use client';
import { useEffect, useRef, useMemo } from 'react';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
  opacity: number;
}

const EMOJIS = ['🌸', '🌸', '🌸', '✨', '💖', '🌸'];

export default function FloatingPetals({ count = 12 }: { count?: number }) {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 10,
      size: 12 + Math.random() * 12,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      opacity: 0.4 + Math.random() * 0.4,
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          style={{
            position: 'absolute',
            left: `${petal.x}%`,
            top: '-30px',
            fontSize: `${petal.size}px`,
            opacity: petal.opacity,
            animation: `petalDrift ${petal.duration}s ${petal.delay}s linear infinite`,
            willChange: 'transform',
            filter: 'blur(0.3px)',
          }}
        >
          {petal.emoji}
        </div>
      ))}
    </div>
  );
}
