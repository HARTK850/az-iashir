import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Chat, Message, ChatSettings, AppSettings } from './types';
import { MUSIC_STYLES } from './constants/musicStyles';
import { MOODS } from './constants/moods';
import { GEMINI_MODELS } from './constants/geminiModels';
import { GeminiService } from './services/geminiService';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ChatInterface } from './components/Chat/ChatInterface';
import { ApiKeyModal } from './components/Settings/ApiKeyModal';

function App() {
  const [chats, setChats] = useLocalStorage<Chat[]>('song-chats', []);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  
  const [appSettings, setAppSettings] = useLocalStorage<AppSettings>('app-settings', {
    apiKey: '',
    theme: 'light',
    language: 'he',
  });

  const [chatSettings, setChatSettings] = useLocalStorage<ChatSettings>('chat-settings', {
    style: MUSIC_STYLES[0],
    mood: MOODS[0],
    model: GEMINI_MODELS[0],
  });

  const currentChat = chats.find(chat => chat.id === currentChatId) || null;

  // Check if API key is set on mount
  useEffect(() => {
    if (!appSettings.apiKey) {
      setShowApiKeyModal(true);
    }
  }, [appSettings.apiKey]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'שיר חדש',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      settings: { ...chatSettings },
    };

    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setSidebarOpen(false);
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setSidebarOpen(false);
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const renameChat = (chatId: string, newTitle: string) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? { ...chat, title: newTitle, updatedAt: new Date() }
          : chat
      )
    );
  };

  const sendMessage = async (content: string) => {
    if (!appSettings.apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    let chat = currentChat;
    
    // Create new chat if none exists
    if (!chat) {
      const newChat: Chat = {
        id: uuidv4(),
        title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        settings: { ...chatSettings },
      };
      
      setChats(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
      chat = newChat;
    }

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    // Add user message
    setChats(prev =>
      prev.map(c =>
        c.id === chat!.id
          ? {
              ...c,
              messages: [...c.messages, userMessage],
              updatedAt: new Date(),
              title: c.messages.length === 0 ? content.slice(0, 50) + (content.length > 50 ? '...' : '') : c.title,
            }
          : c
      )
    );

    setIsLoading(true);

    try {
      const geminiService = new GeminiService(appSettings.apiKey);
      const response = await geminiService.generateSong(
        content,
        chat.settings.model,
        chat.settings.style.prompt,
        chat.settings.mood.prompt
      );

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setChats(prev =>
        prev.map(c =>
          c.id === chat!.id
            ? {
                ...c,
                messages: [...c.messages, assistantMessage],
                updatedAt: new Date(),
              }
            : c
        )
      );
    } catch (error) {
      console.error('Error generating song:', error);
      
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: 'מצטער, אירעה שגיאה בזמן יצירת השיר. אנא ודא שמפתח ה-API שלך תקין ונסה שוב.',
        timestamp: new Date(),
      };

      setChats(prev =>
        prev.map(c =>
          c.id === chat!.id
            ? {
                ...c,
                messages: [...c.messages, errorMessage],
                updatedAt: new Date(),
              }
            : c
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const editMessage = (messageId: string, newContent: string) => {
    if (!currentChat) return;

    setChats(prev =>
      prev.map(chat =>
        chat.id === currentChat.id
          ? {
              ...chat,
              messages: chat.messages.map(msg =>
                msg.id === messageId
                  ? newContent
                    ? { ...msg, content: newContent, isEditing: false }
                    : { ...msg, isEditing: !msg.isEditing }
                  : msg
              ),
              updatedAt: new Date(),
            }
          : chat
      )
    );
  };

  const saveApiKey = (apiKey: string) => {
    setAppSettings(prev => ({ ...prev, apiKey }));
  };

  return (
    <div className="h-screen bg-gray-50 flex" dir="rtl">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        settings={chatSettings}
        onSelectChat={selectChat}
        onCreateNewChat={createNewChat}
        onDeleteChat={deleteChat}
        onRenameChat={renameChat}
        onSettingsChange={setChatSettings}
        onOpenApiKeyModal={() => setShowApiKeyModal(true)}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col">
        <ChatInterface
          currentChat={currentChat}
          onSendMessage={sendMessage}
          onEditMessage={editMessage}
          isLoading={isLoading}
          settings={chatSettings}
        />
      </div>

      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        currentApiKey={appSettings.apiKey}
        onSave={saveApiKey}
      />
    </div>
  );
}

export default App;