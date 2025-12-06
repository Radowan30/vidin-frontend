import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Play, CheckCircle } from "lucide-react";
import { useVideoHistory } from "../context/VideoHistoryContext";
import { useVideoGeneration } from "../context/VideoGenerationContext";
import type { AspectRatio } from "../types";

/**
 * VideoPanel Component
 *
 * Right panel of the main page containing:
 * - Progress bar during generation
 * - Video player with controls when complete
 * - Download button
 * - Placeholder when no video is loaded
 */

// Calculate CSS aspect ratio from string
const getAspectRatioStyle = (ratio: AspectRatio): string => {
  switch (ratio) {
    case "1:1":
      return "1 / 1";
    case "9:16":
      return "9 / 16";
    case "16:9":
      return "16 / 9";
    default:
      return "1 / 1";
  }
};

// Get max dimensions based on aspect ratio
const getMaxDimensions = (
  ratio: AspectRatio
): { maxWidth: string; maxHeight: string } => {
  switch (ratio) {
    case "1:1":
      return { maxWidth: "400px", maxHeight: "400px" };
    case "9:16":
      return { maxWidth: "280px", maxHeight: "500px" };
    case "16:9":
      return { maxWidth: "560px", maxHeight: "315px" };
    default:
      return { maxWidth: "400px", maxHeight: "400px" };
  }
};

export default function VideoPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get selected video from history or current generation
  const { selectedVideo } = useVideoHistory();
  const {
    videoUrl: generatedUrl,
    isLoading,
    progress,
    progressMessage,
  } = useVideoGeneration();

  // Use selected video or the latest generated URL
  const videoUrl = selectedVideo?.videoUrl || generatedUrl;
  const aspectRatio = selectedVideo?.aspectRatio || "1:1";

  // Show success animation when video loads
  useEffect(() => {
    if (videoUrl && isVideoLoaded) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [videoUrl, isVideoLoaded]);

  // Reset loaded state when URL changes
  useEffect(() => {
    setIsVideoLoaded(false);
  }, [videoUrl]);

  // Handle video download
  const handleDownload = async () => {
    if (!videoUrl) return;

    try {
      // Fetch the video as a blob
      const response = await fetch(videoUrl);
      const blob = await response.blob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vidin-video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(videoUrl, "_blank");
    }
  };

  const dimensions = getMaxDimensions(aspectRatio);

  return (
    <motion.div
      className="panel h-full flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-gray-100">
          Video Preview
        </h3>

        {/* Success indicator */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1.5 text-green-600 dark:text-green-400"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Video ready!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video container */}
      <div
        className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800/50 
                      rounded-xl overflow-hidden relative min-h-[300px]"
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Progress bar state
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center p-8 w-full"
            >
              {/* Progress percentage */}
              <motion.div
                className="text-6xl font-display font-bold gradient-text mb-4"
                key={progress}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {progress}%
              </motion.div>

              {/* Progress bar container */}
              <div className="w-full max-w-xs mb-4">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Progress message */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {progressMessage || "Generating your video..."}
              </p>

              {/* Animated dots */}
              <div className="flex gap-1 mt-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary-500"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ) : videoUrl ? (
            // Video player
            <motion.div
              key="video"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full h-full flex items-center justify-center p-4"
            >
              <div
                className="relative rounded-lg overflow-hidden shadow-2xl bg-black"
                style={{
                  aspectRatio: getAspectRatioStyle(aspectRatio),
                  maxWidth: dimensions.maxWidth,
                  maxHeight: dimensions.maxHeight,
                  width: "100%",
                }}
              >
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  className="w-full h-full object-contain"
                  onLoadedData={() => setIsVideoLoaded(true)}
                  onError={() => setIsVideoLoaded(false)}
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          ) : (
            // Empty state placeholder
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center p-8"
            >
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 
                           dark:from-gray-700 dark:to-gray-600
                           flex items-center justify-center mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Play className="w-8 h-8 text-gray-400 dark:text-gray-500 ml-1" />
              </motion.div>

              <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-2">
                Your video preview will appear here
              </h4>
              <p className="text-sm text-gray-500 max-w-xs">
                Enter your text on the left and click "Generate Video" to create
                your content
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Download button (shown when video is available) */}
      <AnimatePresence>
        {videoUrl && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4"
          >
            {/* Download button - full width */}
            <motion.button
              onClick={handleDownload}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              <span className="font-medium">Download Video</span>
            </motion.button>

            {/* Format badge */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-sm text-gray-500">Format:</span>
              <span
                className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 
                             text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {aspectRatio}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
