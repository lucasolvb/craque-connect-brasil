
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Info } from 'lucide-react';

interface VideoPlayerProps {
  videos: string[];
  videoDescriptions?: string[];
  positions?: string[];
  playerName: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videos, 
  videoDescriptions = [], 
  positions = [],
  playerName 
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const nextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsPlaying(false);
    }
  };

  const prevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setIsPlaying(false);
    }
  };

  const currentVideo = videos[currentVideoIndex];
  const currentDescription = videoDescriptions[currentVideoIndex] || '';
  const currentPosition = positions[currentVideoIndex] || '';

  return (
    <Card className="overflow-hidden shadow-xl border-0">
      <div className="relative bg-black">
        {/* Video Element */}
        <video
          ref={videoRef}
          src={currentVideo}
          className="w-full aspect-video"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          {/* Top Info Bar */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-600 text-white">
                Vídeo {currentVideoIndex + 1} de {videos.length}
              </Badge>
              {currentPosition && (
                <Badge variant="outline" className="bg-black/50 text-white border-white/30">
                  {currentPosition}
                </Badge>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-xl"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              {/* Left Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={prevVideo}
                  disabled={currentVideoIndex === 0}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={nextVideo}
                  disabled={currentVideoIndex === videos.length - 1}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Right Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={handleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={handleFullscreen}
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info Panel */}
      {showInfo && (
        <CardContent className="p-4 bg-gray-50 border-t">
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">
              {playerName} - Vídeo {currentVideoIndex + 1}
            </h4>
            {currentPosition && (
              <p className="text-sm text-gray-600">
                <strong>Posição:</strong> {currentPosition}
              </p>
            )}
            {currentDescription && (
              <p className="text-sm text-gray-600">
                <strong>Descrição:</strong> {currentDescription}
              </p>
            )}
          </div>
        </CardContent>
      )}

      {/* Video Thumbnails Navigation */}
      {videos.length > 1 && (
        <CardContent className="p-4 border-t">
          <div className="flex space-x-3 overflow-x-auto">
            {videos.map((video, index) => (
              <button
                key={index}
                className={`flex-shrink-0 w-20 h-12 rounded overflow-hidden border-2 transition-all ${
                  index === currentVideoIndex 
                    ? 'border-green-600 shadow-lg' 
                    : 'border-gray-200 hover:border-green-400'
                }`}
                onClick={() => {
                  setCurrentVideoIndex(index);
                  setIsPlaying(false);
                }}
              >
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white" />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default VideoPlayer;
