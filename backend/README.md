# Backend API

Raw PHP REST API for smart device control.

## Setup

1. Create database:

```bash
mysql -uroot < database.sql
```

2. Start server:

```bash
php -S localhost:8000 router.php
```

## API Endpoints

### Presets

```bash
# Get all
curl http://localhost:8000/api/presets

# Get by ID
curl http://localhost:8000/api/presets/1

# Create
curl -X POST http://localhost:8000/api/presets -H "Content-Type: application/json" \
  -d '{"name":"Night Light","device_type":"light","device_state":{"power":true,"brightness":30,"colorTemp":"warm"}}'

# Update
curl -X PUT http://localhost:8000/api/presets/1 -H "Content-Type: application/json" \
  -d '{"device_state":{"power":false,"brightness":50,"colorTemp":"cool"}}'

# Delete
curl -X DELETE http://localhost:8000/api/presets/1
```

### Devices

```bash
# Get all
curl http://localhost:8000/api/devices

# Get by ID
curl http://localhost:8000/api/devices/1

# Create
curl -X POST http://localhost:8000/api/devices -H "Content-Type: application/json" \
  -d '{"type":"light","name":"Living Room Light","settings":{"power":false,"brightness":100,"colorTemp":"cool"}}'

# Update
curl -X PUT http://localhost:8000/api/devices/1 -H "Content-Type: application/json" \
  -d '{"settings":{"power":true,"brightness":80,"colorTemp":"warm"}}'

# Delete
curl -X DELETE http://localhost:8000/api/devices/1
```
