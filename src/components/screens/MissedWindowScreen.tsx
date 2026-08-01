'use client';
import { motion } from 'framer-motion';

interface MissedWindowScreenProps {
  visitorName: string;
  emoji: string;
  onReadCommonLetter: () => void;
}

export default function MissedWindowScreen({
  visitorName,
  emoji,
  onReadCommonLetter,
}: MissedWindowScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 5vw, 40px)',
        zIndex: 200,
        textAlign: 'center',
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 163, 115, 0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="glass-card"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: 'clamp(36px, 6vw, 56px) clamp(24px, 5vw, 44px)',
          borderRadius: '24px',
          border: '1px solid rgba(248, 200, 220, 0.2)',
          boxShadow: '0 20px 80px rgba(0, 0, 0, 0.6)',
        }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '54px', marginBottom: '18px' }}
        >
          ⏰ {emoji}
        </motion.div>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(24px, 5vw, 34px)',
            fontWeight: 500,
            color: '#F8C8DC',
            marginBottom: '10px',
          }}
        >
          You missed all personal secrets! 🙈
        </h1>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(18px, 3.5vw, 22px)',
            fontWeight: 300,
            color: 'rgba(255, 248, 242, 0.8)',
            fontStyle: 'italic',
            marginBottom: '24px',
          }}
        >
          Better luck next time...
        </p>

        {/* Exact Gujarati Quote */}
        <div
          style={{
            background: 'rgba(248, 200, 220, 0.08)',
            border: '1px solid rgba(212, 163, 115, 0.3)',
            borderRadius: '14px',
            padding: '18px 24px',
            marginBottom: '32px',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(20px, 4vw, 26px)',
              fontWeight: 600,
              color: '#D4A373',
              letterSpacing: '0.02em',
            }}
          >
            &quot;vithdrawal aaj karvai leva nu!&quot; 💸😂
          </p>
        </div>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: 'rgba(255, 248, 242, 0.65)',
            marginBottom: '28px',
            lineHeight: 1.6,
          }}
        >
          The 1-hour secret window has closed for {visitorName}. But the Creato4 friendship letter is still waiting for you! 💌
        </p>

        <button
          onClick={onReadCommonLetter}
          className="btn-premium"
          style={{
            fontSize: 'clamp(14px, 2.5vw, 17px)',
            padding: '14px 32px',
            borderRadius: '40px',
            width: '100%',
          }}
        >
          ✨ Read Creato4 Friendship Letter 💚
        </button>
      </div>
    </motion.div>
  );
}
