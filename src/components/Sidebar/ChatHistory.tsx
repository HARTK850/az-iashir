import React, { useState } from 'react';
import { MessageSquare, Trash2, Edit3, MoreVertical, Download, Share2 } from 'lucide-react';
import { Chat } from '../../types';
import { exportChatAsText, copyToClipboard } from '../../utils/exportUtils';

interface ChatHistoryProps {
  chats: Chat[];
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newTitle: string) => void;
}

export function ChatHistory({
  chats,
  currentChatId,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
}: ChatHistoryProps) {
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleStartEdit = (chat: Chat) => {
    setEditingChatId(chat.id);
    setEditTitle(chat.title);
    setActiveMenu(null);
  };

  const handleSaveEdit = (chatId: string) => {
    if (editTitle.trim()) {
      onRenameChat(chatId, editTitle.trim());
    }
    setEditingChatId(null);
    setEditTitle('');
  };

  const handleCancelEdit = () => {
    setEditingChatId(null);
    setEditTitle('');
  };

  const handleExport = (chat: Chat) => {
    const content = exportChatAsText(chat);
    copyToClipboard(content);
    setActiveMenu(null);
  };

  const handleShare = (chat: Chat) => {
    const url = `${window.location.origin}?chat=${chat.id}`;
    copyToClipboard(url);
    setActiveMenu(null);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700 px-3 py-2">שירים שנוצרו</h3>
      {chats.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">עדיין לא יצרת שירים</p>
        </div>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.id}
            className={`group relative p-3 rounded-lg transition-all ${
              currentChatId === chat.id
                ? 'bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200'
                : 'hover:bg-gray-50'
            }`}
          >
            {editingChatId === chat.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSaveEdit(chat.id);
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  autoFocus
                />
                <div className="flex gap-1">
                  <button
                    onClick={() => handleSaveEdit(chat.id)}
                    className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    שמור
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-xs px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    ביטול
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div
                  onClick={() => onSelectChat(chat.id)}
                  className="cursor-pointer"
                >
                  <div className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                    {chat.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {chat.updatedAt.toLocaleDateString('he-IL')}
                  </div>
                </div>

                <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === chat.id ? null : chat.id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>

                  {activeMenu === chat.id && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-40">
                      <button
                        onClick={() => handleStartEdit(chat)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        <Edit3 className="w-4 h-4" />
                        שנה שם
                      </button>
                      <button
                        onClick={() => handleShare(chat)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        <Share2 className="w-4 h-4" />
                        שתף
                      </button>
                      <button
                        onClick={() => handleExport(chat)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        <Download className="w-4 h-4" />
                        ייצא
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          onDeleteChat(chat.id);
                          setActiveMenu(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        מחק
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}