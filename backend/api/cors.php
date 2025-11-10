<?php
// api/cors.php

// Allowed origins — add your local dev and production domains here
$allowedOrigins = [
    'http://localhost:5173',
    'https://assessment-alpha-two.vercel.app', 
];

// Get origin of request
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// If the origin is allowed, send back CORS headers
if ($origin && in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
} 

// Common headers
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 3600");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}
