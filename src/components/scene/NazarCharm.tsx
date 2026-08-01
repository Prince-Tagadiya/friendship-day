'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function NazarCharm() {
  const nazarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nazarRef.current) return;

    // Pendulum swing using GSAP
    gsap.to(nazarRef.current, {
      rotation: 10,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      transformOrigin: 'top center',
    });
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {/* String */}
      <div
        style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, rgba(212, 163, 115, 0.6), rgba(212, 163, 115, 0.2))',
        }}
      />

      {/* Nazar */}
      <div
        ref={nazarRef}
        style={{
          transformOrigin: 'top center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* The nazar bead — built with CSS circles */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 35%, #1a6bb5 0%, #0d4a8a 40%, #062d5c 100%)',
            boxShadow: '0 0 0 4px rgba(255,255,255,0.9), 0 0 0 6px #1a6bb5, 0 0 0 10px rgba(255,255,255,0.8), 0 0 0 12px #1a6bb5, 0 4px 20px rgba(0,0,0,0.4), 0 0 30px rgba(26,107,181,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* White of eye */}
          <div
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%, #ffffff 0%, #e8e8e8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Pupil */}
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #2c1a0a 0%, #0a0a0a 100%)',
              }}
            />
          </div>

          {/* Glint */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '12px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.7)',
              filter: 'blur(1px)',
            }}
          />
        </div>

        {/* Shadow below */}
        <div
          style={{
            width: '36px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.15)',
            marginTop: '4px',
            filter: 'blur(4px)',
          }}
        />
      </div>
    </div>
  );
}
