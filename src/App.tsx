import React, { useState } from 'react';
import Configurator from './components/Configurator';
import CrashScreen from './components/CrashScreen';
import { PRESETS } from './constants';
import { CrashConfig } from './types';

export default function App() {
  const [isCrashed, setIsCrashed] = useState(false);
  const [config, setConfig] = useState<CrashConfig>(PRESETS[0]);

  const handleCrash = () => {
    setIsCrashed(true);
  };

  const handleExit = () => {
    setIsCrashed(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {!isCrashed ? (
        <Configurator
          config={config}
          onChange={setConfig}
          onCrash={handleCrash}
        />
      ) : (
        <CrashScreen config={config} onExit={handleExit} />
      )}
    </div>
  );
}
