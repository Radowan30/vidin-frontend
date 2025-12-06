import { createContext, useContext, ReactNode } from "react";

/**
 * Settings Context - Manages application settings.
 *
 * The backend endpoint is now configured via environment variable
 * or defaults to the production URL.
 */

// Backend API URL - configured via environment variable or default
const BACKEND_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Context type definition
interface SettingsContextType {
  backendEndpoint: string;
  isEndpointConfigured: boolean;
}

// Create context
const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

interface SettingsProviderProps {
  children: ReactNode;
}

/**
 * SettingsProvider Component
 * Wraps the app and provides settings state.
 */
export function SettingsProvider({ children }: SettingsProviderProps) {
  // Backend endpoint is now configured via environment variable
  const backendEndpoint = BACKEND_API_URL;

  // Always configured since we have a default
  const isEndpointConfigured = true;

  return (
    <SettingsContext.Provider
      value={{
        backendEndpoint,
        isEndpointConfigured,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

/**
 * Custom hook to access settings context.
 * Must be used within a SettingsProvider.
 */
export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
