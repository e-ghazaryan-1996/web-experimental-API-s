import { DocumentPictureInPictureWindow } from "global";
import { useState, useEffect, useCallback, useRef } from "react";

export function useVideoPlayer() {
  const [isPiPSupported, setIsPiPSupported] = useState(false);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const pipWindowRef = useRef<DocumentPictureInPictureWindow | null>(null);
  const pipVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    try {
      const isTopLevel = window.self === window.top;
      const hasDocumentPiP = "documentPictureInPicture" in window && isTopLevel;
      const hasStandardPiP = document.pictureInPictureEnabled;
      setIsPiPSupported(hasDocumentPiP || hasStandardPiP);
    } catch (err) {
      console.error("PiP support check failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cleanupPiP = useCallback(() => {
    try {
      if (pipVideoRef.current) {
        pipVideoRef.current.remove();
        pipVideoRef.current = null;
      }
      if (pipWindowRef.current) {
        pipWindowRef.current.close();
        pipWindowRef.current = null;
      }
      setIsPiPActive(false);
    } catch (err) {
      console.error("Failed to cleanup PiP:", err);
    }
  }, []);

  useEffect(() => cleanupPiP, [cleanupPiP]);

  const ensureVideoLoaded = useCallback(async () => {
    if (!videoRef.current) return;

    if (videoRef.current.readyState === 0) {
      await new Promise((resolve) => {
        videoRef.current?.addEventListener("loadedmetadata", resolve, {
          once: true,
        });
      });
    }
  }, []);

  const togglePlay = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      if (isPlaying) {
        videoRef.current.pause();
        if (pipVideoRef.current) pipVideoRef.current.pause();
      } else {
        await ensureVideoLoaded();

        const playPromise = videoRef.current.play();
        if (playPromise) {
          await playPromise.catch((err) => {
            console.error("Failed to play video:", err);
            setError("Failed to play video. Ensure user interaction first.");
            setIsPlaying(false);
          });
        }
        if (pipVideoRef.current) {
          pipVideoRef.current.play().catch(console.error);
        }
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error("Failed to toggle play state:", err);
      setError("Toggle play failed.");
    }
  }, [isPlaying, ensureVideoLoaded]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      if (pipVideoRef.current) pipVideoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  }, [isMuted]);

  const setupPiPWindow = useCallback(
    async (pipWindow: DocumentPictureInPictureWindow) => {
      if (!videoRef.current) return;

      try {
        const pipVideo = videoRef.current.cloneNode(true) as HTMLVideoElement;
        pipVideoRef.current = pipVideo;

        await ensureVideoLoaded();

        pipVideo.currentTime = videoRef.current.currentTime;
        pipVideo.muted = isMuted;

        const style = document.createElement("style");
        style.textContent = `
          body { 
            margin: 0; 
            background: black;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        `;
        pipWindow.document.head.append(style);
        pipWindow.document.body.append(pipVideo);

        if (isPlaying) {
          await pipVideo.play();
        }

        pipVideo.addEventListener("play", () => setIsPlaying(true));
        pipVideo.addEventListener("pause", () => setIsPlaying(false));
        pipVideo.addEventListener("volumechange", () =>
          setIsMuted(pipVideo.muted)
        );

        pipWindow.addEventListener("pagehide", () => cleanupPiP());
      } catch (err) {
        console.error("Failed to setup PiP window:", err);
        throw new Error("Setup failed. Ensure user interaction.");
      }
    },
    [isPlaying, isMuted, ensureVideoLoaded, cleanupPiP]
  );

  const togglePiP = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      setError(null);

      if (!isPiPActive) {
        if ("documentPictureInPicture" in window) {
          await ensureVideoLoaded();

          const pipWindow = await window.documentPictureInPicture
            .requestWindow({ width: 400, height: 300 })
            .catch(() => {
              throw new Error("PiP request failed.");
            });

          pipWindowRef.current = pipWindow;
          await setupPiPWindow(pipWindow);
          setIsPiPActive(true);
        } else if (document.pictureInPictureEnabled) {
          await videoRef.current.requestPictureInPicture();
          setIsPiPActive(true);

          videoRef.current.addEventListener(
            "leavepictureinpicture",
            () => setIsPiPActive(false),
            { once: true }
          );
        } else {
          throw new Error("PiP not supported.");
        }
      } else {
        await cleanupPiP();
      }
    } catch (err) {
      console.error(err);
      setError("");
    }
  }, [isPiPActive, setupPiPWindow, ensureVideoLoaded, cleanupPiP]);

  return {
    videoRef,
    isPiPSupported,
    isPiPActive,
    isPlaying,
    isMuted,
    isLoading,
    setIsLoading,
    error,
    togglePlay,
    toggleMute,
    togglePiP,
  };
}
