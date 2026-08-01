'use client';
import { useState, useEffect } from 'react';
import type { VisitorName, DeviceType } from '@/types';

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
        const res = await fetch('/api/visitor', { cache: 'no-store' });
        const data = await res.json();
        setVisitor(data.visitor as VisitorName);
        setDeviceType(data.deviceType as DeviceType);
        if (data.detectedIp) setDetectedIp(data.detectedIp);
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
