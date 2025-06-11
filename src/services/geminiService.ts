import { GeminiModel } from '../types';

export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateSong(
    prompt: string,
    model: GeminiModel,
    style: string,
    mood: string
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API key is required');
    }

    const fullPrompt = `
      ${style}
      ${mood}
      
      הנחיות כלליות:
      - כתוב שיר בעברית באיכות גבוהה
      - הקפד על חרוזים וקצב
      - הוסף מבנה ברור: בתים, פזמון, גשר
      - הקפד על רגש ותוכן איכותי
      - אל תוסיף הסברים או הערות, רק את השיר עצמו
      
      בקשת המשתמש: ${prompt}
    `;

    try {
      const response = await fetch(
        `${this.baseUrl}/models/${model.id}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: fullPrompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.8,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: model.maxTokens,
            },
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to generate song');
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'שגיאה ביצירת השיר';
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }
}