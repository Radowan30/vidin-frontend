/**
 * Type definitions for VidIn application
 */

// Aspect ratio options for video generation
export type AspectRatio = '1:1' | '9:16' | '16:9';

// Video history item stored in localStorage
export interface VideoHistoryItem {
  id: string;                    // Unique identifier
  videoUrl: string;              // URL of the generated video
  originalText: string;          // The LinkedIn post text used to generate
  aspectRatio: AspectRatio;      // Aspect ratio used for generation
  createdAt: string;             // ISO timestamp of when it was created
  thumbnail?: string;            // Optional thumbnail URL
}

// Request body for generating a video
export interface GenerateVideoRequest {
  text: string;                  // The LinkedIn post text
  aspectRatio: AspectRatio;      // Selected aspect ratio
}

// Response from the backend when starting video generation
export interface GenerateVideoResponse {
  jobId: string;                 // Job ID for tracking progress
  status: JobStatus;             // Current job status
  progress: number;              // Progress percentage (0-100)
  message: string;               // Status message
}

// Job status types
export type JobStatus = 'pending' | 'processing' | 'complete' | 'error';

// Progress update from SSE stream
export interface ProgressUpdate {
  jobId: string;
  status: JobStatus;
  progress: number;              // 0-100
  message: string;
  videoUrl?: string;             // Available when status is 'complete'
  error?: string;                // Available when status is 'error'
}

// Theme type for light/dark mode
export type Theme = 'light' | 'dark';

// Settings stored in localStorage
export interface AppSettings {
  theme: Theme;                  // Current theme
}

// Toast notification types
export type ToastType = 'success' | 'error' | 'info' | 'warning';

// Toast notification item
export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

// Generation state for the video generation process
export interface GenerationState {
  isLoading: boolean;
  jobId: string | null;
  progress: number;              // 0-100
  progressMessage: string;
  error: string | null;
  videoUrl: string | null;
}
