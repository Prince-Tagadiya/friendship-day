'use client';

export default function WaxSeal({ cracked = false }: { cracked?: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '52px',
        height: '52px',
        zIndex: 10,
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        opacity: cracked ? 0.3 : 1,
        filter: 'drop-shadow(0 4px 12px rgba(192, 57, 43, 0.5))',
      }}
      aria-hidden="true"
    >
      {/* Outer wax circle */}
      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="waxGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#E74C3C" />
            <stop offset="40%" stopColor="#C0392B" />
            <stop offset="100%" stopColor="#922B21" />
          </radialGradient>
          <radialGradient id="waxShine" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Main seal */}
        <circle cx="26" cy="26" r="24" fill="url(#waxGrad)" />
        <circle cx="26" cy="26" r="24" fill="url(#waxShine)" />

        {/* Drip texture */}
        <ellipse cx="18" cy="42" rx="4" ry="6" fill="#A93226" opacity="0.6" />
        <ellipse cx="35" cy="43" rx="3" ry="5" fill="#A93226" opacity="0.5" />

        {/* Letter P in the seal */}
        <text
          x="26"
          y="31"
          textAnchor="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize="18"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontWeight="600"
          fontStyle="italic"
        >
          P
        </text>

        {/* Crack lines (shown when cracked) */}
        {cracked && (
          <>
            <line x1="26" y1="10" x2="30" y2="30" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            <line x1="15" y1="20" x2="38" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          </>
        )}

        {/* Rim */}
        <circle cx="26" cy="26" r="24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      </svg>
    </div>
  );
}
