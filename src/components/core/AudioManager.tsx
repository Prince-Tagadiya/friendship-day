'use client';
import { useState, useEffect } from 'react';
import { audioManager } from '@/lib/audio';

export default function AudioManagerUI() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    audioManager.init();
    setMuted(audioManager.isMuted());
  }, []);

  const toggle = () => {
    const newMuted = audioManager.toggleMute();
    setMuted(newMuted);
  };

  return (
    <button
      onClick={toggle}
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9000,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'rgba(255, 248, 242, 0.07)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(248, 200, 220, 0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'opacity 0.3s ease, transform 0.2s ease',
        color: 'rgba(248, 200, 220, 0.65)',
        opacity: 0.7,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7'; }}
    >
      {muted ? (
        // Muted icon
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        // Playing icon
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
