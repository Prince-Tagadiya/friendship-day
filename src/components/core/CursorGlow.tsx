'use client';
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };

    const animate = () => {
      const { x: mx, y: my } = mouseRef.current;
      const { x: rx, y: ry } = ringPosRef.current;

      const nx = rx + (mx - rx) * 0.12;
      const ny = ry + (my - ry) * 0.12;
      ringPosRef.current = { x: nx, y: ny };

      ring.style.transform = `translate(${nx - 16}px, ${ny - 16}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Scale ring on hover over interactive elements
    const onEnter = () => {
      if (ring) {
        ring.style.width = '52px';
        ring.style.height = '52px';
        ring.style.opacity = '0.6';
      }
    };
    const onLeave = () => {
      if (ring) {
        ring.style.width = '32px';
        ring.style.height = '32px';
        ring.style.opacity = '1';
      }
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('button, a, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // Observe new interactive elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('button, a, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
