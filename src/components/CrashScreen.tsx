import React, { useState, useEffect } from 'react';
import { CrashConfig } from '../types';

interface CrashScreenProps {
  config: CrashConfig;
  onExit: () => void;
}

export default function CrashScreen({ config, onExit }: CrashScreenProps) {
  const [percentage, setPercentage] = useState(config.percentage);

  useEffect(() => {
    if (!config.autoIncrement) return;

    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment between 1 and 15
        const increment = Math.floor(Math.random() * 15) + 1;
        return Math.min(prev + increment, 100);
      });
    }, Math.random() * 2000 + 1000); // Random interval between 1s and 3s

    return () => clearInterval(interval);
  }, [config.autoIncrement]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-center items-start text-white select-none overflow-hidden cursor-none"
      style={{
        backgroundColor: config.backgroundColor,
        fontFamily: config.fontFamily,
        paddingLeft: '15%',
        paddingRight: '15%',
      }}
      onClick={onExit}
      title="Click anywhere or press Esc to exit"
    >
      <div className="max-w-4xl w-full">
        <div className="text-[120px] leading-none font-light mb-8">
          {config.emoticon}
        </div>
        <div className="text-3xl font-normal leading-snug mb-8">
          {config.mainText}
        </div>
        <div className="text-3xl font-normal mb-12">
          {percentage}% complete
        </div>

        <div className="flex flex-row items-start mt-12">
          {config.showQrCode && (
            <div className="mr-6 bg-white p-2 shrink-0">
              {/* Simple SVG QR Code placeholder */}
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="white" />
                <path d="M10 10H40V40H10V10ZM20 20V30H30V20H20Z" fill="black" />
                <path d="M60 10H90V40H60V10ZM70 20V30H80V20H70Z" fill="black" />
                <path d="M10 60H40V90H10V60ZM20 70V80H30V70H20Z" fill="black" />
                <rect x="60" y="60" width="10" height="10" fill="black" />
                <rect x="80" y="60" width="10" height="10" fill="black" />
                <rect x="60" y="80" width="10" height="10" fill="black" />
                <rect x="80" y="80" width="10" height="10" fill="black" />
                <rect x="70" y="70" width="10" height="10" fill="black" />
                <rect x="45" y="10" width="10" height="40" fill="black" />
                <rect x="10" y="45" width="40" height="10" fill="black" />
                <rect x="60" y="45" width="30" height="10" fill="black" />
                <rect x="45" y="60" width="10" height="30" fill="black" />
              </svg>
            </div>
          )}
          <div className="flex flex-col justify-center text-[15px] leading-relaxed">
            <div className="mb-2">
              For more information about this issue and possible fixes, visit https://www.windows.com/stopcode
            </div>
            <div className="mb-1">
              If you call a support person, give them this info:
            </div>
            <div>
              Stop code: {config.stopCode}
            </div>
            {config.whatFailed && (
              <div>
                What failed: {config.whatFailed}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
