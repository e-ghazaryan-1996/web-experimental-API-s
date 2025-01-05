"use client";

import {
  Loader2,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useVideoPlayer } from "@/shared/hooks/useVideoPlayer";

const PictureInPicturePlayer = () => {
  const {
    videoRef,
    isPiPSupported,
    isPiPActive,
    isPlaying,
    isMuted,
    isLoading,
    error,
    setIsLoading,
    togglePlay,
    toggleMute,
    togglePiP,
  } = useVideoPlayer();

  // Fallback for unsupported PiP
  const unsupportedMessage =
    "⚠️ Your browser doesn't support the Document Picture-in-Picture API yet.";

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden">
      <CardContent className="p-0">
        <div className="relative bg-black">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
          <video
            ref={videoRef}
            className="w-full aspect-video"
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            poster="/placeholder.svg?height=400&width=600"
            playsInline
            onLoadedData={() => setIsLoading(false)}
            onError={(e) => {
              setIsLoading(false);
              console.error("Video error:", e);
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex flex-col gap-2">
              {error && (
                <div className="px-3 py-1 text-sm text-red-200 bg-red-500/20 rounded-md">
                  {error}
                </div>
              )}
              <div className="flex items-center justify-between gap-4">
                {/* Play/Pause Button */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-white/20"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>

                  {/* Mute/Unmute Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-white/20"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                </div>

                {/* Picture-in-Picture Button */}
                {isPiPSupported && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-white/20"
                    onClick={togglePiP}
                    aria-label={
                      isPiPActive
                        ? "Exit Picture-in-Picture mode"
                        : "Enter Picture-in-Picture mode"
                    }
                  >
                    {isPiPActive ? (
                      <Minimize2 className="w-5 h-5" />
                    ) : (
                      <Maximize2 className="w-5 h-5" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Description */}
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">
            Document Picture-in-Picture Demo
          </h2>
          <p className="text-muted-foreground">
            This demo showcases the new Document Picture-in-Picture API,
            allowing you to pop out the video player into a floating window. The
            floating window maintains custom controls and styling.
          </p>
          {!isPiPSupported && (
            <span className="block mt-2 text-destructive">
              {unsupportedMessage}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PictureInPicturePlayer;
