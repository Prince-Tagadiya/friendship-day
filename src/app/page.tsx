'use client';
import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { useVisitor } from '@/hooks/useVisitor';
import { useFPSMonitor } from '@/hooks/useFPSMonitor';
import { audioManager } from '@/lib/audio';
import { LETTERS } from '@/lib/letters';
import { VISITORS } from '@/lib/visitors';
import type { AppStage, VisitorName } from '@/types';

// Dynamic imports (code split)
const LenisProvider = dynamic(() => import('@/components/core/LenisProvider'), { ssr: false });
const CursorGlow = dynamic(() => import('@/components/core/CursorGlow'), { ssr: false });
const AudioManager = dynamic(() => import('@/components/core/AudioManager'), { ssr: false });
const NotMeButton = dynamic(() => import('@/components/core/NotMeButton'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/scene/ParticleField'), { ssr: false });
const FloatingPetals = dynamic(() => import('@/components/scene/FloatingPetals'), { ssr: false });
const NazarCharm = dynamic(() => import('@/components/scene/NazarCharm'), { ssr: false });
const LoadingScreen = dynamic(() => import('@/components/screens/LoadingScreen'), { ssr: false });
const HeroScreen = dynamic(() => import('@/components/screens/HeroScreen'), { ssr: false });
const UnknownVisitor = dynamic(() => import('@/components/screens/UnknownVisitor'), { ssr: false });
const MobileRedirectScreen = dynamic(() => import('@/components/screens/MobileRedirectScreen'), { ssr: false });
const SecretTimerScreen = dynamic(() => import('@/components/screens/SecretTimerScreen'), { ssr: false });
const LetterPage = dynamic(() => import('@/components/letter/LetterPage'), { ssr: false });
const AdminPanel = dynamic(() => import('@/components/admin/AdminPanel'), { ssr: false });

export default function Home() {
  const { visitor, deviceType, isLoading, detectedIp } = useVisitor();
  const { isVeryLowEnd, isLowEnd } = useFPSMonitor();
  const [stage, setStage] = useState<AppStage>('loading');

  // Manual identity & device override
  const [manualVisitor, setManualVisitor] = useState<VisitorName | null>(null);
  const [manualDevice, setManualDevice] = useState<'laptop' | 'mobile' | null>(null);
  const [forceTimer, setForceTimer] = useState<boolean>(false);

  const effectiveVisitor: VisitorName = manualVisitor ?? visitor ?? 'unknown';
  const effectiveDevice = manualDevice ?? deviceType ?? 'unknown-device';
  const visitorData = VISITORS[effectiveVisitor];
  const letter = LETTERS[visitorData.letterId];

  // ── Helper: Check if before 12:00 PM Friendship Day timer ──
  const isBefore12PM = useCallback(() => {
    if (forceTimer) return true; // Forced via admin
    const now = new Date();
    // 12:00 PM target
    const target = new Date();
    target.setHours(12, 0, 0, 0);
    // If visitor is not Prince and current time is before 12:00 PM today
    return now.getHours() < 12;
  }, [forceTimer]);

  // ── Stage resolution helper ──────────────────────────
  const resolveStage = useCallback(
    (v: VisitorName, dt: string): AppStage => {
      if (v === 'unknown') return 'unknown';
      if (dt === 'mobile') return 'mobile-redirect';

      // If before 12:00 PM and not Prince, show secret timer
      if (v !== 'Prince' && isBefore12PM()) {
        return 'secret-timer';
      }

      return 'hero';
    },
    [isBefore12PM]
  );

  // ── Detect → set stage after loading ────────────────
  useEffect(() => {
    if (stage !== 'loading' || isLoading) return;
    const v = manualVisitor ?? visitor ?? 'unknown';
    const dt = manualDevice ?? deviceType ?? 'unknown-device';
    setStage(resolveStage(v, dt));
  }, [stage, isLoading, visitor, deviceType, manualVisitor, manualDevice, resolveStage]);

  const handleLoadingComplete = useCallback(() => {
    if (isLoading) return;
    const v = manualVisitor ?? visitor ?? 'unknown';
    const dt = manualDevice ?? deviceType ?? 'unknown-device';
    setStage(resolveStage(v, dt));
  }, [isLoading, visitor, deviceType, manualVisitor, manualDevice, resolveStage]);

  // ── Opening envelope triggers upbeat music ────────────
  const handleOpenEnvelope = useCallback(() => {
    setStage('opening');
    // Start beating upbeat music!
    audioManager.play('upbeat');
    setTimeout(() => setStage('letter'), 2000);
  }, []);

  // ── "I'm not X" manual selection ──
  const handleSelectVisitor = useCallback(
    (name: VisitorName) => {
      setManualVisitor(name);
      setManualDevice('laptop');
      if (name === 'unknown') {
        setStage('unknown');
      } else if (name !== 'Prince' && isBefore12PM()) {
        setStage('secret-timer');
      } else {
        setStage('hero');
      }
    },
    [isBefore12PM]
  );

  // ── Admin controls ───────────────────────────────────
  const handleAdminSwitch = useCallback(
    (name: VisitorName) => {
      setManualVisitor(name);
      setManualDevice('laptop');
      if (name === 'unknown') setStage('unknown');
      else if (name !== 'Prince' && isBefore12PM()) setStage('secret-timer');
      else setStage('hero');
    },
    [isBefore12PM]
  );

  const handleAdminDeviceSwitch = useCallback(
    (dt: 'laptop' | 'mobile') => {
      setManualDevice(dt);
      const v = manualVisitor ?? visitor ?? 'unknown';
      setStage(resolveStage(v, dt));
    },
    [manualVisitor, visitor, resolveStage]
  );

  const handleJumpToLetter = useCallback((name: VisitorName) => {
    setManualVisitor(name);
    setManualDevice('laptop');
    audioManager.play('upbeat'); // Upbeat music on direct letter jump
    setStage('letter');
  }, []);

  const particleCount = isVeryLowEnd ? 0 : isLowEnd ? 150 : 400;
  const isAdminUser = visitorData.isAdmin;

  const showNotMe =
    (stage === 'hero' || stage === 'letter' || stage === 'mobile-redirect' || stage === 'secret-timer') &&
    effectiveVisitor !== 'unknown';

  return (
    <LenisProvider>
      <main
        className="bg-friendship"
        style={{
          minHeight: '100dvh',
          position: 'relative',
          overflowX: 'hidden',
        }}
      >
        {/* Global UI */}
        <CursorGlow />
        <AudioManager />

        {/* "Not me?" button */}
        {showNotMe && (
          <NotMeButton
            detectedName={visitorData.greeting}
            onSelectVisitor={handleSelectVisitor}
          />
        )}

        {/* Admin panel — Prince only */}
        {isAdminUser && (
          <AdminPanel
            detectedIp={detectedIp}
            currentVisitor={effectiveVisitor}
            onSwitchVisitor={handleAdminSwitch}
            onSwitchDevice={handleAdminDeviceSwitch}
            onJumpToLetter={handleJumpToLetter}
          />
        )}

        {/* 3D Particle canvas */}
        <ParticleField count={particleCount} disabled={isVeryLowEnd} />

        {/* CSS floating particles */}
        <FloatingPetals count={isLowEnd ? 6 : 12} />

        {/* Nazar — only on loading/hero */}
        {(stage === 'hero' || stage === 'loading') && <NazarCharm />}

        {/* ── LOADING ── */}
        <AnimatePresence mode="wait">
          {stage === 'loading' && (
            <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
          )}
        </AnimatePresence>

        {/* ── UNKNOWN VISITOR ── */}
        <AnimatePresence mode="wait">
          {stage === 'unknown' && (
            <motion.div key="unknown">
              <UnknownVisitor />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SECRET TIMER SCREEN (Before 12:00 PM) ── */}
        <AnimatePresence mode="wait">
          {stage === 'secret-timer' && (
            <motion.div key="secret-timer">
              <SecretTimerScreen
                visitorName={visitorData.greeting}
                emoji={visitorData.emoji}
                onBypass={() => setStage('hero')}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MOBILE REDIRECT ── */}
        <AnimatePresence mode="wait">
          {stage === 'mobile-redirect' && (
            <motion.div key="mobile-redirect">
              <MobileRedirectScreen
                visitorName={visitorData.greeting}
                emoji={visitorData.emoji}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── HERO ── */}
        <AnimatePresence mode="wait">
          {stage === 'hero' && (
            <motion.div
              key="hero"
              style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HeroScreen
                visitorName={visitorData.greeting}
                onOpen={handleOpenEnvelope}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── OPENING CINEMATIC ── */}
        <AnimatePresence mode="wait">
          {stage === 'opening' && (
            <motion.div
              key="opening"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 200,
              }}
            >
              <motion.div
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.15, filter: 'blur(2px)', opacity: 0 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 'clamp(18px, 4vw, 28px)',
                  color: 'rgba(248, 200, 220, 0.6)',
                  textAlign: 'center',
                  letterSpacing: '0.1em',
                }}
              >
                Opening your letter...
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── LETTER ── */}
        <AnimatePresence mode="wait">
          {stage === 'letter' && letter && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}
            >
              <LetterPage letter={letter} visitorName={visitorData.greeting} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── LETTER FALLBACK ── */}
        <AnimatePresence mode="wait">
          {stage === 'letter' && !letter && (
            <motion.div
              key="letter-fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 200,
                color: 'rgba(248,200,220,0.5)',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '22px',
                fontStyle: 'italic',
              }}
            >
              Something special awaits... 💌
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </LenisProvider>
  );
}
