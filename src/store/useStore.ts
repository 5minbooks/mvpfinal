import { create } from 'zustand';
import type { Summary, User } from '../types';

interface Store {
  summaries: Summary[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  toggleBookmark: (summaryId: string) => void;
  bookmarkedSummaries: Set<string>;
}

export const useStore = create<Store>((set) => ({
  summaries: [
    {
      id: '1',
      title: 'Atomic Habits',
      author: 'James Clear',
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000',
      type: 'book',
      duration: 15,
      category: 'Personal Development',
      description: 'Learn how tiny changes can lead to remarkable results.',
      progress: 0,
    },
    {
      id: '2',
      title: 'Deep Work',
      author: 'Cal Newport',
      coverUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000',
      type: 'book',
      duration: 12,
      category: 'Productivity',
      description: 'Rules for focused success in a distracted world.',
      progress: 30,
    },
    {
      id: '3',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      coverUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1000',
      type: 'book',
      duration: 18,
      category: 'Business',
      description: 'Timeless lessons on wealth, greed, and happiness.',
      progress: 65,
    },
    {
      id: '4',
      title: 'Masters of Scale',
      author: 'Reid Hoffman',
      coverUrl: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=1000',
      type: 'podcast',
      duration: 20,
      category: 'Business',
      description: 'How successful companies grow from zero to a gazillion.',
      progress: 45,
    },
  ],
  currentUser: {
    id: '1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
    plan: 'free',
    streakDays: 5,
    xp: 1250,
  },
  setCurrentUser: (user) => set({ currentUser: user }),
  bookmarkedSummaries: new Set<string>(),
  toggleBookmark: (summaryId) =>
    set((state) => {
      const newBookmarks = new Set(state.bookmarkedSummaries);
      if (newBookmarks.has(summaryId)) {
        newBookmarks.delete(summaryId);
      } else {
        newBookmarks.add(summaryId);
      }
      return { bookmarkedSummaries: newBookmarks };
    }),
}));