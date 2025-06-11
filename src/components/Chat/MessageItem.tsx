import React, { useState } from 'react';
import { Copy, Edit2, Save, X, User, Bot } from 'lucide-react';
import { Message } from '../../types';
import { copyToClipboard } from '../../utils/exportUtils';

interface MessageItemProps {
  message: Message;
  onEdit: (id: string, content: string) => void;
  onCancelEdit: (id: string) => void;
}

export function MessageItem({ message, onEdit, onCancelEdit }: MessageItemProps) {
  const [editContent, setEditContent] = useState(message.content);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSave = () => {
    onEdit(message.id, editContent);
  };

  const handleCancel = () => {
    setEditContent(message.content);
    onCancelEdit(message.id);
  };

  return (
    <div
      className={`flex gap-4 p-4 rounded-2xl transition-all ${
        message.role === 'user'
          ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200'
          : 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200'
      }`}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          message.role === 'user'
            ? 'bg-gradient-to-r from-purple-500 to-indigo-600'
            : 'bg-gradient-to-r from-emerald-500 to-teal-600'
        }`}
      >
        {message.role === 'user' ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-gray-900">
            {message.role === 'user' ? 'אתה' : 'מחולל השירים'}
          </span>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString('he-IL', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        {message.isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={6}
              dir="auto"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Save className="w-4 h-4" />
                שמור
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <X className="w-4 h-4" />
                ביטול
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap" dir="auto">
              {message.content}
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1 px-2 py-1 text-xs rounded-lg transition-colors ${
                  copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Copy className="w-3 h-3" />
                {copied ? 'הועתק!' : 'העתק'}
              </button>
              {message.role === 'assistant' && (
                <button
                  onClick={() => onEdit(message.id, message.content)}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  ערוך
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}