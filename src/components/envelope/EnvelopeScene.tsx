'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import WaxSeal from './WaxSeal';
import { audioManager } from '@/lib/audio';

interface EnvelopeSceneProps {
  visitorName: string;
  onOpen: () => void;
}

export default function EnvelopeScene({ visitorName, onOpen }: EnvelopeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [sealCracked, setSealCracked] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const [paperSliding, setPaperSliding] = useState(false);

  const handleOpen = async () => {
    if (isOpening) return;
    setIsOpening(true);

    await audioManager.play('sparkle');

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          audioManager.play('paper');
          onOpen();
        }, 400);
      },
    });

    // 1. Subtle zoom in
    tl.to(containerRef.current, {
      scale: 1.06,
      duration: 0.8,
      ease: 'power2.inOut',
    });

    // 2. Slight rotation wiggle
    tl.to(envelopeRef.current, {
      rotation: 2,
      duration: 0.4,
      ease: 'sine.inOut',
    }, '-=0.3');

    // 3. Crack seal
    tl.call(() => setSealCracked(true));
    tl.to({}, { duration: 0.5 });

    // 4. Open flap
    tl.call(() => setFlapOpen(true));
    tl.to({}, { duration: 0.8 });

    // 5. Paper slides up
    tl.call(() => setPaperSliding(true));
    tl.to(paperRef.current, {
      y: -80,
      duration: 1.2,
      ease: 'power2.out',
    });

    // 6. Fade out envelope
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.inOut',
    }, '+=0.3');
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Envelope */}
      <div
        ref={envelopeRef}
        style={{
          position: 'relative',
          width: 'clamp(280px, 80vw, 420px)',
          height: 'clamp(180px, 50vw, 270px)',
          cursor: isOpening ? 'default' : 'pointer',
          filter: 'drop-shadow(0 20px 60px rgba(212, 163, 115, 0.3))',
        }}
        className={!isOpening ? 'animate-breathe' : ''}
        onClick={handleOpen}
        role="button"
        aria-label="Open the letter"
      >
        {/* Envelope body */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, #FEF5E7 0%, #FDEBD0 40%, #FAD7A0 100%)',
            borderRadius: '4px',
            boxShadow: '0 8px 40px rgba(61,43,31,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
            overflow: 'hidden',
          }}
        >
          {/* Interior (seen when open) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, #FFF8F2 0%, #FDEBD0 100%)',
              opacity: flapOpen ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Bottom triangle fold line */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(212,163,115,0.2) 0%, transparent 100%)',
              borderTop: '1px solid rgba(212,163,115,0.3)',
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            }}
          />

          {/* Left fold */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '50%',
              borderRight: '1px solid rgba(212,163,115,0.2)',
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
              background: 'rgba(212,163,115,0.08)',
            }}
          />

          {/* Right fold */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '50%',
              borderLeft: '1px solid rgba(212,163,115,0.2)',
              clipPath: 'polygon(0 50%, 100% 0, 100% 100%)',
              background: 'rgba(212,163,115,0.08)',
            }}
          />
        </div>

        {/* Flap (top triangle) */}
        <div
          ref={flapRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '52%',
            transformOrigin: 'top center',
            transform: flapOpen ? 'rotateX(-175deg)' : 'rotateX(0deg)',
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 3,
            backfaceVisibility: 'hidden',
            perspective: '600px',
          }}
        >
          <svg
            viewBox="0 0 420 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%' }}
          >
            <defs>
              <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FAD7A0" />
                <stop offset="100%" stopColor="#FDEBD0" />
              </linearGradient>
            </defs>
            <polygon
              points="0,0 420,0 210,140"
              fill="url(#flapGrad)"
              stroke="rgba(212,163,115,0.3)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Paper peeking out */}
        <div
          ref={paperRef}
          style={{
            position: 'absolute',
            top: '-10px',
            left: '10%',
            right: '10%',
            height: '90%',
            background: 'linear-gradient(180deg, #FFFDF9 0%, #FFF8F0 100%)',
            borderRadius: '2px',
            zIndex: 1,
            boxShadow: '0 -4px 20px rgba(61,43,31,0.1)',
            opacity: paperSliding ? 1 : 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(12px, 3vw, 18px)',
            color: 'rgba(61,43,31,0.4)',
            textAlign: 'center',
            padding: '20px',
          }}>
            For {visitorName}...
          </div>
        </div>

        {/* Wax seal */}
        <WaxSeal cracked={sealCracked} />
      </div>
    </div>
  );
}
