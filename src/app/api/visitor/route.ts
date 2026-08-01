import { NextRequest, NextResponse } from 'next/server';
import { getVisitorFromIP } from '@/lib/visitors';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  // Extract real IP — supports Vercel, Cloudflare, nginx, local
  const cfIp = request.headers.get('cf-connecting-ip');
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  let ip = cfIp || realIp || forwarded?.split(',')[0]?.trim() || '127.0.0.1';

  // Strip port from IPv4:port format ONLY (e.g. "1.2.3.4:3000" → "1.2.3.4")
  // Do NOT touch IPv6 addresses like ::1 — the old regex was breaking them
  if (/^\d+\.\d+\.\d+\.\d+:\d+$/.test(ip)) {
    ip = ip.split(':')[0];
  }
  // Handle bracketed IPv6 with port: "[::1]:3000" → "::1"
  if (ip.startsWith('[')) {
    ip = ip.replace(/^\[(.+)\]:\d+$/, '$1');
  }

  // Localhost dev → default to Prince so you can test locally
  const isLocalhost = ip === '127.0.0.1' || ip === '::1' || ip === 'localhost' || ip === '::';
  if (isLocalhost) {
    ip = '2405:201:201e:9158:1a4:2802:19ec:9bfe'; // Prince (admin)
  }

  const { visitor, deviceType } = getVisitorFromIP(ip);

  return NextResponse.json(
    {
      visitor,
      deviceType,
      // Only expose raw IP to Prince (admin)
      ...(visitor === 'Prince' ? { detectedIp: ip } : {}),
    },
    {
      headers: { 'Cache-Control': 'no-store' },
    }
  );
}
