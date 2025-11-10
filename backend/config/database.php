<?php
/**
 * Database Configuration - Works for Local and Railway Deployment
 */

class Database {
    private $host;
    private $port;
    private $db_name;
    private $username;
    private $password;
    private $conn;

    public function __construct() {
        // Load environment using vlucas/phpdotenv when available
        $autoload = __DIR__ . '/../vendor/autoload.php';
        if (file_exists($autoload)) {
            require_once $autoload;
            if (class_exists('Dotenv\\Dotenv')) {
                $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
                $dotenv->safeLoad(); // won't throw if .env missing
            }
        } else {
            // Fallback simple parser if phpdotenv not installed
            $this->loadEnvFallback();
        }

        // Determine environment
        $isRailway = $_ENV['RAILWAY_ENV'] ?? false;

        // Set DB configuration
       if ($isRailway) {
            // Railway internal host (works only inside Railway)
            $this->host = $_ENV['DB_HOST'] ?? 'mysql.railway.internal';
            $this->port = $_ENV['DB_PORT'] ?? 3306;
        } else {
            // Local development using public Railway proxy
            $this->host = $_ENV['DB_HOST'] ?? 'maglev.proxy.rlwy.net';
            $this->port = $_ENV['DB_PORT'] ?? 14735;
        }

        $this->db_name  = $_ENV['DB_NAME'] ?? 'smart_device_control';
        $this->username = $_ENV['DB_USER'] ?? 'root';
        $this->password = $_ENV['DB_PASS'] ?? '';
    }

    private function loadEnvFallback() {
        $envFile = __DIR__ . '/../.env';
        if (!file_exists($envFile)) return;

        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || strpos($line, '#') === 0) continue;
            if (strpos($line, '=') === false) continue;

            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            if (strlen($value) >= 2) {
                $first = $value[0];
                $last  = $value[strlen($value) - 1];
                if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                    $value = substr($value, 1, -1);
                }
            }
            if (!isset($_ENV[$key])) {
                $_ENV[$key] = $value;
            }
        }
    }

    public function getConnection() {
        $this->conn = null;

        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->db_name}";
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("SET NAMES utf8");
        } catch (PDOException $e) {
            throw new Exception("Database Connection Error: " . $e->getMessage());
        }

        return $this->conn;
    }
}
?>
