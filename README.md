# Smart Device Control (Assessment)

Unified project containing a raw PHP REST API backend and a React + TypeScript + Vite frontend UI for controlling smart devices (lights & fans) with preset management.

## Contents

- `backend/` – PHP API (no framework) exposing `/api/devices` and `/api/presets`.
- `frontend/` – React 19 drag‑and‑drop interface consuming the API.

---

## Backend

### Requirements

- PHP 8.1+ (PDO + MySQL extensions enabled)
- MySQL 8+ (or MariaDB equivalent)

### 1. Configure Environment

Copy example env and adjust credentials:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` values (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`). Default DB name is `smart_device_control`.

### 2. Create Database & Tables

Run the SQL bootstrap (creates DB, tables, indexes, and seed rows if missing):

```bash
mysql -u${DB_USER:-root} -p < backend/database.sql
```

If the database already exists, only missing tables / seed rows are added.

### 3. Start Development Server

From `backend/` directory:

```bash
php -S localhost:8000 router.php
```

This serves API endpoints at `http://localhost:8000/api/...`.

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

### CORS

Simple permissive CORS echoes incoming `Origin` allowing local development; adjust for production.

---

## Frontend

### Requirements

- Node.js 22.12+ (due to Vite 7 usage & React 19). Use a version manager if needed: `nvm install 22 && nvm use 22`.

### Install & Run

From `frontend/`:

```bash
npm install
npm run dev
```

Visit the printed local URL (typically `http://localhost:5173`). Ensure backend is running at `http://localhost:8000`.

### Environment Variables

Copy example and edit if backend URL differs:

```bash
cp frontend/.env.example frontend/.env
```

`VITE_API_BASE_URL` defaults to `http://localhost:8000/api` if unset.

### Build

```bash
npm run build
```

Outputs production artifacts to `frontend/dist/`.

### Tech Stack

React 19 · TypeScript · Vite · Tailwind CSS · dnd-kit · Zustand · Axios · Sonner · Lucide Icons

---

## Data Shapes (Frontend TypeScript)

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
