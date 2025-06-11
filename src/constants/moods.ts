import { Mood } from '../types';

export const MOODS: Mood[] = [
  {
    id: 'happy',
    name: 'שמח',
    description: 'שמחה ואופטימיות',
    prompt: 'כתוב שיר עם רגש שמח ואופטימי',
    color: '#FFD700'
  },
  {
    id: 'sad',
    name: 'עצוב',
    description: 'עצב ונוסטלגיה',
    prompt: 'כתוב שיר עם רגש עצוב ומלנכולי',
    color: '#6366F1'
  },
  {
    id: 'romantic',
    name: 'רומנטי',
    description: 'אהבה ורומנטיקה',
    prompt: 'כתוב שיר רומנטי על אהבה',
    color: '#EC4899'
  },
  {
    id: 'energetic',
    name: 'אנרגטי',
    description: 'אנרגיה וכוח',
    prompt: 'כתוב שיר אנרגטי ומלא כוח',
    color: '#EF4444'
  },
  {
    id: 'peaceful',
    name: 'רגוע',
    description: 'שלווה ורוגע',
    prompt: 'כתוב שיר רגוע ומרגיע',
    color: '#10B981'
  },
  {
    id: 'inspiring',
    name: 'מעורר השראה',
    description: 'השראה ומוטיבציה',
    prompt: 'כתוב שיר מעורר השראה ומוטיבציה',
    color: '#F59E0B'
  },
  {
    id: 'nostalgic',
    name: 'נוסטלגי',
    description: 'געגועים וזיכרונות',
    prompt: 'כתוב שיר נוסטלגי על זיכרונות יפים',
    color: '#8B5CF6'
  },
  {
    id: 'rebellious',
    name: 'מרדני',
    description: 'מרד ומחאה',
    prompt: 'כתוב שיר מרדני עם מסר חברתי',
    color: '#DC2626'
  }
];