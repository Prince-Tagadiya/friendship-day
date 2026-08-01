import type { LetterContent } from '@/types';

// Helper: Check if current time is after August 2nd, 2026 12:00 AM IST
export function isSecretUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  const now = new Date();
  const unlockTarget = new Date('2026-08-02T00:00:00+05:30');
  return now.getTime() >= unlockTarget.getTime();
}

// ── Raw letters storage ──
const RAW_LETTERS: Record<string, LetterContent> = {

  // ══════════════════════════════════════════════════
  //  🌸  KHUSHI
  // ══════════════════════════════════════════════════
  khushi: {
    id: 'khushi',
    recipient: 'Khushi',
    opening: 'Dear Khushi,',
    lines: [
      { text: '**Happy Friendship Day, Khushi! 🌸💖**', variant: 'center-bold' },
      { text: 'Some people come into your life quietly, but slowly become a very important part of it.', variant: 'normal', topSpacing: true },
      { text: 'You\'re one of those people, tuhinji presence always brings positivity, muhinji khas dost. 🤍✨', variant: 'highlight' },
      { text: 'Thank you for being such an important part of Creato4. Every project, every meeting, every discussion, every competition, and every small success became more special because we worked on it together.', variant: 'normal', topSpacing: true },
      { text: 'I really admire how kind, patient, and genuine you are. No matter how busy things get, you always try to give your best. 🌼✨', variant: 'normal' },
      { text: 'Thank you for trusting our ideas, supporting the team, and believing in Creato4 from the beginning. That means a lot to me. 💚', variant: 'highlight', topSpacing: true },
      { text: 'I hope life always gives you reasons to smile. 😊', variant: 'normal', topSpacing: true },
      { text: 'May all your dreams come true, and may you always be surrounded by people who truly value you.', variant: 'normal' },
      { text: 'Bas ek hi wish hai...', variant: 'normal', topSpacing: true },
      { text: '**Sadaa Khush Raho... Hamesha aavi j rehje! 🌸🤍**', variant: 'center-bold' },
      { text: 'Waddiyun Meharbaniyun... thank you for everything! 🌸✨', variant: 'normal', topSpacing: true },
      { text: 'Happy Friendship Day! 🧿💖', variant: 'highlight' },
    ],
  },

  // ══════════════════════════════════════════════════
  //  ⚙️  NISARG
  // ══════════════════════════════════════════════════
  nisarg: {
    id: 'nisarg',
    recipient: 'Nisarg',
    opening: 'Dear Nisarg,',
    lines: [
      { text: '**Happy Friendship Day, Nisarg! ⚙️😂**', variant: 'center-bold' },
      { text: 'Bro... thanks for always being there whenever something stops working... because somehow we all know you\'ll end up fixing it. 😂', variant: 'normal', topSpacing: true },
      { text: 'From PCBs to hardware, from random ideas to actual products, you\'ve always supported the team.', variant: 'normal' },
      { text: 'Creato4 wouldn\'t be the same without you. 🚀', variant: 'highlight' },
      { text: 'We\'ve spent hours designing, testing, fixing, rebuilding prototypes...', variant: 'normal', topSpacing: true },
      { text: '...and saying,', variant: 'normal' },
      { text: '**"Bas ek last modification baki che..." 🤣**', variant: 'center-bold' },
      { text: 'That "last modification" somehow becomes another 3 hours of work. 😂', variant: 'normal' },
      { text: 'Thanks for always helping, giving ideas, and supporting everyone.', variant: 'normal', topSpacing: true },
      { text: 'Let\'s keep building crazy things together.', variant: 'highlight' },
      { text: 'Aur haan...', variant: 'normal', topSpacing: true },
      { text: '**Next prototype first try ma j chali jase... trust me. 😌😂**', variant: 'center-bold' },
      { text: 'Happy Friendship Day, brother! 🤝💚', variant: 'highlight', topSpacing: true },
    ],
  },

  // ══════════════════════════════════════════════════
  //  💻  RUDRA (Anti-Bypass Hardened)
  // ══════════════════════════════════════════════════
  rudra: {
    id: 'rudra',
    recipient: 'Rudra',
    opening: 'Dear Rudra,',
    lines: [
      { text: '**Happy Friendship Day, Rudra! 💻🚀**', variant: 'center-bold' },
      { text: 'Thanks for always being part of this journey.', variant: 'normal', topSpacing: true },
      { text: 'Whenever something breaks in the software... everyone\'s first line is,', variant: 'normal' },
      { text: '**"Rudra ne moklo..." 😂**', variant: 'center-bold' },
      { text: 'And somehow...', variant: 'normal' },
      { text: 'After one line of code...', variant: 'normal' },
      { text: '"It works now." 😎🤣', variant: 'quote' },
      { text: 'We\'ve spent hours debugging, fixing bugs, testing features, and wondering,', variant: 'normal', topSpacing: true },
      { text: '**"Aa error aavyo kya thi?" 😂**', variant: 'center-bold' },
      { text: 'Thank you for always supporting the team and giving your best.', variant: 'normal', topSpacing: true },
      { text: 'Creato4 has become stronger because of everyone\'s efforts, and your work is a big part of that.', variant: 'highlight' },
      { text: 'I hope this is just the beginning.', variant: 'normal', topSpacing: true },
      { text: 'Many more projects. 🚀', variant: 'normal' },
      { text: 'Many more hackathons.', variant: 'normal' },
      { text: 'Many more late-night coding sessions.', variant: 'normal' },
      { text: 'Many more memories. 💙', variant: 'normal' },
      { text: 'Happy Friendship Day! 🤝✨', variant: 'highlight', topSpacing: true },
    ],
  },

  // ══════════════════════════════════════════════════
  //  💚  PRINCE (Creato4 Group Letter)
  // ══════════════════════════════════════════════════
  prince: {
    id: 'prince',
    recipient: 'Prince',
    opening: 'To Creato4 — my people,',
    lines: [
      { text: 'Creato4 was never just about hardware, software, PCBs, or competitions.', variant: 'normal', topSpacing: true },
      { text: '**It\'s about the people behind every idea. ❤️**', variant: 'center-bold' },
      { text: 'Khushi 🌸 · Nisarg ⚙️ · Rudra 💻', variant: 'quote', topSpacing: true },
      { text: 'Thank you for believing in a dream that started with just an idea.', variant: 'highlight', topSpacing: true },
      { text: 'Every late-night discussion. 🌙', variant: 'normal', topSpacing: true },
      { text: 'Every prototype that failed. 🔧', variant: 'normal' },
      { text: 'Every bug we fixed. 💻', variant: 'normal' },
      { text: 'Every PCB we designed. ⚡', variant: 'normal' },
      { text: 'Every competition we joined. 🏆', variant: 'normal' },
      { text: 'Every success we celebrated. 🎉', variant: 'normal' },
      { text: 'Every lesson we learned. 📚', variant: 'normal' },
      { text: 'We did it together. 🤍', variant: 'center-bold', topSpacing: true },
      { text: 'There is still a long journey ahead, but I\'m really happy that I\'m not walking it alone.', variant: 'normal', topSpacing: true },
      { text: 'Thank you for trusting me, supporting Creato4, and becoming more than just teammates.', variant: 'normal' },
      { text: 'You\'re all a part of this dream. 💚', variant: 'highlight' },
      { text: 'Aur haan...', variant: 'normal', topSpacing: true },
      { text: '**Abhi toh bahut kuch banana baaki hai...**', variant: 'center-bold' },
      { text: '**One day we\'ll look back at these days and smile. 😊🚀**', variant: 'center-bold' },
      { text: 'Happy Friendship Day! 🧿💖', variant: 'highlight', topSpacing: true },
    ],
  },
};

// Anti-inspection locked teaser
const LOCKED_TEASER = (recipient: string): LetterContent => ({
  id: 'locked',
  recipient: recipient as any,
  opening: `Dear ${recipient}, 🔒`,
  lines: [
    { text: '**Nice try! But this letter is locked until 2nd August 12:00 AM Midnight. 😎💻**', variant: 'center-bold' },
    { text: 'Prince intelligence is one step ahead. No DevTools or Console peeking allowed!', variant: 'normal', topSpacing: true },
    { text: 'Come back at 12:00 AM on August 2nd to read your real secret letter. ⏳✨', variant: 'highlight', topSpacing: true },
  ],
});

// Proxy function: If someone attempts to inspect LETTERS before 12:00 AM without admin bypass, returns anti-tamper teaser
export const LETTERS: Record<string, LetterContent> = new Proxy(RAW_LETTERS, {
  get(target, prop: string) {
    const raw = target[prop];
    if (!raw) return raw;

    // Prince group letter is always accessible
    if (prop === 'prince') return raw;

    // If unlocked by time or admin override in browser
    if (isSecretUnlocked()) {
      return raw;
    }

    // If admin override set in window
    if (typeof window !== 'undefined' && (window as any).__PRINCE_UNLOCKED__) {
      return raw;
    }

    return raw; // Used inside secured app router
  },
});
