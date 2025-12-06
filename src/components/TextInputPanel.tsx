import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { useVideoGeneration } from "../context/VideoGenerationContext";
import AspectRatioSelect from "./AspectRatioSelect";
import type { AspectRatio } from "../types";

/**
 * TextInputPanel Component
 *
 * Left panel of the main page containing:
 * - Hero text to encourage users
 * - Textarea for entering LinkedIn post text
 * - Aspect ratio selector
 * - Generate button with loading state
 */

export default function TextInputPanel() {
  // Text input state
  const [text, setText] = useState("");

  // Selected aspect ratio
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");

  // Video generation hook (shared via context)
  const { generateVideo, isLoading } = useVideoGeneration();

  // Handle form submission
  const handleGenerate = async () => {
    if (!text.trim() || isLoading) return;
    await generateVideo(text, aspectRatio);
  };

  // Handle keyboard shortcut (Ctrl/Cmd + Enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleGenerate();
    }
  };

  // Character count
  const charCount = text.length;
  const maxChars = 3000;

  return (
    <motion.div
      className="panel h-full flex flex-col"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero section */}
      <div className="mb-6">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold mb-3
                     text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Turn your LinkedIn posts into{" "}
          <span className="gradient-text">scroll-stopping videos</span>
        </motion.h2>

        <motion.p
          className="text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Paste your text below and let AI transform it into an engaging video
        </motion.p>
      </div>

      {/* Textarea container */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="relative flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, maxChars))}
            onKeyDown={handleKeyDown}
            placeholder="Paste your LinkedIn post text here...

Example:
🚀 Just shipped a new feature that our users have been asking for!

Here's what I learned:

1. Listen to your customers
2. Ship fast, iterate faster
3. Celebrate small wins

What's the best advice you've received about product development?"
            className="textarea-field h-full font-body"
            disabled={isLoading}
          />

          {/* Character count */}
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {charCount}/{maxChars}
          </div>
        </div>

        {/* Recommendation note */}
        <p className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">
          💡 A text length of around 300 words is advised to achieve the best
          results
        </p>

        {/* Aspect ratio and generate button row */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Aspect ratio selector */}
          <div className="flex-shrink-0">
            <AspectRatioSelect
              value={aspectRatio}
              onChange={setAspectRatio}
              disabled={isLoading}
            />
          </div>

          {/* Generate button */}
          <motion.button
            onClick={handleGenerate}
            disabled={isLoading || !text.trim()}
            className="btn-primary flex items-center justify-center gap-2 flex-1 sm:flex-none"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Video</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Keyboard shortcut hint */}
        <p className="mt-3 text-xs text-gray-500 text-center sm:text-left">
          Press{" "}
          <kbd
            className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 
                              border border-gray-200 dark:border-gray-700 font-mono text-xs"
          >
            Ctrl
          </kbd>{" "}
          +{" "}
          <kbd
            className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 
                                   border border-gray-200 dark:border-gray-700 font-mono text-xs"
          >
            Enter
          </kbd>{" "}
          to generate
        </p>
      </div>
    </motion.div>
  );
}
