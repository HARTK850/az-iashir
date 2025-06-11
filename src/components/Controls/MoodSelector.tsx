import React from 'react';
import { Heart } from 'lucide-react';
import { Mood } from '../../types';
import { MOODS } from '../../constants/moods';

interface MoodSelectorProps {
  selectedMood: Mood;
  onMoodChange: (mood: Mood) => void;
}

export function MoodSelector({ selectedMood, onMoodChange }: MoodSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Heart className="w-4 h-4" />
        <span>מצב רוח</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodChange(mood)}
            className={`p-3 rounded-lg text-sm font-medium transition-all ${
              selectedMood.id === mood.id
                ? 'text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
            }`}
            style={{
              backgroundColor: selectedMood.id === mood.id ? mood.color : undefined,
            }}
          >
            <div className="text-center">
              <div className="font-bold">{mood.name}</div>
              <div className="text-xs opacity-75 mt-1">{mood.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}