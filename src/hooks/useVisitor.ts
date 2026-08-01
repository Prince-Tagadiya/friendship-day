'use client';
import { useState, useEffect } from 'react';
import type { VisitorName, DeviceType } from '@/types';
import { getVisitorFromIP } from '@/lib/visitors';

interface UseVisitorReturn {
  visitor: VisitorName | null;
  deviceType: DeviceType | null;
  isLoading: boolean;
  detectedIp?: string;
  overrideVisitor: (name: VisitorName) => void;
}

export function useVisitor(): UseVisitorReturn {
  const [visitor, setVisitor] = useState<VisitorName | null>(null);
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detectedIp, setDetectedIp] = useState<string | undefined>();

  const overrideVisitor = (name: VisitorName) => {
    setVisitor(name);
  };

  useEffect(() => {
    async function detect() {
      try {
        // 1. Try server API route
        const res = await fetch('/api/visitor', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.visitor) {
            setVisitor(data.visitor as VisitorName);
            setDeviceType(data.deviceType as DeviceType);
            if (data.detectedIp) setDetectedIp(data.detectedIp);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // API route failed or static export
      }

      // 2. Fallback for GitHub Pages static export: fetch public IP client-side
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        const clientIp = ipData.ip;
        const result = getVisitorFromIP(clientIp);

        setVisitor(result.visitor);
        setDeviceType(result.deviceType);
        if (result.visitor === 'Prince') setDetectedIp(clientIp);
      } catch {
        setVisitor('unknown');
        setDeviceType('unknown-device');
      } finally {
        setIsLoading(false);
      }
    }
    detect();
  }, []);

  return { visitor, deviceType, isLoading, detectedIp, overrideVisitor };
}
