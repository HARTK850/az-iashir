import { Chat } from '../types';

export function exportChatAsText(chat: Chat): string {
  let content = `שיר: ${chat.title}\n`;
  content += `נוצר בתאריך: ${chat.createdAt.toLocaleDateString('he-IL')}\n`;
  content += `סגנון: ${chat.settings.style.name}\n`;
  content += `מצב רוח: ${chat.settings.mood.name}\n`;
  content += `מודל AI: ${chat.settings.model.name}\n\n`;
  content += '=' + '='.repeat(50) + '\n\n';

  chat.messages.forEach((message, index) => {
    if (message.role === 'user') {
      content += `👤 בקשה ${Math.floor(index / 2) + 1}:\n${message.content}\n\n`;
    } else {
      content += `🎵 שיר:\n${message.content}\n\n`;
      content += '-'.repeat(50) + '\n\n';
    }
  });

  return content;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportChatAsPDF(chat: Chat) {
  const content = exportChatAsText(chat);
  downloadFile(content, `${chat.title}.txt`, 'text/plain');
  // Note: For actual PDF export, we would need a PDF library like jsPDF
  // For now, we're providing text export as a fallback
}

export function exportChatAsWord(chat: Chat) {
  const content = exportChatAsText(chat);
  const htmlContent = content.replace(/\n/g, '<br>');
  const docContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>${chat.title}</title>
        <style>
          body { font-family: 'Arial', sans-serif; direction: rtl; }
          h1 { color: #6366F1; }
        </style>
      </head>
      <body>
        <div>${htmlContent}</div>
      </body>
    </html>
  `;
  downloadFile(docContent, `${chat.title}.doc`, 'application/msword');
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}