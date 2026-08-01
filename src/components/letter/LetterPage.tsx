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

export default function LetterPage({ letter: initialLetter, visitorName }: LetterPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Current active letter (can switch to Creato4 group letter)
  const [currentLetter, setCurrentLetter] = useState<LetterContent>(initialLetter);
  const [reachedBottom, setReachedBottom] = useState(false);

  useEffect(() => {
    setCurrentLetter(initialLetter);
    setReachedBottom(false);
  }, [initialLetter]);

  useEffect(() => {
    paragraphRefs.current = paragraphRefs.current.slice(0, currentLetter.lines.length + 10);

    const ctx = gsap.context(() => {
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
    }, containerRef);

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
  }, [currentLetter]);

  // Handler to switch to Creato4 Group Letter and scroll back to top
  const handleOpenGroupLetter = () => {
    setCurrentLetter(LETTERS.prince);
    setReachedBottom(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <motion.div
        key={currentLetter.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
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
          Friendship Day, 2026
        </div>

        {/* ── Salutation ── */}
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
            {currentLetter.opening}
          </p>
        </div>

        {/* ── Letter lines ── */}
        {currentLetter.lines.map((line, i) => {
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
          ref={setRef(currentLetter.lines.length + 2)}
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

        {/* ── Floating Emojis ── */}
        <div
          ref={setRef(currentLetter.lines.length + 3)}
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

        {/* ── P.S. Disclaimer (Only on personal letters) ── */}
        {currentLetter.id !== 'prince' && (
          <div
            ref={setRef(currentLetter.lines.length + 4)}
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
        )}
      </motion.div>

      {/* ── FLOATING BUTTON: READ CREATO4 GROUP LETTER (Appears on full scroll for personal letters) ── */}
      <AnimatePresence>
        {reachedBottom && currentLetter.id !== 'prince' && (
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
              onClick={handleOpenGroupLetter}
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
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                ✨
              </motion.span>
              <span>Read Creato4 Group Letter</span>
              <span>💚</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
