'use client';
import { motion } from 'framer-motion';

interface MobileRedirectScreenProps {
  visitorName: string;
  emoji: string;
}

export default function MobileRedirectScreen({ visitorName, emoji }: MobileRedirectScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(24px, 6vw, 60px)',
        zIndex: 100,
        textAlign: 'center',
        paddingTop: 'env(safe-area-inset-top, 24px)',
        paddingBottom: 'env(safe-area-inset-bottom, 24px)',
      }}
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(248,200,220,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Greeting emoji */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ fontSize: '64px', marginBottom: '32px' }}
      >
        {emoji}
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
        className="glass-card"
        style={{
          maxWidth: '500px',
          width: '100%',
          padding: 'clamp(32px, 7vw, 60px) clamp(24px, 6vw, 48px)',
          borderRadius: '20px',
        }}
      >
        {/* Hi name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(26px, 6vw, 36px)',
            fontWeight: 400,
            color: 'rgba(248, 200, 220, 0.95)',
            marginBottom: '12px',
            letterSpacing: '0.02em',
          }}
        >
          Hi, {visitorName} 👋
        </motion.h1>

        {/* Divider */}
        <div style={{
          width: '40px', height: '1px',
          background: 'rgba(212, 163, 115, 0.4)',
          margin: '0 auto 24px',
        }} />

        {/* Main message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(17px, 3.5vw, 22px)',
            fontWeight: 300,
            lineHeight: 1.9,
            color: 'rgba(255, 248, 242, 0.75)',
            marginBottom: '28px',
            fontStyle: 'italic',
          }}
        >
          I wrote something special for you —
          <br />
          but it's meant to be read on a bigger screen. 💌
        </motion.p>

        {/* Instruction box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          style={{
            background: 'rgba(248, 200, 220, 0.06)',
            border: '1px solid rgba(248, 200, 220, 0.18)',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '28px',
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(13px, 2.8vw, 15px)',
            color: 'rgba(255, 248, 242, 0.6)',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
          }}>
            🖥️ &nbsp; Please open this on your&nbsp;
            <span style={{ color: 'rgba(212, 163, 115, 0.9)', fontWeight: 500 }}>
              laptop or PC
            </span>
            &nbsp;for the full experience.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(18px, 4vw, 24px)',
            color: 'rgba(248, 200, 220, 0.55)',
          }}
        >
          Happy Friendship Day 💖
        </motion.p>
      </motion.div>

      {/* Floating emojis bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 2.5 }}
        style={{
          marginTop: '40px',
          display: 'flex',
          gap: '20px',
          fontSize: '20px',
          pointerEvents: 'none',
        }}
      >
        {['🌸', '✨', '💖'].map((e, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              animation: `heartFloat ${4 + i}s ${i * 0.4}s ease-in-out infinite`,
            }}
          >
            {e}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
