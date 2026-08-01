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
      const target = new Date();
      target.setHours(12, 0, 0, 0);

      if (now.getTime() > target.getTime()) {
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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px, 6vh, 80px) clamp(16px, 4vw, 40px)',
        zIndex: 200,
        position: 'relative',
      }}
    >
      {/* Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '660px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {/* ── Initial Warm Letter From Prince's Heart ── */}
        <div
          className="letter-paper paper-texture"
          style={{
            padding: 'clamp(32px, 5vw, 60px) clamp(24px, 5vw, 48px)',
            borderRadius: '16px',
            background: '#FFFDF9',
            boxShadow: '0 25px 90px rgba(0,0,0,0.6)',
            color: '#1C120C',
          }}
        >
          <div style={{ textAlign: 'right', fontFamily: "'Dancing Script', cursive", color: '#5A4030', marginBottom: '24px' }}>
            Friendship Day 🌸
          </div>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 4vw, 28px)', color: '#A65B1A', fontStyle: 'italic', marginBottom: '18px' }}>
            Dear {visitorName}, {emoji}
          </h2>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(17px, 2.8vw, 21px)', lineHeight: 1.85, color: '#1C120C', marginBottom: '16px' }}>
            First of all, Happy Friendship Day! 💖
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(17px, 2.8vw, 21px)', lineHeight: 1.85, color: '#1C120C', marginBottom: '16px' }}>
            I wrote this letter directly from my heart to thank you for being such an awesome part of my life and Creato4. Working, building, and celebrating together has been truly special.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(17px, 2.8vw, 21px)', lineHeight: 1.85, color: '#964B00', fontWeight: 600 }}>
            But wait... your actual secret letter and personal memories unlock at 12:00 PM! 🤫👇
          </p>

          <div style={{ marginTop: '32px', textAlign: 'right', fontFamily: "'Dancing Script', cursive", fontSize: '28px', color: '#A65B1A', fontWeight: 700 }}>
            With love, Prince 💚
          </div>
        </div>

        {/* ── 12:00 PM Secret Timer & Prince Intelligence Card ── */}
        <div
          className="glass-card"
          style={{
            padding: 'clamp(32px, 5vw, 48px) clamp(20px, 4vw, 36px)',
            borderRadius: '20px',
            border: '1px solid rgba(248, 200, 220, 0.25)',
            textAlign: 'center',
            boxShadow: '0 20px 80px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(192, 57, 43, 0.15)',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>👁️‍🗨️</div>

          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 4.5vw, 30px)', color: '#F8C8DC', marginBottom: '6px' }}>
            I know this is {visitorName}&apos;s device... 🤫
          </h3>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', letterSpacing: '0.12em', color: 'rgba(212, 163, 115, 0.85)', textTransform: 'uppercase', marginBottom: '18px' }}>
            This is just Prince intelligence.
          </p>

          {/* Exact Gujarati Quote */}
          <div style={{ background: 'rgba(192, 57, 43, 0.14)', border: '1px solid rgba(192, 57, 43, 0.4)', borderRadius: '12px', padding: '14px 20px', marginBottom: '24px' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 3.8vw, 24px)', fontWeight: 600, fontStyle: 'italic', color: '#FFB3BA' }}>
              &quot;mane khbr ajj che kon shu kare che&quot; 😈
            </p>
          </div>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(15px, 3vw, 19px)', color: 'rgba(255, 248, 242, 0.85)', marginBottom: '24px' }}>
            🔒 All personal secrets revealing on 12:00 PM Friendship Day Special...
          </p>

          {/* Countdown Clock */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'HOURS', val: timeLeft.hours },
              { label: 'MINS', val: timeLeft.minutes },
              { label: 'SECS', val: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(26, 10, 20, 0.85)', border: '1px solid rgba(248, 200, 220, 0.25)', borderRadius: '12px', padding: '10px 16px', minWidth: '70px' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 600, color: '#D4A373', lineHeight: 1.1 }}>
                  {String(item.val).padStart(2, '0')}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.4)', marginTop: '3px' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {onBypass && (
            <button
              onClick={onBypass}
              style={{ background: 'transparent', border: 'none', color: 'rgba(248, 200, 220, 0.4)', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}
            >
              (Prince Admin: Unlock Now)
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
