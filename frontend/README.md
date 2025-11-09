# Smart Device Control App

A React-based drag-and-drop interface for controlling smart devices (lights and fans) with preset management.

## Requirements

- **Node.js**: 22.12+ (recommended) Otherwise Vite will complain and throw warning as I have used latest version of vite 7.1.7

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Key Packages

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **@dnd-kit/core** - Drag and drop functionality
- **Zustand** - State management with persistence
- **Sonner** - Toast notifications
- **Lucide React** - Icons

## Folder Structure

```
src/
├── components/
│   ├── canvas/           # Canvas area components
│   │   ├── canvas.tsx
│   │   ├── canvas-content.tsx
│   │   ├── canvas-header.tsx
│   │   ├── canvas-actions.tsx
│   │   └── drag-indicator.tsx
│   ├── controls/         # Device control panels
│   │   ├── light-control-panel.tsx
│   │   ├── fan-control-panel.tsx
│   │   ├── brightness-slider.tsx
│   │   ├── speed-slider.tsx
│   │   └── color-temperature.tsx
│   ├── dnd/             # Drag and drop components
│   │   ├── drag-overlay-wrapper.tsx
│   │   └── draggable-wrapper.tsx
│   ├── fan/             # Fan visualization
│   │   └── fan-visualization.tsx
│   ├── light/           # Light visualization
│   │   └── light-bulb.tsx
│   ├── modals/          # Modal components
│   │   └── save-preset-modal.tsx
│   └── sidebar/         # Sidebar components
│       ├── sidebar.tsx
│       ├── devices-section.tsx
│       ├── presets-section.tsx
│       ├── draggable-device-item.tsx
│       └── preset-item.tsx
├── store/
│   └── app-store.ts     # Zustand state management
├── App.tsx              # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```
