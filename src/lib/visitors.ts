import type { Visitor, VisitorName } from '@/types';

export type DeviceType = 'laptop' | 'mobile' | 'unknown-device';

export interface VisitorEntry {
  name: VisitorName;
  deviceType: DeviceType;
}

// Known visitor IPs — server-side only. Never sent to client raw.
export const VISITOR_IPS: Record<string, VisitorEntry> = {
  // ─── Khushi ───────────────────────────────────────────
  '42.104.239.1': { name: 'Khushi', deviceType: 'mobile' },          // SM-S721B Android
  '2402:3a80:464a:f4d1:5192:da14:91f1:5604': { name: 'Khushi', deviceType: 'laptop' }, // Chrome on Windows

  // ─── Nisarg ───────────────────────────────────────────
  '2401:4900:ab4d:7698:3184:2532:f3c7:1b61': { name: 'Nisarg', deviceType: 'laptop' }, // Chrome on Windows

  // ─── Rudra ────────────────────────────────────────────
  '2409:40c1:401b:1ee5:510:51cd:645b:b2d0': { name: 'Rudra', deviceType: 'laptop' },  // Chrome on Windows

  // ─── Prince ───────────────────────────────────────────
  '2405:201:201e:9158:1a4:2802:19ec:9bfe': { name: 'Prince', deviceType: 'laptop' }, // Chrome on Mac
};

export const VISITORS: Record<VisitorName, Visitor> = {
  Khushi: {
    name: 'Khushi',
    greeting: 'Khushi',
    emoji: '🌸',
    letterId: 'khushi',
    isAdmin: false,
  },
  Nisarg: {
    name: 'Nisarg',
    greeting: 'Nisarg',
    emoji: '🌟',
    letterId: 'nisarg',
    isAdmin: false,
  },
  Rudra: {
    name: 'Rudra',
    greeting: 'Rudra',
    emoji: '🤍',
    letterId: 'rudra',
    isAdmin: false,
  },
  Prince: {
    name: 'Prince',
    greeting: 'Prince',
    emoji: '💚',
    letterId: 'prince',
    isAdmin: true,
  },
  unknown: {
    name: 'unknown',
    greeting: 'Friend',
    emoji: '🔒',
    letterId: '',
    isAdmin: false,
  },
};

export function getVisitorFromIP(ip: string): {
  visitor: VisitorName;
  deviceType: DeviceType;
} {
  // Direct match
  const direct = VISITOR_IPS[ip];
  if (direct) return { visitor: direct.name, deviceType: direct.deviceType };

  // Normalized IPv6 lowercase match
  const normalized = ip.toLowerCase().trim();
  for (const [knownIp, entry] of Object.entries(VISITOR_IPS)) {
    if (knownIp.toLowerCase() === normalized) {
      return { visitor: entry.name, deviceType: entry.deviceType };
    }
  }

  return { visitor: 'unknown', deviceType: 'unknown-device' };
}
