import React from 'react';
import { CrashConfig } from '../types';
import { PRESETS } from '../constants';
import { Settings, Play, Monitor, AlertTriangle } from 'lucide-react';

interface ConfiguratorProps {
  config: CrashConfig;
  onChange: (config: CrashConfig) => void;
  onCrash: () => void;
}

export default function Configurator({ config, onChange, onCrash }: ConfiguratorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;

    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      finalValue = parseInt(value, 10);
    }

    onChange({ ...config, [name]: finalValue });
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const presetId = e.target.value;
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      onChange(preset);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 text-green-700 rounded-lg">
            <Monitor size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Oh My Crash</h1>
          <a
            href="https://github.com/DanZai233/oh-my-crash"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
        <button
          onClick={onCrash}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm"
        >
          <Play size={18} />
          Trigger Crash
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preset Templates
            </label>
            <select
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border"
              onChange={handlePresetChange}
              value={config.id || ''}
            >
              <option value="" disabled>Select a preset...</option>
              {PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Settings size={16} />
              Appearance
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="backgroundColor"
                  value={config.backgroundColor}
                  onChange={handleChange}
                  className="h-10 w-14 rounded cursor-pointer border-gray-300"
                />
                <input
                  type="text"
                  name="backgroundColor"
                  value={config.backgroundColor}
                  onChange={handleChange}
                  className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emoticon
              </label>
              <input
                type="text"
                name="emoticon"
                value={config.emoticon}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border font-mono text-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Family
              </label>
              <input
                type="text"
                name="fontFamily"
                value={config.fontFamily}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <AlertTriangle size={16} />
              Crash Details
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Text
              </label>
              <textarea
                name="mainText"
                value={config.mainText}
                onChange={handleChange}
                rows={3}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border resize-none"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Percentage
                </label>
                <input
                  type="number"
                  name="percentage"
                  value={config.percentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border"
                />
              </div>
              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="autoIncrement"
                    checked={config.autoIncrement}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-5 w-5"
                  />
                  <span className="text-sm font-medium text-gray-700">Auto-increment</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stop Code
              </label>
              <input
                type="text"
                name="stopCode"
                value={config.stopCode}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What Failed (Optional)
              </label>
              <input
                type="text"
                name="whatFailed"
                value={config.whatFailed}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border font-mono"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="showQrCode"
                  checked={config.showQrCode}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-5 w-5"
                />
                <span className="text-sm font-medium text-gray-700">Show QR Code</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
