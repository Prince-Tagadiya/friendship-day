import type { Visitor, VisitorName } from '@/types';

export type DeviceType = 'laptop' | 'mobile' | 'unknown-device';

export interface VisitorEntry {
  name: VisitorName;
  deviceType: DeviceType;
}

// Known visitor IPs & IPv4/IPv6 subnets — server & client side matching
export const VISITOR_IPS: Record<string, VisitorEntry> = {
  // ─── Khushi ───────────────────────────────────────────
  '42.104.239.1': { name: 'Khushi', deviceType: 'mobile' },          // SM-S721B Android
  '2402:3a80:464a:f4d1:5192:da14:91f1:5604': { name: 'Khushi', deviceType: 'laptop' }, // Chrome on Windows

  // ─── Nisarg ───────────────────────────────────────────
  '2401:4900:ab4d:7698:3184:2532:f3c7:1b61': { name: 'Nisarg', deviceType: 'laptop' }, // Chrome on Windows

  // ─── Rudra ────────────────────────────────────────────
  '2409:40c1:401b:1ee5:510:51cd:645b:b2d0': { name: 'Rudra', deviceType: 'laptop' },  // Chrome on Windows

  // ─── Prince ───────────────────────────────────────────
  '49.43.33.178': { name: 'Prince', deviceType: 'laptop' },                          // Chrome on Mac IPv4
  '2405:201:201e:9158:1a4:2802:19ec:9bfe': { name: 'Prince', deviceType: 'laptop' }, // Chrome on Mac IPv6
};

// Known IPv6 & IPv4 Subnet Prefixes (handles ISP IP rotation)
export const VISITOR_SUBNETS: { prefix: string; name: VisitorName; deviceType: DeviceType }[] = [
  { prefix: '2405:201:', name: 'Prince', deviceType: 'laptop' },
  { prefix: '49.43.', name: 'Prince', deviceType: 'laptop' },
  { prefix: '2402:3a80:', name: 'Khushi', deviceType: 'laptop' },
  { prefix: '42.104.', name: 'Khushi', deviceType: 'mobile' },
  { prefix: '2401:4900:', name: 'Nisarg', deviceType: 'laptop' },
  { prefix: '2409:40c1:', name: 'Rudra', deviceType: 'laptop' },
];

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
  const normalized = ip.toLowerCase().trim();

  // 1. Exact match
  const direct = VISITOR_IPS[normalized];
  if (direct) return { visitor: direct.name, deviceType: direct.deviceType };

  for (const [knownIp, entry] of Object.entries(VISITOR_IPS)) {
    if (knownIp.toLowerCase() === normalized) {
      return { visitor: entry.name, deviceType: entry.deviceType };
    }
  }

  // 2. Subnet / Prefix match (handles ISP dynamic IP rotation)
  for (const sub of VISITOR_SUBNETS) {
    if (normalized.startsWith(sub.prefix.toLowerCase())) {
      return { visitor: sub.name, deviceType: sub.deviceType };
    }
  }

  return { visitor: 'unknown', deviceType: 'unknown-device' };
}
