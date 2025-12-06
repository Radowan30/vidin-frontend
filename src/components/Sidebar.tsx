import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Trash2, Video } from "lucide-react";
import { useSidebar } from "../hooks/useSidebar";
import { useVideoHistory } from "../context/VideoHistoryContext";

/**
 * Sidebar Component
 *
 * Slides in from the right to show previously generated videos.
 * Allows users to select a previous video to view it again.
 */

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const { history, selectVideo, selectedVideo, clearHistory } =
    useVideoHistory();

  // Format date for display
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Truncate text for preview
  const truncateText = (text: string, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Sidebar panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 
                       glass-card border-l border-gray-200 dark:border-gray-700
                       flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-500" />
                <h2 className="font-display font-semibold text-lg text-gray-900 dark:text-gray-100">
                  Video History
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {/* Clear history button */}
                {history.length > 0 && (
                  <motion.button
                    onClick={clearHistory}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-500 
                               hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Clear all history"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                )}

                {/* Close button */}
                <motion.button
                  onClick={closeSidebar}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 
                             dark:hover:text-gray-300 hover:bg-gray-100 
                             dark:hover:bg-gray-800 transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Video list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {history.length === 0 ? (
                // Empty state
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div
                    className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 
                                  flex items-center justify-center mb-4"
                  >
                    <Video className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    No videos yet
                  </h3>
                  <p className="text-sm text-gray-500">
                    Your generated videos will appear here in the final app
                  </p>
                </div>
              ) : (
                // Video items
                history.map((video, index) => (
                  <motion.button
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      selectVideo(video);
                      closeSidebar();
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200
                      ${
                        selectedVideo?.id === video.id
                          ? "bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-700"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Video thumbnail placeholder */}
                      <div
                        className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 
                                      dark:from-primary-900/40 dark:to-accent-900/40
                                      flex items-center justify-center flex-shrink-0"
                      >
                        <Video className="w-6 h-6 text-primary-500" />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Text preview */}
                        <p
                          className="text-sm font-medium text-gray-900 dark:text-gray-100 
                                      line-clamp-2 mb-1"
                        >
                          {truncateText(video.originalText)}
                        </p>

                        {/* Metadata */}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700">
                            {video.aspectRatio}
                          </span>
                          <span>{formatDate(video.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
