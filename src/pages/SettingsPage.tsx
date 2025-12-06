import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Settings,
  CheckCircle,
  Trash2,
  Bell,
  Palette,
  Globe,
  Volume2,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { useVideoHistory } from "../context/VideoHistoryContext";

/**
 * SettingsPage Component
 *
 * Settings page for configuring app preferences.
 * These are mock settings that can be implemented in the final version.
 */

export default function SettingsPage() {
  const { showToast } = useToast();
  const { history, clearHistory } = useVideoHistory();

  // Mock settings state
  const [autoPlay, setAutoPlay] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [videoQuality, setVideoQuality] = useState("high");
  const [language, setLanguage] = useState("en");
  const [isSaved, setIsSaved] = useState(false);

  // Handle save
  const handleSave = () => {
    setIsSaved(true);
    showToast("success", "Settings saved successfully!");

    // Reset saved indicator after 2 seconds
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Handle clear history
  const handleClearHistory = () => {
    if (history.length === 0) {
      showToast("info", "No video history to clear");
      return;
    }

    clearHistory();
    showToast(
      "success",
      `Cleared ${history.length} video${
        history.length > 1 ? "s" : ""
      } from history`
    );
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-start justify-center">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with back button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
                       hover:text-primary-500 dark:hover:text-primary-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Configure your VidIn preferences
          </p>
        </motion.div>

        {/* Settings form */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Coming Soon Notice */}
          <div className="panel bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/50 
                              flex items-center justify-center flex-shrink-0"
              >
                <Settings className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Settings Preview
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  These settings can be fully implemented in the final version
                  of the app
                </p>
              </div>
            </div>
          </div>

          {/* Video Playback Section */}
          <div className="panel">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 
                              flex items-center justify-center flex-shrink-0"
              >
                <Volume2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Video Playback
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Configure how videos play in the preview panel
                </p>

                <div className="space-y-4">
                  {/* Auto-play toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">
                        Auto-play videos
                      </p>
                      <p className="text-sm text-gray-500">
                        Automatically play videos when generated
                      </p>
                    </div>
                    <button
                      onClick={() => setAutoPlay(!autoPlay)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        autoPlay
                          ? "bg-primary-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ left: autoPlay ? "28px" : "4px" }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    </button>
                  </div>

                  {/* Video quality dropdown */}
                  <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Video Quality
                    </label>
                    <select
                      value={videoQuality}
                      onChange={(e) => setVideoQuality(e.target.value)}
                      className="input-field"
                    >
                      <option value="low">Low (480p)</option>
                      <option value="medium">Medium (720p)</option>
                      <option value="high">High (1080p)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="panel">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 
                              flex items-center justify-center flex-shrink-0"
              >
                <Bell className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Notifications
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Manage notification preferences
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      Enable notifications
                    </p>
                    <p className="text-sm text-gray-500">
                      Get notified when video generation completes
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications
                        ? "bg-primary-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                      animate={{ left: notifications ? "28px" : "4px" }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Language Section */}
          <div className="panel">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 
                              flex items-center justify-center flex-shrink-0"
              >
                <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Language & Region
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Set your preferred language for the interface
                </p>

                <div>
                  <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interface Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="input-field"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="panel">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 
                              flex items-center justify-center flex-shrink-0"
              >
                <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Appearance
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Theme is controlled via the toggle in the navbar. Additional
                  appearance customizations can be added in future versions.
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <motion.button
            onClick={handleSave}
            className="btn-primary w-full flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSaved ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Settings</span>
              </>
            )}
          </motion.button>

          {/* Video History Section */}
          <div className="panel">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 
                              flex items-center justify-center flex-shrink-0"
              >
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Video History
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  You have {history.length} video
                  {history.length !== 1 ? "s" : ""} in your history. Clear all
                  to start fresh.
                </p>

                <motion.button
                  onClick={handleClearHistory}
                  disabled={history.length === 0}
                  className={`btn-secondary flex items-center gap-2 
                    text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
                    ${
                      history.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  whileHover={history.length > 0 ? { scale: 1.02 } : {}}
                  whileTap={history.length > 0 ? { scale: 0.98 } : {}}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All History</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* App Info Section */}
          <div className="panel">
            <div className="text-center text-sm text-gray-500">
              <p className="gradient-text font-display font-bold text-xl mb-2">
                VidIn
              </p>
              <p>Transform your LinkedIn posts into scroll-stopping videos</p>
              <p className="mt-2 text-xs">
                Built with React, TypeScript, and Tailwind CSS
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
