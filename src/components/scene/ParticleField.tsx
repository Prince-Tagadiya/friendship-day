'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count: number;
}

function Particles({ count }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, colors, sizes, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);

    const palette = [
      new THREE.Color('#F8C8DC'), // primary pink
      new THREE.Color('#D4A373'), // rose gold
      new THREE.Color('#FFF8F2'), // cream
      new THREE.Color('#E8C4A0'), // warm light
      new THREE.Color('#F4B8CC'), // soft pink
    ];

    for (let i = 0; i < count; i++) {
      // Random positions across viewport
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      // Color from palette
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
      speeds[i] = Math.random() * 0.3 + 0.1;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, sizes, speeds, offsets };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  const positionsRef = useRef(positions.slice());

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;

    const posAttr = meshRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const t = timeRef.current * speeds[i] + offsets[i];

      // Organic firefly motion
      posAttr.array[i * 3] = positionsRef.current[i * 3] + Math.sin(t * 0.7) * 0.3;
      posAttr.array[i * 3 + 1] = positionsRef.current[i * 3 + 1] + Math.cos(t * 0.5) * 0.4;
      posAttr.array[i * 3 + 2] = positionsRef.current[i * 3 + 2] + Math.sin(t * 0.3) * 0.2;
    }

    posAttr.needsUpdate = true;
  });

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

interface ParticleFieldProps {
  count?: number;
  disabled?: boolean;
}

export default function ParticleField({ count = 400, disabled = false }: ParticleFieldProps) {
  if (disabled) return null;

  return (
    <div className="canvas-overlay" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
        style={{ background: 'transparent' }}
      >
        <Particles count={count} />
      </Canvas>
    </div>
  );
}
