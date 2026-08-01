/**
 * Audio Manager — Dual Mode (Calm BGM → Upbeat Beating BGM on letter open)
 *
 * Mode 1: /audio/calm.mp3 — Played initially (Hero screen)
 * Mode 2: /audio/upbeat.mp3 — Switched to when opening letter (Beating / lively music!)
 */

type SoundId = 'calm' | 'upbeat' | 'paper' | 'sparkle';

class AudioManager {
  private calmAudio: HTMLAudioElement | null = null;
  private upbeatAudio: HTMLAudioElement | null = null;
  private currentMode: 'calm' | 'upbeat' = 'calm';
  private muted = false;
  private unlocked = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  init() {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('friendship-muted');
    if (saved === 'true') this.muted = true;

    if (!this.calmAudio) {
      this.calmAudio = new Audio('/audio/calm.mp3');
      this.calmAudio.loop = true;
      this.calmAudio.volume = this.muted ? 0 : 0.55;
    }

    if (!this.upbeatAudio) {
      this.upbeatAudio = new Audio('/audio/upbeat.mp3');
      this.upbeatAudio.loop = true;
      this.upbeatAudio.volume = 0; // Starts silent
    }
  }

  unlock() {
    if (this.unlocked) return;
    this.unlocked = true;
    this.init();

    if (!this.muted && this.calmAudio) {
      this.calmAudio.play().catch(() => {});
    }
  }

  // ── Switch from Calm BGM to Upbeat Beating Music ──────────────────────
  playUpbeat() {
    this.unlock();
    if (this.currentMode === 'upbeat') return;
    this.currentMode = 'upbeat';

    if (this.calmAudio) {
      this.calmAudio.pause();
      this.calmAudio.currentTime = 0;
    }

    if (!this.upbeatAudio) {
      this.upbeatAudio = new Audio('/audio/upbeat.mp3');
      this.upbeatAudio.loop = true;
    }

    this.upbeatAudio.currentTime = 0;
    this.upbeatAudio.volume = this.muted ? 0 : 0.6; // Clear beating volume
    this.upbeatAudio.play().catch(() => {});
  }

  playCalm() {
    this.unlock();
    if (this.currentMode === 'calm') return;
    this.currentMode = 'calm';

    if (this.upbeatAudio) {
      this.upbeatAudio.pause();
    }

    if (this.calmAudio && !this.muted) {
      this.calmAudio.volume = 0.55;
      this.calmAudio.play().catch(() => {});
    }
  }

  play(id: SoundId) {
    this.unlock();
    if (id === 'upbeat') this.playUpbeat();
    if (id === 'calm') this.playCalm();
    if (id === 'sparkle' || id === 'paper') {
      this.playChime(id === 'sparkle' ? 880 : 440);
    }
  }

  private playChime(freq: number) {
    if (this.muted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch {}
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('friendship-muted', String(this.muted));
    }

    const activeAudio = this.currentMode === 'upbeat' ? this.upbeatAudio : this.calmAudio;

    if (activeAudio) {
      if (this.muted) {
        activeAudio.pause();
        activeAudio.volume = 0;
      } else {
        activeAudio.volume = this.currentMode === 'upbeat' ? 0.6 : 0.55;
        activeAudio.play().catch(() => {});
      }
    }

    return this.muted;
  }

  isMuted(): boolean {
    return this.muted;
  }
}

export const audioManager = new AudioManager();
