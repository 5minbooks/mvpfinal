export interface Summary {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  type: 'book' | 'podcast';
  duration: number;
  category: string;
  description: string;
  progress: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'free' | 'premium';
  streakDays: number;
  xp: number;
}