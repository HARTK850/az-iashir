import React from 'react';
import { Music } from 'lucide-react';
import { MusicStyle } from '../../types';
import { MUSIC_STYLES } from '../../constants/musicStyles';

interface StyleSelectorProps {
  selectedStyle: MusicStyle;
  onStyleChange: (style: MusicStyle) => void;
}

export function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Music className="w-4 h-4" />
        <span>סגנון מוזיקלי</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {MUSIC_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style)}
            className={`p-3 rounded-lg text-sm font-medium transition-all ${
              selectedStyle.id === style.id
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
            }`}
          >
            <div className="text-center">
              <div className="font-bold">{style.name}</div>
              <div className="text-xs opacity-75 mt-1">{style.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}