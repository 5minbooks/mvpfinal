import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  duration: number;
}

export function AudioPlayer({ audioUrl, duration }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-center space-x-6">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime -= 10;
            }}
          >
            <SkipBack className="h-6 w-6 text-gray-600" />
          </button>

          <button
            onClick={togglePlay}
            className="p-4 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 text-white" />
            ) : (
              <Play className="h-8 w-8 text-white" />
            )}
          </button>

          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime += 10;
            }}
          >
            <SkipForward className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 w-12">
            {formatTime(currentTime)}
          </span>
          
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <span className="text-sm text-gray-500 w-12">
            {formatTime(duration)}
          </span>

          <button
            onClick={toggleMute}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-gray-600" />
            ) : (
              <Volume2 className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}