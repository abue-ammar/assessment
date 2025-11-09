# Smart Device Control (Assessment)

Unified project containing a raw PHP REST API backend and a React + TypeScript + Vite frontend UI for controlling smart devices (lights & fans) with preset management.

## Contents

- `backend/` – PHP API (no framework) exposing `/api/devices` and `/api/presets`.
- `frontend/` – React 19 drag‑and‑drop interface consuming the API.

---

## Quick Start (Run from Root Directory)

### Prerequisites

- **PHP**: 8.1+ (PDO + MySQL extensions enabled)
- **MySQL**: 8+ (or MariaDB equivalent)
- **Node.js**: 22.12+ (required for Vite 7 and React 19)

### 1. Setup Backend

Configure database environment:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` values (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`). Default DB name is `smart_device_control`.

Create database and tables:

```bash
mysql -u${DB_USER:-root} -p < backend/database.sql
```

Start PHP development server:

```bash
php -S localhost:8000 -t backend backend/router.php
```

The API will be available at `http://localhost:8000/api/...`

### 2. Setup Frontend

Install dependencies:

```bash
npm install --prefix frontend
```

Start development server:

```bash
npm run dev --prefix frontend
```

Visit `http://localhost:5173` (ensure backend is running at `http://localhost:8000`).

---

## Backend

### Folder Structure

```
backend/
├── database.sql          # SQL schema and seed data
├── router.php           # Main router for API endpoints
├── api/
│   ├── devices.php      # Devices CRUD endpoints
│   └── presets.php      # Presets CRUD endpoints
└── config/
    └── database.php     # Database connection configuration
```

### Requirements

- PHP 8.1+ (PDO + MySQL extensions enabled)
- MySQL 8+ (or MariaDB equivalent)

### API Overview

#### Devices Endpoint: `/api/devices`

| Method | Path               | Description                           |
| ------ | ------------------ | ------------------------------------- |
| GET    | /api/devices       | List all devices                      |
| GET    | /api/devices?id=ID | Fetch single device by query param ID |
| POST   | /api/devices       | Create device                         |
| PUT    | /api/devices/{id}  | Update device settings                |
| DELETE | /api/devices?id=ID | Delete device by query param ID       |

Device record fields:

```json
{
	"id": number,
	"type": "light" | "fan",
	"name": string | null,
	"settings": { // JSON varies by type
		// Light settings example
		"power": boolean,
		"brightness": number,       // 0–100
		"colorTemp": "warm" | "cool"
		// Fan settings example
		// "power": boolean,
		// "speed": number           // 0–100 (example range)
	},
	"created_at": timestamp,
	"updated_at": timestamp
}
```

POST body example (light):

```json
{
  "type": "light",
  "name": "Living Room Light",
  "settings": { "power": false, "brightness": 100, "colorTemp": "cool" }
}
```

PUT body example:

```json
{ "settings": { "power": true, "brightness": 80, "colorTemp": "warm" } }
```

#### Presets Endpoint: `/api/presets`

| Method | Path              | Description                         |
| ------ | ----------------- | ----------------------------------- |
| GET    | /api/presets      | List all presets                    |
| GET    | /api/presets/{id} | Fetch single preset by ID in path   |
| POST   | /api/presets      | Create preset (name must be unique) |
| PUT    | /api/presets/{id} | Update preset device_state          |
| DELETE | /api/presets/{id} | Delete preset                       |

Preset record fields:

```json
{
	"id": number,
	"name": string,             // unique
	"device_type": "light" | "fan",
	"device_state": {           // matches device settings shape
		// Light example
		"power": boolean,
		"brightness": number,
		"colorTemp": "warm" | "cool"
		// Fan example
		// "power": boolean,
		// "speed": number
	},
	"created_at": timestamp,
	"updated_at": timestamp
}
```

POST body example (light preset):

```json
{
  "name": "Night Light",
  "device_type": "light",
  "device_state": { "power": true, "brightness": 30, "colorTemp": "warm" }
}
```

PUT body example:

```json
{ "device_state": { "power": false, "brightness": 50, "colorTemp": "cool" } }
```

### API Testing with cURL

#### Devices Endpoints

```bash
# Get all devices
curl http://localhost:8000/api/devices

# Get device by ID (using query parameter)
curl "http://localhost:8000/api/devices?id=1"

# Create device (light)
curl -X POST http://localhost:8000/api/devices \
  -H "Content-Type: application/json" \
  -d '{"type":"light","name":"Living Room Light","settings":{"power":false,"brightness":100,"colorTemp":"cool"}}'

# Create device (fan)
curl -X POST http://localhost:8000/api/devices \
  -H "Content-Type: application/json" \
  -d '{"type":"fan","name":"Bedroom Fan","settings":{"power":false,"speed":50}}'

# Update device
curl -X PUT http://localhost:8000/api/devices/1 \
  -H "Content-Type: application/json" \
  -d '{"settings":{"power":true,"brightness":80,"colorTemp":"warm"}}'

# Delete device (using query parameter)
curl -X DELETE "http://localhost:8000/api/devices?id=1"
```

#### Presets Endpoints

```bash
# Get all presets
curl http://localhost:8000/api/presets

# Get preset by ID
curl http://localhost:8000/api/presets/1

# Create preset (light)
curl -X POST http://localhost:8000/api/presets \
  -H "Content-Type: application/json" \
  -d '{"name":"Night Light","device_type":"light","device_state":{"power":true,"brightness":30,"colorTemp":"warm"}}'

# Create preset (fan)
curl -X POST http://localhost:8000/api/presets \
  -H "Content-Type: application/json" \
  -d '{"name":"High Speed Fan","device_type":"fan","device_state":{"power":true,"speed":80}}'

# Update preset
curl -X PUT http://localhost:8000/api/presets/1 \
  -H "Content-Type: application/json" \
  -d '{"device_state":{"power":false,"brightness":50,"colorTemp":"cool"}}'

# Delete preset
curl -X DELETE http://localhost:8000/api/presets/1
```

---

## Frontend

### Folder Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── canvas/      # Canvas area components
│   │   │   ├── canvas.tsx
│   │   │   ├── canvas-content.tsx
│   │   │   ├── canvas-header.tsx
│   │   │   ├── canvas-actions.tsx
│   │   │   └── drag-indicator.tsx
│   │   ├── controls/    # Device control panels
│   │   │   ├── light-control-panel.tsx
│   │   │   ├── fan-control-panel.tsx
│   │   │   ├── brightness-slider.tsx
│   │   │   ├── color-temperature.tsx
│   │   │   ├── power-toggle.tsx
│   │   │   └── speed-slider.tsx
│   │   ├── dnd/        # Drag and drop components
│   │   │   └── drag-overlay-wrapper.tsx
│   │   ├── fan/        # Fan visualization
│   │   │   └── fan-visualization.tsx
│   │   ├── light/      # Light visualization
│   │   │   └── light-bulb.tsx
│   │   ├── modals/     # Modal components
│   │   │   └── save-preset-modal.tsx
│   │   └── sidebar/    # Sidebar components
│   │       ├── sidebar.tsx
│   │       ├── devices-section.tsx
│   │       ├── presets-section.tsx
│   │       ├── draggable-device-item.tsx
│   │       └── preset-item.tsx
│   ├── services/
│   │   └── api.ts      # API service layer
│   ├── store/
│   │   └── app-store.ts # Zustand state management
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Requirements

- **Node.js**: 22.12+ (required for Vite 7 and React 19)
  - Use a version manager if needed: `nvm install 22 && nvm use 22`

### Commands (Run from Root Directory)

```bash
npm install --prefix frontend    # Install dependencies
npm run dev --prefix frontend    # Start development server
npm run build --prefix frontend  # Build for production
npm run preview --prefix frontend # Preview production build
npm run lint --prefix frontend   # Run ESLint
npm run format --prefix frontend # Format code with Prettier
```

### Environment Variables

Copy example and edit if backend URL differs:

```bash
cp frontend/.env.example frontend/.env
```

`VITE_API_BASE_URL` defaults to `http://localhost:8000/api` if unset.

### Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **@dnd-kit/core** - Drag and drop functionality
- **Zustand** - State management with persistence
- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **Lucide React** - Icons

### Data Shapes (TypeScript)

Light state:

```ts
interface LightState {
  power: boolean;
  brightness: number;
  colorTemp: string;
}
```

Fan state:

```ts
interface FanState {
  power: boolean;
  speed: number;
}
```

Preset:

```ts
interface Preset {
  id: string;
  name: string;
  deviceType: "light" | "fan";
  state: LightState | FanState;
  createdAt: number;
}
```

Device:

```ts
interface Device {
  id: string;
  type: "light" | "fan";
  name: string;
  settings: LightState | FanState;
}
```
