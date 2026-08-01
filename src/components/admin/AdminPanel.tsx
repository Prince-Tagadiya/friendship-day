'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VisitorName } from '@/types';

interface AdminPanelProps {
  detectedIp?: string;
  currentVisitor: VisitorName;
  onSwitchVisitor: (name: VisitorName) => void;
  onSwitchDevice: (device: 'laptop' | 'mobile') => void;
  onJumpToLetter: (name: VisitorName) => void;
}

const LETTER_VISITORS: { name: VisitorName; label: string; emoji: string }[] = [
  { name: 'Khushi', label: 'Khushi', emoji: '🌸' },
  { name: 'Nisarg', label: 'Nisarg', emoji: '⚙️' },
  { name: 'Rudra',  label: 'Rudra',  emoji: '💻' },
  { name: 'Prince', label: 'Creato4', emoji: '💚' },
];

const ALL_VISITORS: VisitorName[] = ['Khushi', 'Nisarg', 'Rudra', 'Prince', 'unknown'];

export default function AdminPanel({
  detectedIp,
  currentVisitor,
  onSwitchVisitor,
  onSwitchDevice,
  onJumpToLetter,
}: AdminPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hidden trigger */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Admin panel"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9500,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255,248,242,0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(248,200,220,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'rgba(248,200,220,0.7)',
          fontSize: '16px',
        }}
      >
        ⚙️
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: '76px',
              right: '24px',
              zIndex: 9400,
              width: 'clamp(280px, 88vw, 400px)',
              background: 'rgba(20, 8, 16, 0.97)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(248,200,220,0.15)',
              borderRadius: '16px',
              padding: '22px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            {/* ── Header ── */}
            <div style={{ marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid rgba(248,200,220,0.1)' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: 'rgba(212,163,115,0.6)',
                textTransform: 'uppercase',
                marginBottom: '3px',
              }}>
                Admin Mode
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '20px',
                color: 'rgba(248,200,220,0.9)',
              }}>
                Prince 💚
              </h2>
            </div>

            {/* ── Detected IP ── */}
            <div style={{ marginBottom: '18px' }}>
              <p style={labelStyle}>Detected IP</p>
              <code style={{
                fontSize: '11px',
                color: 'rgba(212,163,115,0.75)',
                background: 'rgba(255,255,255,0.04)',
                padding: '6px 10px',
                borderRadius: '6px',
                display: 'block',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
              }}>
                {detectedIp || '—'}
              </code>
            </div>

            {/* ── Read Letters (jump directly) ── */}
            <div style={{ marginBottom: '18px' }}>
              <p style={labelStyle}>Read letters instantly</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {LETTER_VISITORS.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => {
                      setOpen(false);
                      onJumpToLetter(v.name);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(248,200,220,0.13)',
                      background: 'rgba(248,200,220,0.05)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      width: '100%',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = 'rgba(248,200,220,0.1)';
                      el.style.borderColor = 'rgba(248,200,220,0.28)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = 'rgba(248,200,220,0.05)';
                      el.style.borderColor = 'rgba(248,200,220,0.13)';
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '16px' }}>{v.emoji}</span>
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '15px',
                        color: 'rgba(255,248,242,0.75)',
                        fontWeight: 400,
                      }}>
                        {v.label}&apos;s letter
                      </span>
                    </span>
                    <span style={{
                      fontSize: '11px',
                      color: 'rgba(212,163,115,0.5)',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      Read →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Divider ── */}
            <div style={{ height: '1px', background: 'rgba(248,200,220,0.07)', marginBottom: '18px' }} />

            {/* ── Switch visitor (hero flow) ── */}
            <div style={{ marginBottom: '14px' }}>
              <p style={labelStyle}>Preview hero screen as</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {ALL_VISITORS.map((v) => (
                  <button
                    key={v}
                    onClick={() => onSwitchVisitor(v)}
                    style={{
                      padding: '5px 13px',
                      borderRadius: '20px',
                      border: `1px solid ${currentVisitor === v ? 'rgba(248,200,220,0.45)' : 'rgba(248,200,220,0.12)'}`,
                      background: currentVisitor === v ? 'rgba(248,200,220,0.1)' : 'transparent',
                      color: currentVisitor === v ? 'rgba(248,200,220,0.9)' : 'rgba(255,255,255,0.35)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Simulate device ── */}
            <div style={{ marginBottom: '18px' }}>
              <p style={labelStyle}>Simulate device</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['laptop', 'mobile'] as const).map((dt) => (
                  <button
                    key={dt}
                    onClick={() => onSwitchDevice(dt)}
                    style={{
                      padding: '6px 16px',
                      borderRadius: '20px',
                      border: '1px solid rgba(248,200,220,0.12)',
                      background: 'transparent',
                      color: 'rgba(255,255,255,0.35)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.borderColor = 'rgba(248,200,220,0.3)';
                      el.style.color = 'rgba(255,255,255,0.6)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.borderColor = 'rgba(248,200,220,0.12)';
                      el.style.color = 'rgba(255,255,255,0.35)';
                    }}
                  >
                    {dt === 'laptop' ? '🖥️ Laptop' : '📱 Mobile'}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Reset ── */}
            <button
              onClick={() => window.location.reload()}
              style={{
                width: '100%',
                padding: '9px',
                borderRadius: '8px',
                border: '1px solid rgba(248,200,220,0.1)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.25)',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.25)';
              }}
            >
              ↺ Reset & Reload
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '0.15em',
  color: 'rgba(255,255,255,0.25)',
  marginBottom: '8px',
  textTransform: 'uppercase',
  fontFamily: 'Inter, sans-serif',
};
