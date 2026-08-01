'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SecretTimerScreenProps {
  visitorName: string;
  emoji: string;
  onBypass?: () => void;
}

export default function SecretTimerScreen({ visitorName, emoji, onBypass }: SecretTimerScreenProps) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calculateTime() {
      const now = new Date();
      // Target: Today or next 12:00 PM
      const target = new Date();
      target.setHours(12, 0, 0, 0);

      if (now.getTime() > target.getTime()) {
        // If past 12:00 PM today, set target to tomorrow 12:00 PM or unlocked
        target.setDate(target.getDate() + 1);
      }

      const diff = Math.max(0, target.getTime() - now.getTime());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
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
      {/* Red ambient warning glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192, 57, 43, 0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          animation: 'envelopeBreathe 4s ease-in-out infinite',
        }}
      />

      <div
        className="glass-card"
        style={{
          maxWidth: '540px',
          width: '100%',
          padding: 'clamp(32px, 6vw, 56px) clamp(24px, 5vw, 44px)',
          borderRadius: '24px',
          border: '1px solid rgba(248, 200, 220, 0.2)',
          boxShadow: '0 20px 80px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(192, 57, 43, 0.15)',
        }}
      >
        {/* Skull / Eye emoji */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '56px', marginBottom: '20px' }}
        >
          👁️‍🗨️ {emoji}
        </motion.div>

        {/* Intelligence message */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(24px, 5vw, 34px)',
            fontWeight: 500,
            color: '#F8C8DC',
            marginBottom: '8px',
          }}
        >
          I know this is {visitorName}&apos;s device... 🤫
        </h1>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.1em',
            color: 'rgba(212, 163, 115, 0.85)',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          This is just Prince intelligence.
        </p>

        {/* Exact Gujarati Quote */}
        <div
          style={{
            background: 'rgba(192, 57, 43, 0.12)',
            border: '1px solid rgba(192, 57, 43, 0.35)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '28px',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: 600,
              fontStyle: 'italic',
              color: '#FFB3BA',
              letterSpacing: '0.02em',
            }}
          >
            &quot;mane khbr ajj che kon shu kare che&quot; 😈
          </p>
        </div>

        {/* Mysterious Warning */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            fontWeight: 300,
            color: 'rgba(255, 248, 242, 0.85)',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          🔒 All personal secrets revealing on 12:00 PM Friendship Day Special...
        </p>

        {/* Live Countdown Clock */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            marginBottom: '24px',
          }}
        >
          {[
            { label: 'HOURS', val: timeLeft.hours },
            { label: 'MINS', val: timeLeft.minutes },
            { label: 'SECS', val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(26, 10, 20, 0.8)',
                border: '1px solid rgba(248, 200, 220, 0.2)',
                borderRadius: '12px',
                padding: '12px 18px',
                minWidth: '76px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#D4A373',
                  lineHeight: 1.1,
                }}
              >
                {String(item.val).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginTop: '4px',
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Optional Bypass / Unlocked notification */}
        {onBypass && (
          <button
            onClick={onBypass}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(248, 200, 220, 0.4)',
              fontSize: '11px',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              textDecoration: 'underline',
              marginTop: '8px',
            }}
          >
            (Prince Admin: Unlock Now)
          </button>
        )}
      </div>
    </motion.div>
  );
}
