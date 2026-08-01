'use client';
import { useEffect, useRef, useState } from 'react';

interface FPSMonitor {
  fps: number;
  isLowEnd: boolean;
  isVeryLowEnd: boolean;
}

export function useFPSMonitor(): FPSMonitor {
  const [fps, setFps] = useState(60);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);

  useEffect(() => {
    let running = true;

    const tick = (now: number) => {
      if (!running) return;
      frameCountRef.current++;
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / elapsed));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return {
    fps,
    isLowEnd: fps < 45,
    isVeryLowEnd: fps < 30,
  };
}
