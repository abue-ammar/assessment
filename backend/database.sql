-- Smart Device Control Database

CREATE DATABASE IF NOT EXISTS smart_device_control;
USE smart_device_control;

-- Devices table
CREATE TABLE IF NOT EXISTS devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('light', 'fan') NOT NULL,
    name VARCHAR(255) DEFAULT NULL,
    settings JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Presets table
CREATE TABLE IF NOT EXISTS presets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    device_type ENUM('light', 'fan') NOT NULL,
    device_state JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Indexes
CREATE INDEX idx_device_type ON devices(type);
CREATE INDEX idx_preset_type ON presets(device_type);
CREATE INDEX idx_preset_name ON presets(name);

-- Insert initial devices (if not exists)
INSERT INTO devices (type, name, settings) 
SELECT 'light', 'Light', '{"power": false, "brightness": 100, "colorTemp": "cool"}'
WHERE NOT EXISTS (SELECT 1 FROM devices WHERE type = 'light' AND name = 'Light');

INSERT INTO devices (type, name, settings) 
SELECT 'fan', 'Fan', '{"power": false, "speed": 64}'
WHERE NOT EXISTS (SELECT 1 FROM devices WHERE type = 'fan' AND name = 'Fan');
