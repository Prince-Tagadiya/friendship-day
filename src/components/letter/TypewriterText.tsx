'use client';
import { useEffect, useRef, useState } from 'react';

interface TypewriterTextProps {
  lines: string[];
  onComplete?: () => void;
  speed?: number; // ms per character
  lineDelay?: number; // ms between lines
  className?: string;
}

export default function TypewriterText({
  lines,
  onComplete,
  speed = 40,
  lineDelay = 800,
  className = '',
}: TypewriterTextProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      onComplete?.();
      return;
    }

    const line = lines[currentLine];

    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = (updated[currentLine] ?? '') + line[currentChar];
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // Line complete — wait then move to next
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, lineDelay);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, lines, speed, lineDelay, onComplete]);

  return (
    <div className={className}>
      {lines.map((_, i) => (
        <div
          key={i}
          style={{
            opacity: i <= currentLine ? 1 : 0,
            transition: 'opacity 0.4s ease',
            minHeight: '1.4em',
          }}
        >
          {displayedLines[i] ?? ''}
          {/* Blinking cursor on current line */}
          {i === currentLine && !done && (
            <span
              className="animate-blink"
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                background: 'currentColor',
                marginLeft: '1px',
                verticalAlign: 'middle',
                opacity: 0.7,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
