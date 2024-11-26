import React from 'react';
import { Trophy, Flame, Target, Gift } from 'lucide-react';
import { useStore } from '../store/useStore';

export function ProgressBar() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <div className="bg-gradient-to-r from-primary via-primary-light to-primary-lighter bg-[length:200%_100%] animate-gradient text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Trophy className="h-6 w-6 mr-2 text-accent-sand" />
              <div>
                <span className="font-medium text-lg">{currentUser?.streakDays}</span>
                <span className="ml-1 text-sm opacity-90">Day Streak!</span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              <div>
                <span className="text-sm opacity-90">Daily Goal</span>
                <div className="w-32 h-2.5 bg-white/20 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: '75%' }}
                  >
                    <div className="h-full w-full bg-gradient-to-r from-accent-sand to-accent-coral" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Flame className="h-5 w-5 mr-2 text-accent-coral" />
              <span className="font-medium">{currentUser?.xp} XP</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Gift className="h-5 w-5 text-accent-sand" />
            <span className="text-sm">Unlock all features with Premium</span>
            <button className="px-4 py-1.5 bg-white text-primary rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors shadow-sm hover:shadow">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}