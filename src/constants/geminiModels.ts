import { GeminiModel } from '../types';

export const GEMINI_MODELS: GeminiModel[] = [
  {
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash Experimental',
    description: 'הדור החדש - מהיר ומתקדם',
    maxTokens: 8192
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    description: 'מהיר ויעיל לכתיבת שירים',
    maxTokens: 8192
  },
  {
    id: 'gemini-1.5-flash-8b',
    name: 'Gemini 1.5 Flash 8B',
    description: 'גרסה קלה ומהירה',
    maxTokens: 8192
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    description: 'המודל החזק ביותר לכתיבה יצירתית',
    maxTokens: 32768
  },
  {
    id: 'gemini-1.0-pro',
    name: 'Gemini 1.0 Pro',
    description: 'מודל קלאסי ויציב',
    maxTokens: 8192
  }
];