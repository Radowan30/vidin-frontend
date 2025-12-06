import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'
import type { VideoHistoryItem, AspectRatio } from '../types'

/**
 * Video History Context - Manages the list of previously generated videos.
 * 
 * Features:
 * - Store video history
 * - Persist to localStorage
 * - Add new videos
 * - Select a video to view
 */

// Context type definition
interface VideoHistoryContextType {
  history: VideoHistoryItem[]
  addToHistory: (videoUrl: string, originalText: string, aspectRatio: AspectRatio) => void
  clearHistory: () => void
  selectedVideo: VideoHistoryItem | null
  selectVideo: (video: VideoHistoryItem | null) => void
}

// Create context
const VideoHistoryContext = createContext<VideoHistoryContextType | undefined>(undefined)

// localStorage key
const HISTORY_STORAGE_KEY = 'vidin-video-history'

// Maximum number of videos to store
const MAX_HISTORY_ITEMS = 50

interface VideoHistoryProviderProps {
  children: ReactNode
}

/**
 * Generate a unique ID for each history item
 */
function generateId(): string {
  return `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * VideoHistoryProvider Component
 * Wraps the app and provides video history functionality.
 */
export function VideoHistoryProvider({ children }: VideoHistoryProviderProps) {
  // Initialize from localStorage
  const [history, setHistory] = useState<VideoHistoryItem[]>(() => {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return []
      }
    }
    return []
  })

  // Currently selected video for viewing
  const [selectedVideo, setSelectedVideo] = useState<VideoHistoryItem | null>(null)

  // Persist to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
  }, [history])

  // Add a new video to history
  const addToHistory = useCallback((videoUrl: string, originalText: string, aspectRatio: AspectRatio) => {
    const newItem: VideoHistoryItem = {
      id: generateId(),
      videoUrl,
      originalText,
      aspectRatio,
      createdAt: new Date().toISOString(),
    }

    setHistory(prev => {
      // Add new item at the beginning
      const updated = [newItem, ...prev]
      // Keep only the last MAX_HISTORY_ITEMS
      return updated.slice(0, MAX_HISTORY_ITEMS)
    })

    // Auto-select the newly added video
    setSelectedVideo(newItem)
  }, [])

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([])
    setSelectedVideo(null)
  }, [])

  // Select a video to view
  const selectVideo = useCallback((video: VideoHistoryItem | null) => {
    setSelectedVideo(video)
  }, [])

  return (
    <VideoHistoryContext.Provider value={{ 
      history, 
      addToHistory, 
      clearHistory, 
      selectedVideo, 
      selectVideo 
    }}>
      {children}
    </VideoHistoryContext.Provider>
  )
}

/**
 * Custom hook to access video history context.
 * Must be used within a VideoHistoryProvider.
 */
export function useVideoHistory() {
  const context = useContext(VideoHistoryContext)
  if (context === undefined) {
    throw new Error('useVideoHistory must be used within a VideoHistoryProvider')
  }
  return context
}

