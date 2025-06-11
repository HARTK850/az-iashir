export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isEditing?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  settings: ChatSettings;
}

export interface ChatSettings {
  style: MusicStyle;
  mood: Mood;
  model: GeminiModel;
}

export interface MusicStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export interface Mood {
  id: string;
  name: string;
  description: string;
  prompt: string;
  color: string;
}

export interface GeminiModel {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
}

export interface AppSettings {
  apiKey: string;
  theme: 'light' | 'dark';
  language: 'he' | 'en';
}