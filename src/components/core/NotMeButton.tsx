'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VisitorName } from '@/types';

interface NotMeButtonProps {
  detectedName: string;
  onSelectVisitor: (name: VisitorName) => void;
}

const VISITOR_OPTIONS: { name: VisitorName; label: string; emoji: string }[] = [
  { name: 'Khushi', label: 'Khushi', emoji: '🌸' },
  { name: 'Nisarg', label: 'Nisarg', emoji: '⚙️' },
  { name: 'Rudra', label: 'Rudra', emoji: '💻' },
  { name: 'Prince', label: 'Prince', emoji: '💚' },
];

export default function NotMeButton({ detectedName, onSelectVisitor }: NotMeButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        top: 'calc(env(safe-area-inset-top, 0px) + 20px)',
        right: '20px',
        zIndex: 8000,
      }}
    >
      {/* Trigger pill */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 4, ease: 'easeOut' }}
        onClick={() => setOpen((o) => !o)}
        aria-label={`Not ${detectedName}? Change identity`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          padding: '7px 14px',
          borderRadius: '40px',
          background: 'rgba(26, 10, 20, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(248, 200, 220, 0.18)',
          cursor: 'pointer',
          color: 'rgba(255, 248, 242, 0.55)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(248, 200, 220, 0.35)';
          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255, 248, 242, 0.85)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(248, 200, 220, 0.18)';
          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255, 248, 242, 0.55)';
        }}
      >
        <span style={{ fontSize: '13px', opacity: 0.6 }}>Not</span>
        <span style={{ color: 'rgba(248, 200, 220, 0.75)', fontWeight: 500 }}>
          {detectedName}?
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: '10px', opacity: 0.5 }}
        >
          ▾
        </motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              background: 'rgba(20, 8, 16, 0.95)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(248, 200, 220, 0.14)',
              borderRadius: '14px',
              padding: '10px',
              minWidth: '180px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            }}
          >
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              padding: '4px 8px 10px',
            }}>
              Who are you?
            </p>

            {VISITOR_OPTIONS.map((v) => (
              <button
                key={v.name}
                onClick={() => {
                  setOpen(false);
                  onSelectVisitor(v.name);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '9px',
                  border: 'none',
                  background: v.label === detectedName
                    ? 'rgba(248, 200, 220, 0.1)'
                    : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  textAlign: 'left',
                  color: v.label === detectedName
                    ? 'rgba(248, 200, 220, 0.9)'
                    : 'rgba(255, 248, 242, 0.55)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(248, 200, 220, 0.08)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(248, 200, 220, 0.85)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    v.label === detectedName ? 'rgba(248, 200, 220, 0.1)' : 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = v.label === detectedName
                    ? 'rgba(248, 200, 220, 0.9)'
                    : 'rgba(255, 248, 242, 0.55)';
                }}
              >
                <span style={{ fontSize: '16px' }}>{v.emoji}</span>
                <span style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '15px',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}>
                  {v.label}
                </span>
                {v.label === detectedName && (
                  <span style={{ marginLeft: 'auto', fontSize: '10px', opacity: 0.5 }}>✓</span>
                )}
              </button>
            ))}

            {/* Divider + "I'm someone else" */}
            <div style={{
              height: '1px',
              background: 'rgba(248, 200, 220, 0.08)',
              margin: '8px 0',
            }} />
            <button
              onClick={() => {
                setOpen(false);
                onSelectVisitor('unknown');
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: '9px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.25)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.01em',
                transition: 'color 0.2s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.25)';
              }}
            >
              <span style={{ fontSize: '14px' }}>🔒</span>
              I'm someone else
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
