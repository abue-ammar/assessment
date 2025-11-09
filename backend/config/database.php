<?php
/**
 * Database Configuration
 */

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $conn;

    public function __construct() {
        // Load environment using vlucas/phpdotenv when available (composer)
        $autoload = __DIR__ . '/../vendor/autoload.php';
        if (file_exists($autoload)) {
            require_once $autoload;
            // Use Dotenv if installed
            if (class_exists('Dotenv\\Dotenv')) {
                $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
                // safeLoad won't throw if .env is missing
                $dotenv->safeLoad();
            }
        } else {
            // Fallback: simple .env parser (keeps previous behavior when phpdotenv isn't installed)
            $this->loadEnvFallback();
        }

        $this->host = $_ENV['DB_HOST'] ?? $_SERVER['DB_HOST'] ;
        $this->db_name = $_ENV['DB_NAME'] ?? $_SERVER['DB_NAME'] ;
        $this->username = $_ENV['DB_USER'] ?? $_SERVER['DB_USER'] ;
        $this->password = $_ENV['DB_PASS'] ?? $_SERVER['DB_PASS'] ;
    }

    private function loadEnvFallback() {
        $envFile = __DIR__ . '/../.env';
        if (file_exists($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if ($line === '' || strpos($line, '#') === 0) continue;
                if (strpos($line, '=') === false) continue;
                list($key, $value) = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);
                // remove surrounding matching quotes (single or double)
                if (strlen($value) >= 2) {
                    $first = $value[0];
                    $last = $value[strlen($value) - 1];
                    if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                        $value = substr($value, 1, -1);
                    }
                }
                if (!isset($_ENV[$key])) {
                    $_ENV[$key] = $value;
                }
            }
        }
    }

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $e) {
            echo "Connection Error: " . $e->getMessage();
        }

        return $this->conn;
    }
}
?>