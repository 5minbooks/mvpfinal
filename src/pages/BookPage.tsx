import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, BookOpen, Clock, Share2, Bookmark } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ProgressBar } from '../components/ProgressBar';
import { AudioPlayer } from '../components/AudioPlayer';
import { useStore } from '../store/useStore';

export function BookPage() {
  const { id } = useParams();
  const summaries = useStore((state) => state.summaries);
  const toggleBookmark = useStore((state) => state.toggleBookmark);
  const bookmarkedSummaries = useStore((state) => state.bookmarkedSummaries);
  
  const summary = summaries.find((s) => s.id === id);
  
  if (!summary) {
    return <div>Summary not found</div>;
  }

  const isBookmarked = bookmarkedSummaries.has(summary.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProgressBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <li>
              <Link to="/library" className="text-gray-500 hover:text-gray-700">
                Library
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <li className="text-gray-900 font-medium" aria-current="page">
              {summary.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Book Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {summary.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">
                    by {summary.author}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {summary.category}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {summary.duration} min read
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleBookmark(summary.id)}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Bookmark className={`h-5 w-5 ${
                      isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                    }`} />
                  </button>
                  <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="prose prose-indigo max-w-none">
                <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {summary.description}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                  aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse 
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                  cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                  anim id est laborum.
                </p>
              </div>
            </div>

            {/* Audio Player */}
            <AudioPlayer 
              audioUrl="https://example.com/sample-audio.mp3"
              duration={summary.duration * 60}
            />
          </div>

          {/* Right Column - Cover Image & Progress */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <img
                  src={summary.coverUrl}
                  alt={summary.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{summary.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${summary.progress}%` }}
                      />
                    </div>
                  </div>
                  <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}