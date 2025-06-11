import React from 'react';
import { Brain } from 'lucide-react';
import { GeminiModel } from '../../types';
import { GEMINI_MODELS } from '../../constants/geminiModels';

interface ModelSelectorProps {
  selectedModel: GeminiModel;
  onModelChange: (model: GeminiModel) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Brain className="w-4 h-4" />
        <span>מודל AI</span>
      </div>
      
      <select
        value={selectedModel.id}
        onChange={(e) => {
          const model = GEMINI_MODELS.find(m => m.id === e.target.value);
          if (model) onModelChange(model);
        }}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
      >
        {GEMINI_MODELS.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
      
      <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded-lg">
        {selectedModel.description}
      </div>
    </div>
  );
}