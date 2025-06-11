import React, { useState } from 'react';
import { Plus, Settings, Key, X, Menu } from 'lucide-react';
import { Chat, ChatSettings } from '../../types';
import { ChatHistory } from './ChatHistory';
import { StyleSelector } from '../Controls/StyleSelector';
import { MoodSelector } from '../Controls/MoodSelector';
import { ModelSelector } from '../Controls/ModelSelector';

interface SidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  settings: ChatSettings;
  onSelectChat: (chatId: string) => void;
  onCreateNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newTitle: string) => void;
  onSettingsChange: (settings: ChatSettings) => void;
  onOpenApiKeyModal: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({
  chats,
  currentChatId,
  settings,
  onSelectChat,
  onCreateNewChat,
  onDeleteChat,
  onRenameChat,
  onSettingsChange,
  onOpenApiKeyModal,
  isOpen,
  onToggle,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'chats' | 'settings'>('chats');

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 right-0 z-40 w-80 bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">מחולל השירים</h2>
              <button
                onClick={onToggle}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onCreateNewChat}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                שיר חדש
              </button>
              <button
                onClick={onOpenApiKeyModal}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="הגדרת מפתח API"
              >
                <Key className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('chats')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'chats'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                שירים
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'settings'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                הגדרות
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'chats' ? (
              <ChatHistory
                chats={chats}
                currentChatId={currentChatId}
                onSelectChat={onSelectChat}
                onDeleteChat={onDeleteChat}
                onRenameChat={onRenameChat}
              />
            ) : (
              <div className="space-y-6">
                <StyleSelector
                  selectedStyle={settings.style}
                  onStyleChange={(style) =>
                    onSettingsChange({ ...settings, style })
                  }
                />
                <MoodSelector
                  selectedMood={settings.mood}
                  onMoodChange={(mood) =>
                    onSettingsChange({ ...settings, mood })
                  }
                />
                <ModelSelector
                  selectedModel={settings.model}
                  onModelChange={(model) =>
                    onSettingsChange({ ...settings, model })
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
}