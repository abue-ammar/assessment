<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Simple health check to verify environment variables
echo json_encode([
    'status' => 'ok',
    'php_version' => PHP_VERSION,
    'env_check' => [
        'DB_HOST_isset' => isset($_ENV['DB_HOST']) || getenv('DB_HOST') !== false,
        'DB_NAME_isset' => isset($_ENV['DB_NAME']) || getenv('DB_NAME') !== false,
        'DB_USER_isset' => isset($_ENV['DB_USER']) || getenv('DB_USER') !== false,
        'DB_PASS_isset' => isset($_ENV['DB_PASS']) || getenv('DB_PASS') !== false,
        'DB_HOST_value' => getenv('DB_HOST') ?: 'not set',
        'DB_NAME_value' => getenv('DB_NAME') ?: 'not set',
    ],
    'timestamp' => date('Y-m-d H:i:s')
], JSON_PRETTY_PRINT);
?>
