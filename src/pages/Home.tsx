import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { ProgressBar } from '../components/ProgressBar';
import { SummaryCard } from '../components/SummaryCard';
import { TrendingUp, BookOpen, Headphones, Clock, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Home() {
  const summaries = useStore((state) => state.summaries);
  const [activeFilter, setActiveFilter] = useState<'all' | 'books' | 'podcasts'>('all');

  const filteredSummaries = summaries.filter(summary => 
    activeFilter === 'all' ? true : summary.type === activeFilter.slice(0, -1)
  );

  const categories = ['Personal Development', 'Business', 'Psychology', 'Productivity'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProgressBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Featured Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Today</h2>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeFilter === 'all' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter('books')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                  activeFilter === 'books' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Books</span>
              </button>
              <button 
                onClick={() => setActiveFilter('podcasts')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                  activeFilter === 'podcasts' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Headphones className="h-4 w-4" />
                <span>Podcasts</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSummaries.map((summary) => (
              <SummaryCard key={summary.id} summary={summary} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="relative group overflow-hidden rounded-xl aspect-[2/1] bg-gradient-to-br from-indigo-600 to-purple-600"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="relative h-full flex flex-col justify-center items-center text-white p-4">
                  <h3 className="text-lg font-semibold text-center">{category}</h3>
                  <p className="text-sm opacity-80">12 summaries</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Quick Reads Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900">Quick Reads</h2>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredSummaries.slice(0, 4).map((summary) => (
              <div
                key={summary.id}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={summary.coverUrl}
                  alt={summary.title}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-gray-900 mb-1">{summary.title}</h3>
                <p className="text-sm text-gray-500">{summary.author}</p>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{summary.duration} min read</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}