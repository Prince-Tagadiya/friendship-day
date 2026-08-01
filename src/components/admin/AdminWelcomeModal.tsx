'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type { VisitorName } from '@/types';

interface AdminWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVisitor: (name: VisitorName) => void;
}

const VISITORS: { name: VisitorName; label: string; emoji: string; desc: string }[] = [
  { name: 'Khushi', label: 'Khushi', emoji: '🌸', desc: 'Samsung S24 FE & Windows Chrome' },
  { name: 'Nisarg', label: 'Nisarg', emoji: '⚙️', desc: 'Hardware & PCB Master' },
  { name: 'Rudra',  label: 'Rudra',  emoji: '💻', desc: 'Software & Code Genius' },
  { name: 'Prince', label: 'Creato4 Group', emoji: '💚', desc: 'Common Creato4 Letter' },
  { name: 'unknown', label: 'Unknown Visitor', emoji: '🔒', desc: 'Sealed Private Screen' },
];

export default function AdminWelcomeModal({
  isOpen,
  onClose,
  onSelectVisitor,
}: AdminWelcomeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: 'rgba(15, 5, 10, 0.88)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(20px, 4vw, 40px)',
        }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="glass-card"
          style={{
            maxWidth: '520px',
            width: '100%',
            padding: 'clamp(32px, 6vw, 48px) clamp(24px, 5vw, 40px)',
            borderRadius: '24px',
            border: '1px solid rgba(248, 200, 220, 0.25)',
            boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>👑</div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(24px, 5vw, 32px)',
              color: '#F8C8DC',
              fontWeight: 600,
              marginBottom: '6px',
            }}
          >
            Welcome Prince! 💚
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: 'rgba(212, 163, 115, 0.9)',
              letterSpacing: '0.05em',
              marginBottom: '28px',
            }}
          >
            Which person&apos;s letter & experience would you like to preview?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {VISITORS.map((v) => (
              <button
                key={v.name}
                onClick={() => {
                  onSelectVisitor(v.name);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  borderRadius: '14px',
                  border: '1px solid rgba(248, 200, 220, 0.18)',
                  background: 'rgba(248, 200, 220, 0.06)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = 'rgba(248, 200, 220, 0.15)';
                  el.style.borderColor = 'rgba(248, 200, 220, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = 'rgba(248, 200, 220, 0.06)';
                  el.style.borderColor = 'rgba(248, 200, 220, 0.18)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{v.emoji}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: '#FFFDF9', fontWeight: 600 }}>
                      {v.label}
                    </div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,248,242,0.45)' }}>
                      {v.desc}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: '13px', color: '#D4A373', fontWeight: 600 }}>
                  View →
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Skip to Admin View
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
