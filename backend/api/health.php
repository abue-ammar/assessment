<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Simple health check to verify environment variables
echo json_encode([
    'status' => 'ok',
    'php_version' => PHP_VERSION,
    'getenv' => [
        'DB_HOST' => getenv('DB_HOST') !== false ? getenv('DB_HOST') : 'NOT_FOUND',
        'DB_NAME' => getenv('DB_NAME') !== false ? getenv('DB_NAME') : 'NOT_FOUND',
        'DB_USER' => getenv('DB_USER') !== false ? getenv('DB_USER') : 'NOT_FOUND',
        'DB_PASS' => getenv('DB_PASS') !== false ? '***SET***' : 'NOT_FOUND',
    ],
    'env_array' => [
        'DB_HOST' => $_ENV['DB_HOST'] ?? 'NOT_FOUND',
        'DB_NAME' => $_ENV['DB_NAME'] ?? 'NOT_FOUND',
        'DB_USER' => $_ENV['DB_USER'] ?? 'NOT_FOUND',
        'DB_PASS' => isset($_ENV['DB_PASS']) ? '***SET***' : 'NOT_FOUND',
    ],
    'server_array' => [
        'DB_HOST' => $_SERVER['DB_HOST'] ?? 'NOT_FOUND',
        'DB_NAME' => $_SERVER['DB_NAME'] ?? 'NOT_FOUND',
        'DB_USER' => $_SERVER['DB_USER'] ?? 'NOT_FOUND',
        'DB_PASS' => isset($_SERVER['DB_PASS']) ? '***SET***' : 'NOT_FOUND',
    ],
    'timestamp' => date('Y-m-d H:i:s')
], JSON_PRETTY_PRINT);
?>
