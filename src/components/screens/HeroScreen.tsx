'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '@/lib/audio';
import EnvelopeScene from '@/components/envelope/EnvelopeScene';
import TypewriterText from '@/components/letter/TypewriterText';

interface HeroScreenProps {
  visitorName: string;
  onOpen: () => void;
}

const TYPEWRITER_LINES = (name: string) => [
  `Hi, ${name} 👋`,
  `Happy Friendship Day 💖`,
  `I wrote something special just for you.`,
];

export default function HeroScreen({ visitorName, onOpen }: HeroScreenProps) {
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [opening, setOpening] = useState(false);
  const audioUnlocked = useRef(false);

  // Init audio manager on mount (reads mute pref, but does NOT play yet)
  useEffect(() => {
    audioManager.init();
  }, []);

  // Unlock + start piano on first ANY interaction with the page
  useEffect(() => {
    const unlockAudio = () => {
      if (!audioUnlocked.current) {
        audioUnlocked.current = true;
        audioManager.unlock();
      }
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  useEffect(() => {
    if (typewriterDone) {
      const t = setTimeout(() => setShowButton(true), 600);
      return () => clearTimeout(t);
    }
  }, [typewriterDone]);

  const handleOpen = useCallback(() => {
    if (opening) return;
    setOpening(true);
    // Ensure audio is unlocked on this gesture
    if (!audioUnlocked.current) {
      audioUnlocked.current = true;
      audioManager.unlock();
    }
    audioManager.play('sparkle');
    onOpen();
  }, [opening, onOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
      transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        overflow: 'hidden',
        padding: 'clamp(16px, 4vw, 40px)',
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 80px)',
        paddingBottom: 'env(safe-area-inset-bottom, 24px)',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 'clamp(300px, 60vw, 600px)',
          height: 'clamp(300px, 60vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(248,200,220,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          animation: 'envelopeBreathe 6s ease-in-out infinite',
        }}
      />

      {/* Typewriter greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(32px, 5vh, 56px)',
          zIndex: 1,
          minHeight: '140px',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(20px, 4.5vw, 32px)',
          fontWeight: 300,
          lineHeight: 1.8,
          color: 'rgba(255, 248, 242, 0.9)',
          letterSpacing: '0.02em',
        }}
      >
        <TypewriterText
          lines={TYPEWRITER_LINES(visitorName)}
          speed={45}
          lineDelay={900}
          onComplete={() => setTypewriterDone(true)}
        />
      </motion.div>

      {/* Envelope */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ zIndex: 1, marginBottom: 'clamp(32px, 5vh, 56px)' }}
      >
        <EnvelopeScene
          visitorName={visitorName}
          onOpen={handleOpen}
        />
      </motion.div>

      {/* CTA Button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ zIndex: 1 }}
          >
            <button
              className="btn-premium"
              onClick={handleOpen}
              aria-label="Open the letter"
              style={{
                fontSize: 'clamp(15px, 3vw, 18px)',
                padding: 'clamp(12px, 2vw, 16px) clamp(28px, 5vw, 48px)',
              }}
            >
              💌 Tap to Open
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      <AnimatePresence>
        {showButton && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{
              position: 'absolute',
              bottom: 'clamp(24px, 4vh, 48px)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: 'rgba(248,200,220,0.5)',
              textTransform: 'uppercase',
            }}
          >
            or tap the envelope
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
