'use client';
import { motion } from 'framer-motion';

export default function UnknownVisitor() {
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
        padding: 'clamp(24px, 5vw, 60px)',
        zIndex: 100,
        textAlign: 'center',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Background bloom */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(248,200,220,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Sealed envelope */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ marginBottom: '40px', fontSize: '64px', filter: 'grayscale(0.3)' }}
      >
        🔒
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        className="glass-card"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: 'clamp(32px, 6vw, 60px) clamp(24px, 5vw, 48px)',
          borderRadius: '16px',
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(22px, 5vw, 32px)',
            fontWeight: 400,
            color: 'rgba(248, 200, 220, 0.9)',
            marginBottom: '20px',
            letterSpacing: '0.02em',
          }}
        >
          Private Letter
        </h1>

        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'rgba(212, 163, 115, 0.4)',
            margin: '0 auto 28px',
          }}
        />

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(16px, 3vw, 20px)',
            fontWeight: 300,
            lineHeight: 1.9,
            color: 'rgba(255, 248, 242, 0.7)',
            marginBottom: '32px',
            fontStyle: 'italic',
          }}
        >
          This Friendship Day letter wasn't written for you.
        </p>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(14px, 2.5vw, 17px)',
            fontWeight: 300,
            lineHeight: 2,
            color: 'rgba(255, 248, 242, 0.5)',
            marginBottom: '36px',
          }}
        >
          Every friendship has its own memories,
          <br />
          and this one belongs to someone special.
        </p>

        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'rgba(212, 163, 115, 0.3)',
            margin: '0 auto 28px',
          }}
        />

        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(20px, 4vw, 28px)',
            color: 'rgba(248, 200, 220, 0.6)',
          }}
        >
          Happy Friendship Day 💖
        </p>
      </motion.div>

      {/* Subtle floating emoji */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 2 }}
        style={{
          marginTop: '40px',
          display: 'flex',
          gap: '20px',
          fontSize: '18px',
          pointerEvents: 'none',
        }}
      >
        {['🌸', '✨', '💖'].map((e, i) => (
          <span
            key={i}
            style={{
              animation: `heartFloat ${4 + i}s ${i * 0.5}s ease-in-out infinite`,
              display: 'inline-block',
            }}
          >
            {e}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
