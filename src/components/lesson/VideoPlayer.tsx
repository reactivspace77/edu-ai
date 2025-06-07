import React, { useState } from 'react';
import { Play, Pause, SkipBack, Volume2, User } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  instructorName: string;
  transcript: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, instructorName, transcript }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  // For MVP we'll use a placeholder
  const videoPlaceholder = !videoUrl || videoUrl === 'placeholder';

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-video bg-gray-900">
        {videoPlaceholder ? (
          // Placeholder with avatar
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-900 to-purple-900">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-indigo-600" />
              </div>
              <h4 className="text-white text-lg font-medium">Instructor Virtual</h4>
            </div>
          </div>
        ) : (
          // Actual video player
          <video
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          ></video>
        )}
        
        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="p-2 bg-white rounded-full text-gray-800 hover:text-indigo-600 transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button
                className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors"
              >
                <SkipBack className="h-4 w-4" />
              </button>
              <div className="text-white text-sm">00:00 / 25:00</div>
            </div>
            
            <div>
              <button
                className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-indigo-600" />
            </div>
            <h4 className="ml-2 text-sm font-medium text-gray-900">{instructorName}</h4>
          </div>
          
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
              onClick={() => setIsPlaying(true)}
            >
              Reia
            </button>
            <button
              className={`px-3 py-1 text-xs font-medium rounded-md ${
                showTranscript 
                  ? 'text-white bg-indigo-600 hover:bg-indigo-700' 
                  : 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
              } transition-colors`}
              onClick={() => setShowTranscript(!showTranscript)}
            >
              Transcript
            </button>
          </div>
        </div>
        
        {showTranscript && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md max-h-40 overflow-y-auto">
            <p className="text-sm text-gray-600 leading-relaxed">
              {transcript || "Transcriptul lecției nu este disponibil momentan."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;