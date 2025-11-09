<?php

$uri = $_SERVER['REQUEST_URI'];
$uri = parse_url($uri, PHP_URL_PATH);

// Route API requests (handles both /api/presets and /api/presets/{id})
if (preg_match('/^\/api\/presets/', $uri)) {
    require __DIR__ . '/api/presets.php';
    return true;
}

if (preg_match('/^\/api\/devices/', $uri)) {
    require __DIR__ . '/api/devices.php';
    return true;
}

// Return false to serve static files normally
return false;
