'use client';
import { useState, useEffect } from 'react';
import type { VisitorName, DeviceType } from '@/types';
import { getVisitorFromIP } from '@/lib/visitors';

export interface VisitLogEntry {
  id: string;
  name: VisitorName;
  timestamp: string;
  ip?: string;
  device?: DeviceType;
}

interface UseVisitorReturn {
  visitor: VisitorName | null;
  deviceType: DeviceType | null;
  isLoading: boolean;
  detectedIp?: string;
  visitLogs: VisitLogEntry[];
  overrideVisitor: (name: VisitorName) => void;
}

export function useVisitor(): UseVisitorReturn {
  const [visitor, setVisitor] = useState<VisitorName | null>(null);
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detectedIp, setDetectedIp] = useState<string | undefined>();
  const [visitLogs, setVisitLogs] = useState<VisitLogEntry[]>([]);

  const overrideVisitor = (name: VisitorName) => {
    setVisitor(name);
  };

  useEffect(() => {
    // Load existing visit logs
    try {
      const saved = localStorage.getItem('friendship-visit-logs');
      if (saved) {
        setVisitLogs(JSON.parse(saved));
      }
    } catch {}

    async function detect() {
      const isStaticHost = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
      let foundVisitor: VisitorName = 'unknown';
      let foundDevice: DeviceType = 'unknown-device';
      let foundIp: string | undefined;

      // If NOT static host, try server API route first
      if (!isStaticHost) {
        try {
          const res = await fetch('/api/visitor', { cache: 'no-store' });
          if (res.ok) {
            const data = await res.json();
            if (data.visitor && data.visitor !== 'unknown') {
              foundVisitor = data.visitor as VisitorName;
              foundDevice = data.deviceType as DeviceType;
              foundIp = data.detectedIp;
            }
          }
        } catch {}
      }

      // Client-side public IP lookup (for GitHub Pages static export)
      if (foundVisitor === 'unknown') {
        try {
          const ipRes = await fetch('https://api64.ipify.org?format=json');
          const ipData = await ipRes.json();
          foundIp = ipData.ip;
          const result = getVisitorFromIP(foundIp!);
          foundVisitor = result.visitor;
          foundDevice = result.deviceType;
        } catch {
          foundVisitor = 'unknown';
          foundDevice = 'unknown-device';
        }
      }

      setVisitor(foundVisitor);
      setDeviceType(foundDevice);
      setDetectedIp(foundIp);
      setIsLoading(false);

      // Log the visit with precise timestamp (Asia/Kolkata timezone)
      if (foundVisitor !== 'unknown') {
        const timeStr = new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'medium',
          timeStyle: 'medium',
        });

        const newEntry: VisitLogEntry = {
          id: Math.random().toString(36).substring(2, 9),
          name: foundVisitor,
          timestamp: timeStr,
          ip: foundIp,
          device: foundDevice,
        };

        setVisitLogs((prev) => {
          const updated = [newEntry, ...prev.filter((item) => item.timestamp !== timeStr)].slice(0, 50);
          try {
            localStorage.setItem('friendship-visit-logs', JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }
    }

    detect();
  }, []);

  return { visitor, deviceType, isLoading, detectedIp, visitLogs, overrideVisitor };
}
