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
  onToggleTimeMode?: (mode: 'before-12' | 'unlocked' | 'missed') => void;
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
  onToggleTimeMode,
}: AdminPanelProps) {
  const [open, setOpen] = useState(false);
  const [activeTimeMode, setActiveTimeMode] = useState<'before-12' | 'unlocked' | 'missed'>('unlocked');
  const [activeDevice, setActiveDevice] = useState<'laptop' | 'mobile'>('laptop');

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Admin panel"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9500,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(26, 10, 20, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(248,200,220,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#F8C8DC',
          fontSize: '18px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
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
              bottom: '78px',
              right: '24px',
              zIndex: 9400,
              width: 'clamp(300px, 90vw, 420px)',
              background: 'rgba(18, 6, 14, 0.97)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(248,200,220,0.2)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 25px 80px rgba(0,0,0,0.7)',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid rgba(248,200,220,0.12)' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '0.2em', color: '#D4A373', textTransform: 'uppercase', marginBottom: '3px' }}>
                Prince Control Center 👑
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: '#F8C8DC', fontWeight: 600 }}>
                Visitor Flow Simulator
              </h2>
            </div>

            {/* Detected IP */}
            <div style={{ marginBottom: '18px' }}>
              <p style={labelStyle}>Your Detected IP</p>
              <code style={{ fontSize: '11px', color: '#D4A373', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', display: 'block', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                {detectedIp || '—'}
              </code>
            </div>

            {/* Read Letters Instantly */}
            <div style={{ marginBottom: '18px' }}>
              <p style={labelStyle}>Instant Letter Preview</p>
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
                      border: '1px solid rgba(248,200,220,0.15)',
                      background: 'rgba(248,200,220,0.06)',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '16px' }}>{v.emoji}</span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'rgba(255,248,242,0.85)' }}>
                        {v.label}&apos;s letter
                      </span>
                    </span>
                    <span style={{ fontSize: '11px', color: '#D4A373', fontFamily: 'Inter, sans-serif' }}>
                      Read →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Window Simulator */}
            {onToggleTimeMode && (
              <div style={{ marginBottom: '18px' }}>
                <p style={labelStyle}>Simulate Time States</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { mode: 'before-12' as const, label: '🔒 Before 12 (Timer + Initial Letter)', desc: 'Shows initial warm letter & countdown' },
                    { mode: 'unlocked' as const, label: '✨ 12-1 AM/PM (Unlocked Secrets)', desc: 'Opens actual secret personal letter' },
                    { mode: 'missed' as const, label: '⏰ After 1 (Missed Secrets Screen)', desc: 'Shows "vithdrawal aaj karvai leva nu!"' },
                  ].map((item) => (
                    <button
                      key={item.mode}
                      onClick={() => {
                        setActiveTimeMode(item.mode);
                        onToggleTimeMode(item.mode);
                      }}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: `1px solid ${activeTimeMode === item.mode ? 'rgba(248,200,220,0.5)' : 'rgba(248,200,220,0.14)'}`,
                        background: activeTimeMode === item.mode ? 'rgba(248,200,220,0.12)' : 'rgba(255,255,255,0.03)',
                        color: activeTimeMode === item.mode ? '#F8C8DC' : 'rgba(255,248,242,0.7)',
                        fontSize: '12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{item.label}</div>
                      <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '2px' }}>{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Switch Visitor */}
            <div style={{ marginBottom: '14px' }}>
              <p style={labelStyle}>Switch Visitor Profile</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {ALL_VISITORS.map((v) => (
                  <button
                    key={v}
                    onClick={() => onSwitchVisitor(v)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: `1px solid ${currentVisitor === v ? 'rgba(248,200,220,0.5)' : 'rgba(248,200,220,0.12)'}`,
                      background: currentVisitor === v ? 'rgba(248,200,220,0.15)' : 'transparent',
                      color: currentVisitor === v ? '#F8C8DC' : 'rgba(255,255,255,0.4)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Device Mode */}
            <div style={{ marginBottom: '18px' }}>
              <p style={labelStyle}>Simulate Device View</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['laptop', 'mobile'] as const).map((dt) => (
                  <button
                    key={dt}
                    onClick={() => {
                      setActiveDevice(dt);
                      onSwitchDevice(dt);
                    }}
                    style={{
                      padding: '7px 18px',
                      borderRadius: '20px',
                      border: `1px solid ${activeDevice === dt ? 'rgba(248,200,220,0.4)' : 'rgba(248,200,220,0.12)'}`,
                      background: activeDevice === dt ? 'rgba(248,200,220,0.12)' : 'transparent',
                      color: activeDevice === dt ? '#F8C8DC' : 'rgba(255,255,255,0.4)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {dt === 'laptop' ? '🖥️ Laptop' : '📱 Mobile'}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => window.location.reload()}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid rgba(248,200,220,0.12)',
                background: 'rgba(248,200,220,0.04)',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
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
  color: 'rgba(255,255,255,0.3)',
  marginBottom: '8px',
  textTransform: 'uppercase',
  fontFamily: 'Inter, sans-serif',
};
