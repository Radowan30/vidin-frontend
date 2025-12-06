import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { SettingsProvider } from "./context/SettingsContext";
import { ToastProvider } from "./context/ToastContext";
import { VideoHistoryProvider } from "./context/VideoHistoryContext";
import { VideoGenerationProvider } from "./context/VideoGenerationContext";
import { SidebarProvider } from "./hooks/useSidebar";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";

/**
 * Main App component that sets up routing and context providers.
 *
 * Context Providers (outermost to innermost):
 * - ThemeProvider: Manages light/dark mode
 * - SettingsProvider: Manages app settings like backend endpoint
 * - ToastProvider: Manages toast notifications
 * - VideoHistoryProvider: Manages the list of previously generated videos
 * - VideoGenerationProvider: Manages video generation state (shared across components)
 * - SidebarProvider: Manages sidebar open/close state
 */
function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <ToastProvider>
          <VideoHistoryProvider>
            <VideoGenerationProvider>
              <SidebarProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </Layout>
              </SidebarProvider>
            </VideoGenerationProvider>
          </VideoHistoryProvider>
        </ToastProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
