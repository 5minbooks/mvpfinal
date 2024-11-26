import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Clock, PlayCircle } from 'lucide-react';
import type { Summary } from '../types';
import { useStore } from '../store/useStore';

interface SummaryCardProps {
  summary: Summary;
}

export function SummaryCard({ summary }: SummaryCardProps) {
  const toggleBookmark = useStore((state) => state.toggleBookmark);
  const bookmarkedSummaries = useStore((state) => state.bookmarkedSummaries);
  const isBookmarked = bookmarkedSummaries.has(summary.id);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:scale-[1.02] hover:shadow-md group">
      <div className="relative h-48">
        <img
          src={summary.coverUrl}
          alt={summary.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleBookmark(summary.id);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
        >
          <Bookmark
            className={`h-5 w-5 ${
              isBookmarked ? 'fill-accent-sand text-accent-sand' : 'text-white'
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-lighter/20 text-primary">
            {summary.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {summary.duration} min
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {summary.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{summary.description}</p>

        {summary.progress > 0 && (
          <div className="mb-4">
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${summary.progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {summary.progress}% completed
            </span>
          </div>
        )}

        <Link 
          to={`/book/${summary.id}`}
          className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-light transition-colors"
        >
          <PlayCircle className="h-5 w-5" />
          <span>Start Learning</span>
        </Link>
      </div>
    </div>
  );
}