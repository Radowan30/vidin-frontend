import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { useSettings } from "./SettingsContext";
import { useToast } from "./ToastContext";
import { useVideoHistory } from "./VideoHistoryContext";
import type { AspectRatio, GenerationState, ProgressUpdate } from "../types";

/**
 * Video Generation Context
 *
 * Provides shared state for video generation across all components.
 * This ensures TextInputPanel and VideoPanel share the same progress state.
 */

interface VideoGenerationContextType {
  generateVideo: (
    text: string,
    aspectRatio: AspectRatio
  ) => Promise<string | null>;
  cancel: () => void;
  reset: () => void;
  isLoading: boolean;
  jobId: string | null;
  progress: number;
  progressMessage: string;
  error: string | null;
  videoUrl: string | null;
  isEndpointConfigured: boolean;
}

const VideoGenerationContext = createContext<
  VideoGenerationContextType | undefined
>(undefined);

interface VideoGenerationProviderProps {
  children: ReactNode;
}

export function VideoGenerationProvider({
  children,
}: VideoGenerationProviderProps) {
  // Get the backend endpoint from settings
  const { backendEndpoint, isEndpointConfigured } = useSettings();

  // Toast for showing notifications
  const { showToast } = useToast();

  // Video history for storing generated videos
  const { addToHistory } = useVideoHistory();

  // EventSource reference for cleanup
  const eventSourceRef = useRef<EventSource | null>(null);

  // Generation state - shared across all components
  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    jobId: null,
    progress: 0,
    progressMessage: "",
    error: null,
    videoUrl: null,
  });

  /**
   * Connect to SSE endpoint to receive progress updates
   */
  const connectToProgressStream = useCallback(
    (jobId: string, text: string, aspectRatio: AspectRatio) => {
      // Close any existing connection
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const sseUrl = `${backendEndpoint}/progress/${jobId}`;
      console.log("[SSE] Connecting to:", sseUrl);

      const eventSource = new EventSource(sseUrl);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log("[SSE] Connection opened");
      };

      eventSource.onmessage = (event) => {
        try {
          const data: ProgressUpdate = JSON.parse(event.data);
          console.log("[SSE] Progress update:", data);

          // Update state with progress
          setState((prev) => ({
            ...prev,
            progress: data.progress,
            progressMessage: data.message,
          }));

          // Handle completion
          if (data.status === "complete" && data.videoUrl) {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              progress: 100,
              progressMessage: "Video generated successfully!",
              videoUrl: data.videoUrl!,
            }));

            // Add to history
            addToHistory(data.videoUrl, text, aspectRatio);

            // Show success toast
            showToast("success", "Video generated successfully!");

            // Close the connection
            eventSource.close();
            eventSourceRef.current = null;
          }

          // Handle error
          if (data.status === "error") {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              progress: 0,
              error: data.error || "An error occurred",
            }));

            // Show error toast
            showToast("error", `Failed to generate video: ${data.error}`);

            // Close the connection
            eventSource.close();
            eventSourceRef.current = null;
          }
        } catch (err) {
          console.error("[SSE] Failed to parse message:", err, event.data);
        }
      };

      eventSource.onerror = (error) => {
        console.error("[SSE] Connection error:", error);

        // Only handle error if we're still loading
        setState((prev) => {
          if (prev.isLoading) {
            return {
              ...prev,
              isLoading: false,
              progress: 0,
              error: "Connection to server lost",
            };
          }
          return prev;
        });

        eventSource.close();
        eventSourceRef.current = null;
      };
    },
    [backendEndpoint, addToHistory, showToast]
  );

  /**
   * Generate a video from the provided text and aspect ratio.
   */
  const generateVideo = useCallback(
    async (text: string, aspectRatio: AspectRatio): Promise<string | null> => {
      // Validate inputs
      if (!text.trim()) {
        showToast("warning", "Please enter some text to generate a video");
        return null;
      }

      if (!isEndpointConfigured) {
        showToast("error", "Backend endpoint is not configured");
        return null;
      }

      // Start loading
      setState({
        isLoading: true,
        jobId: null,
        progress: 0,
        progressMessage: "Starting video generation...",
        error: null,
        videoUrl: null,
      });

      try {
        // Send POST request to start generation
        const response = await fetch(`${backendEndpoint}/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text.trim(),
            aspectRatio,
          }),
        });

        // Check if request was successful
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            errorText || `Request failed with status ${response.status}`
          );
        }

        // Parse the response
        const data = await response.json();

        // Validate response has jobId
        if (!data.jobId) {
          throw new Error("Invalid response: missing jobId");
        }

        // Update state with job ID
        setState((prev) => ({
          ...prev,
          jobId: data.jobId,
          progressMessage: "Connecting to progress stream...",
        }));

        // Connect to SSE for progress updates
        connectToProgressStream(data.jobId, text.trim(), aspectRatio);

        return data.jobId;
      } catch (error) {
        // Handle errors
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";

        setState({
          isLoading: false,
          jobId: null,
          progress: 0,
          progressMessage: "",
          error: errorMessage,
          videoUrl: null,
        });

        // Show error toast
        showToast("error", `Failed to start video generation: ${errorMessage}`);

        return null;
      }
    },
    [backendEndpoint, isEndpointConfigured, showToast, connectToProgressStream]
  );

  /**
   * Cancel ongoing generation
   */
  const cancel = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setState({
      isLoading: false,
      jobId: null,
      progress: 0,
      progressMessage: "",
      error: null,
      videoUrl: null,
    });
  }, []);

  /**
   * Reset the generation state
   */
  const reset = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setState({
      isLoading: false,
      jobId: null,
      progress: 0,
      progressMessage: "",
      error: null,
      videoUrl: null,
    });
  }, []);

  return (
    <VideoGenerationContext.Provider
      value={{
        generateVideo,
        cancel,
        reset,
        isLoading: state.isLoading,
        jobId: state.jobId,
        progress: state.progress,
        progressMessage: state.progressMessage,
        error: state.error,
        videoUrl: state.videoUrl,
        isEndpointConfigured,
      }}
    >
      {children}
    </VideoGenerationContext.Provider>
  );
}

/**
 * Hook to access video generation context.
 * Must be used within a VideoGenerationProvider.
 */
export function useVideoGeneration() {
  const context = useContext(VideoGenerationContext);
  if (context === undefined) {
    throw new Error(
      "useVideoGeneration must be used within a VideoGenerationProvider"
    );
  }
  return context;
}
