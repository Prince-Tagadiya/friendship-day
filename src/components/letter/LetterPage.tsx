'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import type { LetterContent, ParagraphVariant } from '@/types';
import { LETTERS } from '@/lib/letters';

gsap.registerPlugin(ScrollTrigger);

// ── Bold markdown renderer ──────────────────────────────
function renderText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ fontWeight: 600, color: '#A65B1A' }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ── Variant → CSS style map ─────────────────────────────
function getVariantStyle(variant: ParagraphVariant = 'normal'): React.CSSProperties {
  const base: React.CSSProperties = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    lineHeight: 1.9,
    transition: 'color 0.4s ease',
    letterSpacing: '0.01em',
  };

  switch (variant) {
    case 'normal':
      return {
        ...base,
        fontSize: 'clamp(18px, 2.8vw, 22px)',
        fontWeight: 400,
        color: '#1C120C',
      };

    case 'highlight':
      return {
        ...base,
        fontSize: 'clamp(18px, 2.8vw, 22px)',
        fontWeight: 600,
        color: '#A65B1A',
        fontStyle: 'italic',
      };

    case 'center-bold':
      return {
        ...base,
        fontSize: 'clamp(19px, 3vw, 25px)',
        fontWeight: 700,
        color: '#964B00',
        textAlign: 'center',
        lineHeight: 1.7,
        padding: '6px 0',
      };

    case 'quote':
      return {
        ...base,
        fontSize: 'clamp(17px, 2.5vw, 21px)',
        fontWeight: 500,
        color: '#3A2518',
        fontStyle: 'italic',
        borderLeft: '3px solid #B86B28',
        paddingLeft: '20px',
        lineHeight: 1.8,
        background: 'rgba(212, 163, 115, 0.08)',
        borderRadius: '0 8px 8px 0',
        paddingTop: '8px',
        paddingBottom: '8px',
      };

    case 'small':
      return {
        ...base,
        fontSize: 'clamp(14px, 2vw, 16px)',
        fontWeight: 400,
        color: '#4A3525',
        fontStyle: 'italic',
        lineHeight: 1.85,
      };

    case 'separator':
      return {
        display: 'none',
      };

    default:
      return base;
  }
}

// ── Main component ──────────────────────────────────────
interface LetterPageProps {
  letter: LetterContent;
  visitorName: string;
}

export default function LetterPage({ letter, visitorName }: LetterPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State for scroll completion & Creato4 Group Letter Modal
  const [reachedBottom, setReachedBottom] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const groupLetter = LETTERS.prince; // Common Creato4 Group Letter

  useEffect(() => {
    paragraphRefs.current = paragraphRefs.current.slice(0, letter.lines.length + 10);

    const ctx = gsap.context(() => {
      // Animate text lines on scroll
      paragraphRefs.current.forEach((el, i) => {
        if (!el) return;

        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 28,
            filter: 'blur(3px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 55%',
              toggleActions: 'play none none reverse',
            },
            delay: Math.min(i * 0.04, 0.3),
          }
        );
      });

      // Detect bottom scroll reach (at 90% scroll of container)
      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'bottom bottom+=100',
          onEnter: () => setReachedBottom(true),
        });
      }
    }, containerRef);

    // Fallback scroll listener
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 250) {
        setReachedBottom(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [letter]);

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    paragraphRefs.current[i] = el;
  };

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'clamp(40px, 8vh, 80px) clamp(16px, 5vw, 40px)',
        paddingBottom: '160px',
      }}
    >
      <div
        className="letter-paper letter-lines paper-texture"
        style={{
          width: '100%',
          maxWidth: '700px',
          padding: 'clamp(40px, 6vw, 80px) clamp(28px, 6vw, 72px) clamp(60px, 8vw, 100px)',
          position: 'relative',
          background: '#FFFDF9',
          borderRadius: '12px',
          boxShadow: '0 30px 100px rgba(0,0,0,0.6), 0 4px 30px rgba(0,0,0,0.3)',
          color: '#1C120C',
        }}
      >
        {/* ── Date ── */}
        <div
          ref={setRef(0)}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            color: '#5A4030',
            marginBottom: '36px',
            textAlign: 'right',
            fontWeight: 600,
          }}
        >
          Friendship Day, 2025
        </div>

        {/* ── Opening salutation ── */}
        <div ref={setRef(1)} style={{ marginBottom: '32px' }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(22px, 3.5vw, 30px)',
              fontWeight: 500,
              fontStyle: 'italic',
              color: '#1C120C',
              lineHeight: 1.5,
            }}
          >
            {letter.opening}
          </p>
        </div>

        {/* ── Letter body ── */}
        {letter.lines.map((line, i) => {
          if (line.variant === 'separator') {
            return (
              <div
                key={i}
                ref={setRef(i + 2)}
                style={{
                  height: '1px',
                  background: 'rgba(212,163,115,0.3)',
                  margin: '32px 0',
                }}
              />
            );
          }

          return (
            <div
              key={i}
              ref={setRef(i + 2)}
              style={{
                marginBottom: line.variant === 'center-bold' ? '20px' : '18px',
                marginTop: line.topSpacing ? '28px' : undefined,
              }}
            >
              <p style={getVariantStyle(line.variant)}>
                {renderText(line.text)}
              </p>
            </div>
          );
        })}

        {/* ── Signature ── */}
        <div
          ref={setRef(letter.lines.length + 2)}
          style={{
            marginTop: '64px',
            paddingTop: '36px',
            borderTop: '1px solid rgba(212,163,115,0.3)',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(15px, 2.2vw, 18px)',
              color: '#5A4030',
              fontStyle: 'italic',
              marginBottom: '4px',
            }}
          >
            With lots of gratitude,
          </p>
          <p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(32px, 6vw, 48px)',
              color: '#A65B1A',
              lineHeight: 1.2,
              fontWeight: 700,
            }}
          >
            Prince 💚
          </p>
        </div>

        {/* ── Floating ending emojis ── */}
        <div
          ref={setRef(letter.lines.length + 3)}
          style={{
            marginTop: '52px',
            display: 'flex',
            justifyContent: 'center',
            gap: '18px',
            fontSize: '24px',
          }}
        >
          {['✨', '🌸', '💖', '🤍', '🧿'].map((emoji, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                animation: `heartFloat ${3 + i * 0.5}s ${i * 0.3}s ease-in-out infinite`,
                opacity: 0.85,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* ── P.S. Disclaimer ── */}
        <div
          ref={setRef(letter.lines.length + 4)}
          style={{
            marginTop: '64px',
            padding: '24px 28px',
            background: '#FAF3EC',
            borderRadius: '12px',
            border: '1px dashed rgba(184, 107, 40, 0.35)',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(14px, 2.2vw, 17px)',
              fontWeight: 400,
              lineHeight: 1.9,
              color: '#2C1D14',
              fontStyle: 'italic',
            }}
          >
            <span style={{ color: '#A65B1A', fontWeight: 600, fontStyle: 'normal' }}>P.S.</span>
            {' '}Okay, small confession — this was also a tiny experiment. 🙈
            <br />
            I was quietly collecting IP addresses to figure out which device belongs to which person.
            <br />
            That's honestly why this website exists. You opened it, and now I know it was you. 😄
            <br /><br />
            Don't worry — no data was stored anywhere. It was just a fun, nerdy way to say Happy Friendship Day in the most &quot;Prince&quot; way possible. 💻
          </p>
        </div>
      </div>

      {/* ── POPUP BUTTON FOR CREATO4 GROUP LETTER (Appears on full scroll) ── */}
      <AnimatePresence>
        {(reachedBottom || letter.id === 'prince') && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.85 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: 'fixed',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 900,
            }}
          >
            <button
              onClick={() => setShowGroupModal(true)}
              className="btn-premium"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: 'clamp(14px, 2.5vw, 17px)',
                padding: '14px 32px',
                borderRadius: '40px',
                boxShadow: '0 12px 50px rgba(212, 163, 115, 0.4), 0 4px 20px rgba(0,0,0,0.5)',
                background: 'linear-gradient(135deg, rgba(248, 200, 220, 0.95), rgba(212, 163, 115, 0.95))',
                color: '#1C120C',
                fontWeight: 600,
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
              <span>Read Creato4 Group Letter</span>
              <span>💚</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL: CREATO4 GROUP LETTER ── */}
      <AnimatePresence>
        {showGroupModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(15, 5, 10, 0.88)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(20px, 4vw, 40px)',
              overflowY: 'auto',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: '#FFFDF9',
                borderRadius: '16px',
                padding: 'clamp(32px, 5vw, 60px) clamp(24px, 5vw, 48px)',
                position: 'relative',
                boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
                color: '#1C120C',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowGroupModal(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(184, 107, 40, 0.3)',
                  background: 'rgba(248, 200, 220, 0.15)',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1C120C',
                }}
              >
                ✕
              </button>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(24px, 4vw, 32px)',
                  fontWeight: 600,
                  color: '#A65B1A',
                  marginBottom: '24px',
                  textAlign: 'center',
                }}
              >
                {groupLetter.opening}
              </h2>

              {groupLetter.lines.map((line, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <p style={getVariantStyle(line.variant)}>
                    {renderText(line.text)}
                  </p>
                </div>
              ))}

              <div style={{ marginTop: '36px', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '36px', color: '#A65B1A', fontWeight: 700 }}>
                  Prince 💚
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
