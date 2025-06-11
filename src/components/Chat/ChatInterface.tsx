import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { Message, Chat, ChatSettings } from '../../types';
import { MessageItem } from './MessageItem';

interface ChatInterfaceProps {
  currentChat: Chat | null;
  onSendMessage: (message: string) => Promise<void>;
  onEditMessage: (messageId: string, content: string) => void;
  isLoading: boolean;
  settings: ChatSettings;
}

export function ChatInterface({
  currentChat,
  onSendMessage,
  onEditMessage,
  isLoading,
  settings,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await onSendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEditMessage = (messageId: string, content: string) => {
    onEditMessage(messageId, content);
  };

  const handleCancelEdit = (messageId: string) => {
    onEditMessage(messageId, ''); // This will toggle off editing mode
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          מחולל השירים הישראלי
        </h1>
        <p className="text-gray-600 mt-2">
          בקש ממני לכתוב לך שיר בכל סגנון ומצב רוח שתרצה
        </p>
        {currentChat && (
          <div className="flex gap-4 mt-3 text-sm">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
              {settings.style.name}
            </span>
            <span
              className="px-3 py-1 text-white rounded-full"
              style={{ backgroundColor: settings.mood.color }}
            >
              {settings.mood.name}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
              {settings.model.name}
            </span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {!currentChat || currentChat.messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              בואו נתחיל לכתוב שיר מדהים!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              תאר לי על מה תרצה שיר - נושא, רגש, סיפור, או כל רעיון שעולה לך בראש
            </p>
          </div>
        ) : (
          <>
            {currentChat.messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                onEdit={handleEditMessage}
                onCancelEdit={handleCancelEdit}
              />
            ))}
            {isLoading && (
              <div className="flex gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-2">מחולל השירים</div>
                  <div className="text-gray-600">כותב לך שיר מיוחד... ⭐</div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="למשל: כתוב לי שיר על אהבה, או שיר עצוב על פרידה, או שיר שמח על חופש..."
            className="flex-1 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={3}
            disabled={isLoading}
            dir="auto"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}