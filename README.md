# VidIn - Turn LinkedIn Posts into Videos

A modern React frontend for transforming LinkedIn posts into engaging videos.

![VidIn Screenshot](./screenshot.png)

## Features

- 📝 **Text Input**: Paste your LinkedIn post text
- 🎬 **Video Generation**: Send to backend API for video creation
- 🖼️ **Aspect Ratio Selection**: Choose from 1:1, 9:16, or 16:9
- 📥 **Download**: Download generated videos
- 📚 **History**: Access previously generated videos
- 🌙 **Dark Mode**: Toggle between light and dark themes
- ⚙️ **Configurable**: Set your own backend endpoint

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository (or navigate to the folder)
cd vidin

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
vidin/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── LogoPlaceholder.tsx # Logo placeholder component
│   │   ├── ThemeToggle.tsx     # Dark/light mode toggle
│   │   ├── TextInputPanel.tsx  # Left panel with text input
│   │   ├── VideoPanel.tsx      # Right panel with video player
│   │   ├── AspectRatioSelect.tsx # Aspect ratio picker
│   │   ├── Sidebar.tsx         # Video history sidebar
│   │   └── ToastContainer.tsx  # Toast notifications
│   ├── context/         # React contexts
│   │   ├── ThemeContext.tsx    # Theme management
│   │   ├── SettingsContext.tsx # App settings
│   │   ├── ToastContext.tsx    # Toast notifications
│   │   └── VideoHistoryContext.tsx # Video history
│   ├── hooks/           # Custom React hooks
│   │   ├── useGenerateVideo.ts # Video generation hook
│   │   └── useSidebar.ts       # Sidebar state hook
│   ├── pages/           # Page components
│   │   ├── HomePage.tsx        # Main interface
│   │   └── SettingsPage.tsx    # Settings page
│   ├── types/           # TypeScript types
│   │   └── index.ts            # Type definitions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Configuration

### Backend Endpoint

1. Navigate to Settings (`/settings`)
2. Enter your backend API URL
3. Click "Save Settings"

The endpoint should accept POST requests with:

```json
{
  "text": "Your LinkedIn post text...",
  "aspectRatio": "1:1"  // or "9:16" or "16:9"
}
```

And respond with:

```json
{
  "videoUrl": "https://example.com/generated-video.mp4"
}
```

### Replacing the Logo

The logo placeholder is in `src/components/LogoPlaceholder.tsx`. To use a custom logo:

1. Add your logo image to the `public/` folder (e.g., `public/logo.png`)
2. Edit `LogoPlaceholder.tsx` and replace the content with:

```tsx
export default function LogoPlaceholder() {
  return (
    <img 
      src="/logo.png" 
      alt="VidIn Logo" 
      className="h-10 w-auto"
    />
  )
}
```

## Customization

### Colors

Edit the color palette in `tailwind.config.js`:

```js
colors: {
  primary: { ... },
  accent: { ... },
}
```

### Fonts

The app uses Clash Display and Satoshi fonts from Fontshare. To change fonts:

1. Update the font links in `index.html`
2. Update the `fontFamily` config in `tailwind.config.js`

## License

MIT License

