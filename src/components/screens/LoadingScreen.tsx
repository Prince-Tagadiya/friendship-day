'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const sparklePositions = [
  { x: '15%', y: '20%', delay: 0.3 },
  { x: '80%', y: '15%', delay: 0.6 },
  { x: '70%', y: '75%', delay: 0.9 },
  { x: '25%', y: '65%', delay: 1.1 },
  { x: '50%', y: '85%', delay: 0.7 },
  { x: '90%', y: '50%', delay: 1.3 },
  { x: '10%', y: '45%', delay: 0.5 },
  { x: '60%', y: '30%', delay: 0.8 },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        background: 'linear-gradient(160deg, #1a0a14 0%, #2a0f1a 50%, #1a0a14 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Sparkles */}
      {sparklePositions.map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0.5] }}
          transition={{
            duration: 2,
            delay: pos.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            fontSize: '12px',
            pointerEvents: 'none',
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Center content */}
      <div style={{ textAlign: 'center' }}>
        {/* Bloom circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 0.3, 0.15] }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(248,200,220,1) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(18px, 4vw, 26px)',
            color: 'rgba(248, 200, 220, 0.5)',
            letterSpacing: '0.15em',
            marginBottom: '16px',
          }}
        >
          Opening for you
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ fontSize: '32px', marginBottom: '24px' }}
        >
          💌
        </motion.div>

        {/* Loading dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{
                duration: 1.2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'rgba(248, 200, 220, 0.6)',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
