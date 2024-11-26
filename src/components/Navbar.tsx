import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Headphones, Search, Bell, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Navbar() {
  const currentUser = useStore((state) => state.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <BookOpen className="h-8 w-8 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LearnBite
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search summaries..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 group-hover:bg-white transition-colors"
              />
            </div>

            <Link 
              to="/library" 
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Headphones className="h-5 w-5" />
              <span>Library</span>
            </Link>

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-600">
                    <p>New summary: "The Psychology of Money" is now available!</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="h-8 w-8 rounded-full ring-2 ring-white"
              />
              <div className="text-sm">
                <p className="font-medium text-gray-900">{currentUser?.name}</p>
                <p className="text-indigo-600 font-medium">{currentUser?.xp} XP</p>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search summaries..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
              />
            </div>
            <Link
              to="/library"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Library
            </Link>
            <Link
              to="/notifications"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Notifications
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}